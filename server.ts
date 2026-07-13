import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 image uploads
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // API routes FIRST
  app.post("/api/describe-issue", async (req, res) => {
    try {
      const { image, category } = req.body;
      if (!image) {
        return res.status(400).json({ error: "No image data provided" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server" });
      }

      // Initialize Google GenAI
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Prepare image part
      // Image data can be a base64 data URL: data:image/png;base64,iVBORw0KGgo...
      const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      let mimeType = "image/jpeg";
      let base64Data = image;

      if (matches && matches.length === 3) {
        mimeType = matches[1];
        base64Data = matches[2];
      }

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        }
      };

      const prompt = `Analyze this image of a public civic grievance/issue (such as pothole, water leakage, garbage pile, street-light failure, overflowing drainage, or road damage).
Identify and describe the issue visually presented in the photo.

Describe the damage, hazard, or safety risk objectively and neutrally, incorporating specifics visible in the photo. Recommend matching categories and severity level.`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [imagePart, prompt],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                  description: "A short, concise, professional title for the issue (max 5-8 words). Example: 'Water-logged pothole near street market entrance'"
                },
                description: {
                  type: Type.STRING,
                  description: "A highly detailed, plain text description describing the hazard, potential risks, and visible features in a helpful administrative tone. DO NOT put JSON in this field."
                },
                suggestedCategory: {
                  type: Type.STRING,
                  description: "Recommend from: 'Road damage / potholes', 'Water supply / Leakage', 'Solid Waste / Garbage', 'Sewage / Drainage overflow', 'Streetlight / Electrical', 'Public health & Safety', or 'Others'."
                },
                severityIndex: {
                  type: Type.STRING,
                  description: "Recommend from: 'Low (General queue)', 'Medium (Normal SLA queue)', or 'High (Urgent Dispatch)'."
                }
              },
              required: ["title", "description", "suggestedCategory", "severityIndex"]
            }
          }
        });
      } catch (firstErr: any) {
        console.warn("Primary gemini-2.5-flash model failed or unavailable. Trying stable fallback model gemini-1.5-flash...", firstErr.message || firstErr);
        response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: [imagePart, prompt],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                  description: "A short, concise, professional title for the issue (max 5-8 words). Example: 'Water-logged pothole near street market entrance'"
                },
                description: {
                  type: Type.STRING,
                  description: "A highly detailed, plain text description describing the hazard, potential risks, and visible features in a helpful administrative tone. DO NOT put JSON in this field."
                },
                suggestedCategory: {
                  type: Type.STRING,
                  description: "Recommend from: 'Road damage / potholes', 'Water supply / Leakage', 'Solid Waste / Garbage', 'Sewage / Drainage overflow', 'Streetlight / Electrical', 'Public health & Safety', or 'Others'."
                },
                severityIndex: {
                  type: Type.STRING,
                  description: "Recommend from: 'Low (General queue)', 'Medium (Normal SLA queue)', or 'High (Urgent Dispatch)'."
                }
              },
              required: ["title", "description", "suggestedCategory", "severityIndex"]
            }
          }
        });
      }

      const responseText = response.text || "";
      let parsedResult;
      try {
        parsedResult = JSON.parse(responseText.trim());
      } catch (parseError) {
        console.error("JSON parsing error on Gemini response:", parseError, responseText);
        throw new Error("Unable to parse the AI analysis response into a valid JSON schema.");
      }

      res.json(parsedResult);
    } catch (error: any) {
      console.error("All Gemini API models failed or are offline:", error);
      res.status(500).json({ error: error.message || "Failed to analyze photo with Gemini AI. Please check your network and API key." });
    }
  });

  app.post("/api/translate", async (req, res) => {
    try {
      const { text, targetLanguage } = req.body;
      if (!text || !targetLanguage) {
        return res.status(400).json({ error: "Text and targetLanguage are required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server" });
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Translate the following civic complaint description into ${targetLanguage}. 
If the text is already in ${targetLanguage}, return it as is.
Return ONLY the direct translation. Do not wrap in quotes or add metadata. Do not include any explanations, JSON, or introduction.

Text to translate:
"${text}"`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });
      } catch (err: any) {
        console.warn("Primary translation model failed. Trying stable fallback gemini-1.5-flash...", err.message || err);
        response = await ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: prompt,
        });
      }

      res.json({ translatedText: response.text?.trim() || text });
    } catch (error: any) {
      console.warn("Translation API model is temporarily experiencing high demand. Falling back to original text:", error.message || error);
      res.json({ translatedText: req.body.text || "" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

const pptxgen = require("pptxgenjs");

// Initialize presentation
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";

// Define professional theme colors
const COLORS = {
  bgLight: "F8FAFC",       // slate-50
  bgDark: "0F172A",        // slate-900 (for cover & conclusion)
  textDark: "1E293B",      // slate-800
  textLight: "FFFFFF",     // white
  brandBlue: "1D4ED8",     // royal blue
  brandIndigo: "4F46E5",   // indigo-600
  accentPurple: "9333EA",  // purple-600
  slateGray: "64748B"      // slate-500
};

// Common slide background and header helper
function applyStandardHeader(slide, titleText) {
  // Add light background
  slide.background = { fill: COLORS.bgLight };
  
  // Add Header Title
  slide.addText(titleText, {
    x: 0.5,
    y: 0.4,
    w: 12.3,
    h: 0.6,
    fontSize: 24,
    bold: true,
    color: COLORS.brandIndigo,
    fontFace: "Arial"
  });

  // Add decorative thin accent line under title
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5,
    y: 1.1,
    w: 12.3,
    h: 0.04,
    fill: { color: COLORS.brandIndigo }
  });
}

// ==========================================
// SLIDE 1: Cover Page (Dark Theme)
// ==========================================
const s1 = pres.addSlide();
s1.background = { fill: COLORS.bgDark };

// Main Title Block
s1.addText("SMARTWARD AI", {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 1.0,
  fontSize: 44,
  bold: true,
  color: COLORS.textLight,
  fontFace: "Arial",
  tracking: 1
});

s1.addText("Next-Gen AI-Powered Transparent Civic Governance Platform", {
  x: 0.8,
  y: 2.5,
  w: 11.7,
  h: 0.5,
  fontSize: 18,
  italic: true,
  color: "A5B4FC", // soft indigo
  fontFace: "Arial"
});

// Horizontal Line Divider
s1.addShape(pres.shapes.RECTANGLE, {
  x: 0.8,
  y: 3.2,
  w: 11.7,
  h: 0.05,
  fill: { color: COLORS.brandIndigo }
});

// Meta/Presenter Information (Split into columns)
s1.addText([
  { text: "TEAM & CONTRIBUTOR\n", options: { bold: true, color: "94A3B8", fontSize: 12 } },
  { text: "Team Name: XXX\n", options: { bold: true, color: COLORS.textLight, fontSize: 14 } },
  { text: "Team Member: Soniya (Solo)", options: { color: COLORS.textLight, fontSize: 14 } }
], {
  x: 0.8,
  y: 3.6,
  w: 5.5,
  h: 1.5,
  fontFace: "Arial",
  lineSpacing: 24
});

s1.addText([
  { text: "PROJECT EMBED LINKS\n", options: { bold: true, color: "94A3B8", fontSize: 12 } },
  { text: "GitHub: github.com/Soniya2001/SmartWard-AI\n", options: { color: "A5B4FC", fontSize: 13, hyperLink: { url: "https://github.com/Soniya2001/SmartWard-AI/" } } },
  { text: "Live Application: smartward-ai.ai.studio", options: { color: "A5B4FC", fontSize: 13, hyperLink: { url: "https://smartward-ai.ai.studio/" } } }
], {
  x: 6.8,
  y: 3.6,
  w: 5.7,
  h: 1.5,
  fontFace: "Arial",
  lineSpacing: 24
});

// ==========================================
// SLIDE 2: The Problem Statement
// ==========================================
const s2 = pres.addSlide();
applyStandardHeader(s2, "The Problem Statement: Why Civic Redressal is Broken Today");

const problems = [
  {
    title: "The Redressal 'Black Box'",
    desc: "Citizens submit issues into empty registers and receive no timeline updates or direct notifications. Status loops remain completely hidden."
  },
  {
    title: "Manual & Inefficient Triage",
    desc: "Municipal desks spend business days manually sorting, categorizing, and forwarding complaints across overlapping department domains."
  },
  {
    title: "Zero Accountability and Deadlines",
    desc: "Without hierarchical service level agreements (SLAs), complaints languish inside bureaucratic desks with no alerts escalations to executive leadership."
  }
];

problems.forEach((p, index) => {
  const yPos = 1.6 + (index * 1.5);
  
  // Icon placeholder box
  s2.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: yPos,
    w: 0.6,
    h: 0.6,
    fill: { color: "FEE2E2" }, // light red
    line: { color: "EF4444", width: 1 }
  });
  
  s2.addText("!", {
    x: 0.8,
    y: yPos,
    w: 0.6,
    h: 0.6,
    align: "center",
    valign: "middle",
    fontSize: 22,
    bold: true,
    color: "B91C1C"
  });

  // Text details
  s2.addText([
    { text: p.title + "\n", options: { bold: true, fontSize: 16, color: COLORS.textDark } },
    { text: p.desc, options: { fontSize: 13, color: COLORS.slateGray } }
  ], {
    x: 1.6,
    y: yPos - 0.1,
    w: 10.5,
    h: 1.0,
    fontFace: "Arial",
    lineSpacing: 20
  });
});


// ==========================================
// SLIDE 3: The Solution
// ==========================================
const s3 = pres.addSlide();
applyStandardHeader(s3, "Introducing SmartWard AI: The Complete Civic OS");

// Left Column (Value Prop Summary Card)
s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.8,
  y: 1.6,
  w: 4.8,
  h: 4.8,
  fill: { color: "EEF2F6" },
  line: { color: "CBD5E1", width: 1 }
});

s3.addText("SmartWard AI bridges the administrative gap by binding citizen concerns with transparent hierarchical escalation pipelines in real-time.", {
  x: 1.1,
  y: 1.9,
  w: 4.2,
  h: 4.2,
  fontSize: 16,
  color: COLORS.textDark,
  fontFace: "Arial",
  lineSpacing: 26,
  valign: "top"
});

// Right Column (Two Solution Cards)
const solutions = [
  {
    title: "Double-Sided Operational Design",
    desc: "A simplified, translation-friendly portal for citizens to lodge grievances, paired with high-performance operational dashboards for public officers.",
    bgColor: "E0E7FF", // light indigo
    borderColor: "C7D2FE"
  },
  {
    title: "Systemic Accountability Infrastructure",
    desc: "Mandatory geolocational geofences combined with binding 36-hour field-level SLA limits that automatically alert higher executive tiers.",
    bgColor: "ECFDF5", // light emerald
    borderColor: "A7F3D0"
  }
];

solutions.forEach((sol, idx) => {
  const yPos = 1.6 + (idx * 2.5);
  s3.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 6.0,
    y: yPos,
    w: 6.8,
    h: 2.1,
    fill: { color: sol.bgColor },
    line: { color: sol.borderColor, width: 1 }
  });

  s3.addText([
    { text: sol.title + "\n", options: { bold: true, fontSize: 16, color: COLORS.textDark } },
    { text: sol.desc, options: { fontSize: 13, color: COLORS.textDark } }
  ], {
    x: 6.3,
    y: yPos + 0.1,
    w: 6.2,
    h: 1.8,
    fontFace: "Arial",
    lineSpacing: 22,
    valign: "middle"
  });
});


// ==========================================
// SLIDE 4: Unified Architecture Flow
// ==========================================
const s4 = pres.addSlide();
applyStandardHeader(s4, "Sovereign Triage Dispatch & Unified Architecture");

const flowSteps = [
  { num: "01", title: "Citizen Log", desc: "A citizen files a grievance with voice/text." },
  { num: "02", title: "AI Triage", desc: "Automated category & severity tagging." },
  { num: "03", title: "GIS Geofence", desc: "Instantly maps coordinates to local Ward boundaries." },
  { num: "04", title: "SLA Tracker", desc: "Ward Engineer responds before 36-hr expiration." }
];

flowSteps.forEach((step, index) => {
  const xPos = 0.8 + (index * 3.1);
  
  // Outer Step Box
  s4.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: 1.8,
    w: 2.8,
    h: 4.4,
    fill: { color: "FFFFFF" },
    line: { color: "E2E8F0", width: 1.5 }
  });

  // Large Circle Number
  s4.addShape(pres.shapes.OVAL, {
    x: xPos + 0.8,
    y: 2.1,
    w: 1.2,
    h: 1.2,
    fill: { color: COLORS.brandIndigo }
  });

  s4.addText(step.num, {
    x: xPos + 0.8,
    y: 2.1,
    w: 1.2,
    h: 1.2,
    align: "center",
    valign: "middle",
    fontSize: 22,
    bold: true,
    color: COLORS.textLight,
    fontFace: "Arial"
  });

  // Title & Desc
  s4.addText(step.title, {
    x: xPos + 0.1,
    y: 3.5,
    w: 2.6,
    h: 0.4,
    align: "center",
    fontSize: 16,
    bold: true,
    color: COLORS.textDark,
    fontFace: "Arial"
  });

  s4.addText(step.desc, {
    x: xPos + 0.15,
    y: 4.0,
    w: 2.5,
    h: 2.0,
    align: "center",
    valign: "top",
    fontSize: 12,
    color: COLORS.slateGray,
    fontFace: "Arial",
    lineSpacing: 18
  });
});


// ==========================================
// SLIDE 5: The Citizen Interface
// ==========================================
const s5 = pres.addSlide();
applyStandardHeader(s5, "The Citizen Interface: Transparent Progress & Accessibility");

// Left Column (Feature Bullets)
s5.addText([
  { text: "Key Interaction Features:\n\n", options: { bold: true, fontSize: 18, color: COLORS.brandIndigo } },
  { text: "• AI-Assisted Recommendation:\n", options: { bold: true, fontSize: 14, color: COLORS.textDark } },
  { text: "  Recommends categories and severity indexes based on title and input metadata.\n\n", options: { fontSize: 13, color: COLORS.slateGray } },
  { text: "• Native Multilingual Support:\n", options: { bold: true, fontSize: 14, color: COLORS.textDark } },
  { text: "  Instantly translates summaries into Tamil, Kannada, Hindi, or Malayalam to bypass literacy barriers.\n\n", options: { fontSize: 13, color: COLORS.slateGray } },
  { text: "• Live Interactive Timelines:\n", options: { bold: true, fontSize: 14, color: COLORS.textDark } },
  { text: "  No mystery progress tracking. Status moves from Submitted ➡️ Triaged ➡️ Dispatched ➡️ Resolved.", options: { fontSize: 13, color: COLORS.slateGray } }
], {
  x: 0.8,
  y: 1.6,
  w: 6.0,
  h: 4.8,
  fontFace: "Arial",
  lineSpacing: 20
});

// Right Column (Visual Card Representation of a Ticket)
s5.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 7.2,
  y: 1.8,
  w: 5.6,
  h: 4.2,
  fill: { color: "FFFFFF" },
  line: { color: "E2E8F0", width: 1 },
  shadow: { type: "outer", color: "64748B", opacity: 0.1, blur: 10 }
});

s5.addText("CIVIC DISPATCH TICKET: #WT-3301", {
  x: 7.5,
  y: 2.0,
  w: 5.0,
  h: 0.4,
  fontSize: 12,
  bold: true,
  color: COLORS.slateGray,
  fontFace: "Arial"
});

s5.addText("Severe Pipeline Leakage & Flooding", {
  x: 7.5,
  y: 2.4,
  w: 5.0,
  h: 0.4,
  fontSize: 18,
  bold: true,
  color: COLORS.textDark,
  fontFace: "Arial"
});

// Progress Timeline Visual Lines
const timelineStates = ["Submitted", "Triaged", "Crew Dispatched", "Resolved"];
timelineStates.forEach((state, i) => {
  const yCoord = 3.0 + (i * 0.6);
  // Circle Indicator
  s5.addShape(pres.shapes.OVAL, {
    x: 7.6,
    y: yCoord + 0.05,
    w: 0.15,
    h: 0.15,
    fill: { color: i <= 2 ? COLORS.brandIndigo : "CBD5E1" }
  });
  
  // Status Text
  s5.addText(state, {
    x: 7.9,
    y: yCoord,
    w: 4.5,
    h: 0.3,
    fontSize: 12,
    bold: i === 2,
    color: i <= 2 ? COLORS.textDark : COLORS.slateGray,
    fontFace: "Arial"
  });
});


// ==========================================
// SLIDE 6: The GIS Mapping Engine
// ==========================================
const s6 = pres.addSlide();
applyStandardHeader(s6, "GIS Spatial Mapping: Spotlight on Ward 42, Madurai");

// Left Grid Column (Theory)
s6.addText([
  { text: "Precision Spatial Boundaries\n\n", options: { bold: true, fontSize: 18, color: COLORS.brandIndigo } },
  { text: "SmartWard AI translates geographic markers into active administrative accountability units:\n\n", options: { fontSize: 14, color: COLORS.textDark } },
  { text: "📍 Auto-Jurisdiction Mapping:\n", options: { bold: true, fontSize: 13, color: COLORS.textDark } },
  { text: "Grievance GPS logs auto-map coordinates directly against municipal geofences, locking tickets to specific maintenance divisions (e.g. Ward 42).\n\n", options: { fontSize: 12, color: COLORS.slateGray } },
  { text: "👥 Registered Leadership Sync:\n", options: { bold: true, fontSize: 13, color: COLORS.textDark } },
  { text: "Citizens are automatically paired with their ward's local leadership body (Smt. V. Geetha, Ward 42 Councillor).", options: { fontSize: 12, color: COLORS.slateGray } }
], {
  x: 0.8,
  y: 1.6,
  w: 6.0,
  h: 4.8,
  fontFace: "Arial",
  lineSpacing: 20
});

// Right Grid Column (Visual Map Diagram)
s6.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 7.2,
  y: 1.8,
  w: 5.6,
  h: 4.2,
  fill: { color: "EEF2F6" },
  line: { color: "CBD5E1", width: 1 }
});

// Center 'Map Area' and Ward Label
s6.addText("MAP ZONE: WARD 42 (MADURAI CORE)", {
  x: 7.4,
  y: 2.0,
  w: 5.2,
  h: 0.3,
  align: "center",
  fontSize: 11,
  bold: true,
  color: COLORS.slateGray,
  fontFace: "Arial"
});

// Draw simulated grid boundaries and marker circles
s6.addShape(pres.shapes.RECTANGLE, { x: 7.6, y: 2.5, w: 4.8, h: 2.8, fill: { color: "FFFFFF" }, line: { color: "E2E8F0" } });
s6.addShape(pres.shapes.OVAL, { x: 8.5, y: 3.2, w: 0.2, h: 0.2, fill: { color: "EF4444" } }); // Red marker
s6.addShape(pres.shapes.OVAL, { x: 10.2, y: 3.9, w: 0.2, h: 0.2, fill: { color: "10B981" } }); // Green marker
s6.addShape(pres.shapes.OVAL, { x: 9.8, y: 2.8, w: 0.2, h: 0.2, fill: { color: "F59E0B" } }); // Yellow marker

s6.addText("Active Hotspots (500m radius active search filters)", {
  x: 7.6,
  y: 4.8,
  w: 4.8,
  h: 0.4,
  align: "center",
  fontSize: 10,
  color: COLORS.slateGray,
  fontFace: "Arial"
});


// ==========================================
// SLIDE 7: Hierarchical Authority Consoles
// ==========================================
const s7 = pres.addSlide();
applyStandardHeader(s7, "Multi-Tier Administrative Governance Hierarchy");

const roles = [
  { tier: "CM APEX LEVEL", name: "Thiru. S. K. Sundaram", roleName: "Chief Minister", task: "Directs state cabinet, coordinates macro-infrastructure funding, and monitors statewide grievance resolution logs." },
  { tier: "DISTRICT LEVEL", name: "Dr. S Priya, IAS", roleName: "District Collector", task: "Administers revenue, conducts public grievance audit days, and handles district-wide disaster mitigations." },
  { tier: "MUNICIPAL LEVEL", name: "Shri. R. Saravanakumar, IAS", roleName: "Municipal Commissioner", task: "Supervises urban asset fleets, directs city compactor logistics, and implements local sanitation routes." },
  { tier: "CONSTITUENCY LEVEL", name: "Smt. V. Geetha / Shri K. Chandrasekar", roleName: "Councillor / MLA", task: "Visualizes localized neighborhood statistics, targets bottleneck tasks, and drives SLA compliance." }
];

roles.forEach((r, idx) => {
  const xPos = 0.5 + (idx * 3.1);
  
  s7.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: 1.8,
    w: 2.9,
    h: 4.4,
    fill: { color: "FFFFFF" },
    line: { color: "E2E8F0", width: 1 }
  });

  s7.addText(r.tier, {
    x: xPos + 0.1,
    y: 2.0,
    w: 2.7,
    h: 0.3,
    align: "center",
    fontSize: 10,
    bold: true,
    color: COLORS.brandIndigo,
    fontFace: "Arial"
  });

  s7.addText(r.name, {
    x: xPos + 0.1,
    y: 2.4,
    w: 2.7,
    h: 0.3,
    align: "center",
    fontSize: 14,
    bold: true,
    color: COLORS.textDark,
    fontFace: "Arial"
  });

  s7.addText(r.roleName, {
    x: xPos + 0.1,
    y: 2.7,
    w: 2.7,
    h: 0.3,
    align: "center",
    fontSize: 11,
    italic: true,
    color: COLORS.slateGray,
    fontFace: "Arial"
  });

  s7.addText(r.task, {
    x: xPos + 0.15,
    y: 3.2,
    w: 2.6,
    h: 2.8,
    align: "center",
    fontSize: 11,
    color: COLORS.textDark,
    fontFace: "Arial",
    lineSpacing: 18
  });
});


// ==========================================
// SLIDE 8: Technical Architecture
// ==========================================
const s8 = pres.addSlide();
applyStandardHeader(s8, "Technical Architecture: Sleek, Modular and Scalable Stack");

const techStack = [
  { category: "Frontend Engine", details: "React 18 paired with Vite for high-velocity builds. Framer Motion powering premium visual entrances, slide panels, and state transition animations." },
  { category: "Architectural Theme", details: "Slick, professional typography configurations utilizing space-optimized 'Inter', mono-spaced technical data outputs using 'JetBrains Mono', and elegant display headings." },
  { category: "Modular Scalability", details: "Strict separation of concerns. Modular directory components dividing client layouts, dynamic dashboards, and atomic `/types.ts` structures to secure smooth feature delivery." }
];

techStack.forEach((stack, index) => {
  const yPos = 1.8 + (index * 1.5);
  
  // Tag box
  s8.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.8,
    y: yPos,
    w: 2.5,
    h: 1.1,
    fill: { color: "EEF2F6" },
    line: { color: "CBD5E1", width: 1 }
  });

  s8.addText(stack.category, {
    x: 0.8,
    y: yPos,
    w: 2.5,
    h: 1.1,
    align: "center",
    valign: "middle",
    fontSize: 14,
    bold: true,
    color: COLORS.brandIndigo,
    fontFace: "Arial"
  });

  // Details text
  s8.addText(stack.details, {
    x: 3.6,
    y: yPos,
    w: 8.5,
    h: 1.1,
    valign: "middle",
    fontSize: 13,
    color: COLORS.textDark,
    fontFace: "Arial",
    lineSpacing: 20
  });
});


// ==========================================
// SLIDE 9: Impact & Metrics
// ==========================================
const s9 = pres.addSlide();
applyStandardHeader(s9, "Transforming Governance: Key Actionable Metrics");

const metrics = [
  { num: "70%", metric: "Reduction in Triage Time", desc: "Automated routing completely removes intermediate manual screening and paper desk delays." },
  { num: "36 hrs", metric: "Binding SLA Window", desc: "Mandatory time caps force actionable accountability at ground levels with automated supervisor notifications." },
  { num: "100%", metric: "Audit Compliance", desc: "Interactive timelines establish public trust by logging every status movement transparently from filing to resolution." }
];

metrics.forEach((m, idx) => {
  const xPos = 0.8 + (idx * 4.0);

  // Large Stat Circle Outline
  s9.addShape(pres.shapes.OVAL, {
    x: xPos + 0.8,
    y: 1.8,
    w: 2.0,
    h: 2.0,
    fill: { color: "FFFFFF" },
    line: { color: COLORS.brandIndigo, width: 3 }
  });

  // Large Number
  s9.addText(m.num, {
    x: xPos + 0.8,
    y: 1.8,
    w: 2.0,
    h: 2.0,
    align: "center",
    valign: "middle",
    fontSize: 26,
    bold: true,
    color: COLORS.brandIndigo,
    fontFace: "Arial"
  });

  // Label Title
  s9.addText(m.metric, {
    x: xPos,
    y: 4.0,
    w: 3.6,
    h: 0.4,
    align: "center",
    fontSize: 15,
    bold: true,
    color: COLORS.textDark,
    fontFace: "Arial"
  });

  // Description
  s9.addText(m.desc, {
    x: xPos + 0.1,
    y: 4.5,
    w: 3.4,
    h: 1.6,
    align: "center",
    fontSize: 11,
    color: COLORS.slateGray,
    fontFace: "Arial",
    lineSpacing: 16
  });
});


// ==========================================
// SLIDE 10: Future Roadmap
// ==========================================
const s10 = pres.addSlide();
applyStandardHeader(s10, "Strategic Future Expansion Roadmap");

const roadmap = [
  { phase: "PHASE 1", title: "Automated IoT Sensors", desc: "Integrating smart water-pressure sensors and trash bin lid depth telemetry to generate dispatches without manual citizen input." },
  { phase: "PHASE 2", title: "Dynamic Pin Dropping", desc: "Deploying high-resolution satellite mapping layouts to enable citizens to drop a precise pin and instantly auto-parse GPS coordinates." },
  { phase: "PHASE 3", title: "Multi-Agent Simulators", desc: "Implementing administrative model sandboxes to simulate route optimizations and municipal fleet redistributions during local events." }
];

roadmap.forEach((step, index) => {
  const xPos = 0.8 + (index * 4.0);
  
  // Container Box
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos,
    y: 1.8,
    w: 3.6,
    h: 4.3,
    fill: { color: "FFFFFF" },
    line: { color: "E2E8F0", width: 1 }
  });

  // Phase badge
  s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: xPos + 0.8,
    y: 2.1,
    w: 2.0,
    h: 0.4,
    fill: { color: COLORS.brandIndigo },
    line: { color: COLORS.brandIndigo, width: 1 }
  });

  s10.addText(step.phase, {
    x: xPos + 0.8,
    y: 2.1,
    w: 2.0,
    h: 0.4,
    align: "center",
    valign: "middle",
    fontSize: 11,
    bold: true,
    color: COLORS.textLight,
    fontFace: "Arial"
  });

  // Title
  s10.addText(step.title, {
    x: xPos + 0.1,
    y: 2.7,
    w: 3.4,
    h: 0.4,
    align: "center",
    fontSize: 15,
    bold: true,
    color: COLORS.textDark,
    fontFace: "Arial"
  });

  // Description
  s10.addText(step.desc, {
    x: xPos + 0.2,
    y: 3.2,
    w: 3.2,
    h: 2.6,
    align: "center",
    fontSize: 11,
    color: COLORS.slateGray,
    fontFace: "Arial",
    lineSpacing: 18
  });
});


// ==========================================
// SLIDE 11: Summary & Links (Conclusion, Dark)
// ==========================================
const s11 = pres.addSlide();
s11.background = { fill: COLORS.bgDark };

// Closing Statement
s11.addText("SmartWard AI", {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 0.6,
  fontSize: 36,
  bold: true,
  color: COLORS.textLight,
  fontFace: "Arial"
});

s11.addText("Empowering Citizens. Accountable Administration. Smart Technologies.", {
  x: 0.8,
  y: 2.2,
  w: 11.7,
  h: 0.4,
  fontSize: 16,
  italic: true,
  color: "A5B4FC",
  fontFace: "Arial"
});

s11.addShape(pres.shapes.RECTANGLE, {
  x: 0.8,
  y: 2.9,
  w: 11.7,
  h: 0.04,
  fill: { color: COLORS.brandIndigo }
});

// Presenter and Contact
s11.addText([
  { text: "DEVELOPER PROFILE\n", options: { bold: true, color: "94A3B8", fontSize: 12 } },
  { text: "Soniya (Solo Developer)\n", options: { bold: true, color: COLORS.textLight, fontSize: 14 } },
  { text: "Team Name: XXX", options: { color: COLORS.textLight, fontSize: 13 } }
], {
  x: 0.8,
  y: 3.3,
  w: 5.5,
  h: 1.5,
  fontFace: "Arial",
  lineSpacing: 24
});

// Code and App links
s11.addText([
  { text: "ACCESS PLATFORM CHANNELS\n", options: { bold: true, color: "94A3B8", fontSize: 12 } },
  { text: "• GitHub Codebase: github.com/Soniya2001/SmartWard-AI\n", options: { color: "A5B4FC", fontSize: 13, hyperLink: { url: "https://github.com/Soniya2001/SmartWard-AI/" } } },
  { text: "• Active Studio Link: smartward-ai.ai.studio", options: { color: "A5B4FC", fontSize: 13, hyperLink: { url: "https://smartward-ai.ai.studio/" } } }
], {
  x: 6.8,
  y: 3.3,
  w: 5.7,
  h: 1.5,
  fontFace: "Arial",
  lineSpacing: 24
});

// Save to PPTX
pres.writeFile({ fileName: "SmartWard_AI_Pitch_Deck.pptx" })
  .then(fileName => {
    console.log(`PowerPoint slide deck created successfully: ${fileName}`);
  })
  .catch(err => {
    console.error("Error generating slide deck file:", err);
  });

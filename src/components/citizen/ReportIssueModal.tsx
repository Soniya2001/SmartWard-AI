import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Trash2, 
  Camera, 
  ShieldAlert, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  MapPin, 
  Info,
  Loader2,
  ListTodo,
  Volume2,
  VolumeX,
  Languages,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ComplaintCategory, ComplaintPriority, ComplaintStatus } from '../../types';
import { DemoComplaint } from './DashboardWidgets';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddComplaint: (newComplaint: DemoComplaint) => void;
  defaultIssueText?: string;
  defaultCategory?: ComplaintCategory;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  onAddComplaint,
  defaultIssueText = '',
  defaultCategory = 'Road'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [issue, setIssue] = useState(defaultIssueText);
  const [category, setCategory] = useState<ComplaintCategory>(defaultCategory);
  const [priority, setPriority] = useState<ComplaintPriority>('Medium');
  const [description, setDescription] = useState('');
  
  // Photo states
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitStepMessage, setSubmitStepMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // AI Analysis States
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Voice & Translation States
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [originalDescription, setOriginalDescription] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState('');

  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!synthRef.current) return;

    if (isSpeaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!description) return;

    const utterance = new SpeechSynthesisUtterance(description);
    utteranceRef.current = utterance;

    // Language detection heuristics
    const containsTamil = /[\u0B80-\u0BFF]/.test(description);
    const containsHindi = /[\u0900-\u097F]/.test(description);
    const containsKannada = /[\u0C80-\u0CFF]/.test(description);
    const containsMalayalam = /[\u0D00-\u0D7F]/.test(description);

    if (containsTamil) {
      utterance.lang = 'ta-IN';
    } else if (containsHindi) {
      utterance.lang = 'hi-IN';
    } else if (containsKannada) {
      utterance.lang = 'kn-IN';
    } else if (containsMalayalam) {
      utterance.lang = 'ml-IN';
    } else {
      utterance.lang = 'en-US';
    }

    // Try to find matching voice
    if (synthRef.current.getVoices) {
      const voices = synthRef.current.getVoices();
      const matchingVoice = voices.find(v => v.lang.startsWith(utterance.lang));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    synthRef.current.speak(utterance);
  };

  const handleTranslate = async (targetLang: string, targetLangName: string) => {
    if (!description) return;

    // Store original text if not already saved
    if (!originalDescription) {
      setOriginalDescription(description);
    }

    setIsTranslating(true);
    setTranslationError(null);
    setSelectedLang(targetLang);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: description,
          targetLanguage: targetLangName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to translate description.');
      }

      const data = await response.json();
      if (data.translatedText) {
        setDescription(data.translatedText);
      }
    } catch (err: any) {
      console.error("Translation error:", err);
      setTranslationError(err.message || 'Failed to translate. Please try again.');
      setSelectedLang('');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleRevertDescription = () => {
    if (originalDescription) {
      setDescription(originalDescription);
      setOriginalDescription('');
      setSelectedLang('');
    }
  };

  const handleAIAnalyzeImage = async () => {
    if (!photoPreview) return;
    setIsAnalyzingImage(true);
    setAiError(null);

    try {
      const response = await fetch('/api/describe-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: photoPreview,
          category: category,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze the photo.');
      }

      const data = await response.json();

      // Update fields based on AI result
      if (data.title) {
        setIssue(data.title);
      }
      if (data.description) {
        setDescription(data.description);
      }
      if (data.suggestedCategory) {
        const mappedCat = mapCategory(data.suggestedCategory);
        setCategory(mappedCat);
      }
      if (data.severityIndex) {
        const mappedPri = mapPriority(data.severityIndex);
        setPriority(mappedPri);
      }

    } catch (err: any) {
      console.error("AI photo analysis error:", err);
      setAiError(err.message || 'Unable to connect to AI engine. Please enter details manually.');
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const mapCategory = (aiCat: string): ComplaintCategory => {
    const catLower = aiCat.toLowerCase();
    if (catLower.includes('road') || catLower.includes('pothole')) return 'Road';
    if (catLower.includes('water') || catLower.includes('leak')) return 'Water';
    if (catLower.includes('garbage') || catLower.includes('solid waste') || catLower.includes('trash') || catLower.includes('waste')) return 'Garbage';
    if (catLower.includes('streetlight') || catLower.includes('electrical') || catLower.includes('light')) return 'Streetlight';
    if (catLower.includes('drainage') || catLower.includes('sewage') || catLower.includes('overflow') || catLower.includes('blockage')) return 'Drainage';
    return 'Others';
  };

  const mapPriority = (aiSev: string): ComplaintPriority => {
    const sevLower = aiSev.toLowerCase();
    if (sevLower.includes('low') || sevLower.includes('routine')) return 'Low';
    if (sevLower.includes('high') || sevLower.includes('urgent') || sevLower.includes('dispatch') || sevLower.includes('operation')) return 'High';
    if (sevLower.includes('critical') || sevLower.includes('hazard') || sevLower.includes('immediate')) return 'Critical';
    return 'Medium';
  };

  // Reset Form
  const resetForm = () => {
    setIssue('');
    setCategory('Road');
    setPriority('Medium');
    setDescription('');
    setPhoto(null);
    setPhotoPreview(null);
    setIsSubmitting(false);
    setSubmitSuccess(false);
    setSubmitStepMessage('');
    setErrors({});
    setIsAnalyzingImage(false);
    setAiError(null);
    
    // Reset accessibility voice & translation states
    setIsSpeaking(false);
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setOriginalDescription('');
    setIsTranslating(false);
    setTranslationError(null);
    setSelectedLang('');
  };

  // Trigger Local Choose File
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Submit Complaint Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!issue.trim()) {
      newErrors.issue = 'Please describe the core issue in a short title.';
    }
    if (issue.trim().length < 5) {
      newErrors.issue = 'Title must be at least 5 characters.';
    }
    if (!description.trim()) {
      newErrors.description = 'Please provide details about the location or problem.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const steps = [
        'Uploading secure image payload...',
        'Extracting EXIF GPS telemetry coordinates...',
        'AI Analyzing category classifications...',
        'Routing complaint ticket to Ward 42 Desk Hub...',
        'Generating digital sovereign grievance token...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setSubmitStepMessage(steps[i]);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Generate a beautiful new complaint item
      const complaintId = 'CMP' + Math.floor(100000 + Math.random() * 900000);
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      const newComplaint: DemoComplaint = {
        id: complaintId,
        issue: issue.trim(),
        category,
        status: 'Pending',
        priority,
        date: formattedDate,
        ward: 'Ward 42',
        district: 'Madurai',
        timeline: [
          {
            title: 'Complaint Logged Successfully',
            description: `Citizen logged complaint ticket #${complaintId} on the digital ward registry.`,
            time: 'Just Now',
            done: true
          },
          {
            title: 'Sovereign Ward Triage Allocation',
            description: 'AI engine routing ticket to Ward 42 engineering queue.',
            time: 'Awaiting',
            done: false
          },
          {
            title: 'Field Team Deployment Dispatch',
            description: 'Action crew assigned and loaded to inspect damage coordinates.',
            time: 'Awaiting',
            done: false
          },
          {
            title: 'Grievance Resolution Closure',
            description: 'Resolution completed with photographic proof-of-work dispatches.',
            time: 'Awaiting',
            done: false
          }
        ]
      };

      onAddComplaint(newComplaint);
      setSubmitSuccess(true);
      
      // Delay closing modal so the success state can be admired
      setTimeout(() => {
        onClose();
        resetForm();
      }, 1500);

    } catch (err) {
      setErrors({ submit: 'Filing dispatch failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not open, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="report-issue-modal">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white border border-slate-200 rounded-2xl md3-shadow-2xl overflow-hidden w-full max-w-lg flex flex-col max-h-[90vh]"
      >
        {/* Header bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider font-mono flex items-center gap-2">
              <Camera className="h-4 w-4 text-gov-blue" />
              Report New Ward Grievance
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">Map structural disrepair directly into municipal field queues.</p>
          </div>
          <button 
            onClick={() => { onClose(); resetForm(); }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal content area */}
        <div className="p-6 overflow-y-auto space-y-5 flex-grow text-left">
          <AnimatePresence mode="wait">
            {isSubmitting && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center space-y-4 py-12 min-h-[300px]"
              >
                <div className="relative">
                  <div className="h-14 w-14 rounded-full border-4 border-gov-blue/20 border-t-gov-blue animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5.5 w-5.5 text-gov-blue" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide font-mono">Sovereign Triage Dispatch</h4>
                  <p className="text-xs text-slate-500 font-semibold">{submitStepMessage}</p>
                </div>
              </motion.div>
            )}

            {submitSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-4 py-12 min-h-[300px]"
              >
                <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 scale-115 shadow-sm">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">Grievance Registered!</h4>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed max-w-xs">
                    Your complaint has been successfully queued. Ward Field Team has been alerted.
                  </p>
                </div>
                <p className="text-[10px] text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-mono font-bold animate-pulse">
                  Updating Sovereign Citizen Ledger...
                </p>
              </motion.div>
            )}

            {!isSubmitting && !submitSuccess && (
              <motion.form 
                initial={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {errors.submit && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-danger-light border border-danger/10 text-xs text-danger font-medium">
                    <AlertCircle className="h-4.5 w-4.5 text-danger shrink-0 mt-0.5" />
                    <span>{errors.submit}</span>
                  </div>
                )}

                {/* Grid Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Issue Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold"
                    >
                      <option value="Road">🛣️ Road damage / potholes</option>
                      <option value="Water">🚰 Water supply / leakage</option>
                      <option value="Garbage">🚮 Garbage overflow</option>
                      <option value="Streetlight">💡 Streetlight failure</option>
                      <option value="Drainage">🌀 Drainage blockages</option>
                      <option value="Others">📁 Others / Municipal general</option>
                    </select>
                  </div>

                  {/* Priority dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Severity Index *</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold"
                    >
                      <option value="Low">🟢 Low (Routine maintenance)</option>
                      <option value="Medium">🟡 Medium (Normal SLA queue)</option>
                      <option value="High">🟠 High (Impacting ward operations)</option>
                      <option value="Critical">🔴 Critical (Immediate public hazard)</option>
                    </select>
                  </div>
                </div>

                {/* Issue Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Issue Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Huge pothole near the main market entrance"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    className={`w-full px-4 py-2.5 text-sm bg-slate-50 border ${errors.issue ? 'border-danger focus:ring-danger/20' : 'border-slate-300 focus:ring-gov-blue/20 focus:border-gov-blue'} rounded-xl focus:outline-none focus:ring-2 transition-all font-semibold`}
                  />
                  {errors.issue && (
                    <p className="text-[10px] text-danger font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3 shrink-0" /> {errors.issue}
                    </p>
                  )}
                </div>

                {/* Description details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Describe the Issue *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe what happened and mention nearby landmarks if possible."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-4 py-2.5 text-sm bg-slate-50 border ${errors.description ? 'border-danger focus:ring-danger/20' : 'border-slate-300 focus:ring-gov-blue/20 focus:border-gov-blue'} rounded-t-xl focus:outline-none focus:ring-2 transition-all font-semibold resize-none`}
                  />

                  {/* Accessibility Speak and Translation Tray */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-100 border border-t-0 border-slate-300 rounded-b-xl -mt-1.5 text-xs text-slate-600 font-semibold select-none">
                    {/* Speech / Read Aloud */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleSpeak}
                        disabled={!description}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                          isSpeaking 
                            ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-gov-blue disabled:opacity-40 disabled:cursor-not-allowed'
                        }`}
                        title={isSpeaking ? "Stop Voice Readout" : "Listen to description (Text-to-Speech)"}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="h-3.5 w-3.5 animate-pulse text-red-500" />
                            <span>Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3.5 w-3.5 text-slate-500" />
                            <span>Read Aloud 🔊</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Multilingual Translation */}
                    <div className="flex items-center gap-2">
                      {isTranslating ? (
                        <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-gov-blue" />
                          Translating...
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Languages className="h-3.5 w-3.5 text-slate-400" />
                          <select
                            value={selectedLang}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === 'ta') handleTranslate('ta', 'Tamil');
                              else if (val === 'hi') handleTranslate('hi', 'Hindi');
                              else if (val === 'kn') handleTranslate('kn', 'Kannada');
                              else if (val === 'ml') handleTranslate('ml', 'Malayalam');
                            }}
                            disabled={!description || isTranslating}
                            className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[11px] text-slate-700 font-bold hover:bg-slate-50 hover:text-gov-blue focus:outline-none focus:border-gov-blue/50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            <option value="">Translate with AI...</option>
                            <option value="ta">தமிழ் (Tamil)</option>
                            <option value="hi">हिन्दी (Hindi)</option>
                            <option value="kn">ಕನ್ನಡ (Kannada)</option>
                            <option value="ml">മലയാളം (Malayalam)</option>
                          </select>

                          {originalDescription && (
                            <button
                              type="button"
                              onClick={handleRevertDescription}
                              className="px-2 py-1 bg-slate-200 hover:bg-slate-300 border border-slate-300 rounded-md text-[11px] text-slate-700 flex items-center gap-1 cursor-pointer transition-all font-bold"
                              title="Revert to original text"
                            >
                              <RotateCcw className="h-3 w-3" />
                              <span>Original</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {translationError && (
                    <p className="text-[10px] text-danger font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3 shrink-0" /> {translationError}
                    </p>
                  )}

                  {errors.description && (
                    <p className="text-[10px] text-danger font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3 shrink-0" /> {errors.description}
                    </p>
                  )}
                </div>

                {/* Image upload section */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Upload Photos (Optional but Recommended)</label>
                  
                  <div 
                    onClick={handlePhotoClick}
                    className="border-2 border-dashed border-slate-300 hover:border-gov-blue bg-slate-50 hover:bg-slate-100/50 rounded-xl p-5 text-center cursor-pointer flex flex-col items-center justify-center space-y-1.5 group transition-all"
                  >
                    {photoPreview ? (
                      <div className="relative w-full max-h-[140px] rounded-lg overflow-hidden flex items-center justify-center bg-black">
                        <img 
                          src={photoPreview} 
                          alt="Grievance evidence" 
                          className="max-h-[140px] object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute bottom-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white hover:text-danger rounded-lg transition-colors shadow"
                          title="Remove photographic proof"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-400 group-hover:text-gov-blue group-hover:bg-gov-blue-light/50 flex items-center justify-center transition-colors">
                          <Upload className="h-5 w-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-700 group-hover:text-gov-blue transition-colors">
                            Click to upload photo evidence
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            Drag & drop or browse from local files. JPG, PNG up to 10MB.
                          </p>
                        </div>
                      </>
                    )}

                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>

                  {photoPreview && (
                    <div className="pt-1.5 space-y-1.5">
                      <button
                        type="button"
                        disabled={isAnalyzingImage}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAIAnalyzeImage();
                        }}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-ai-purple to-gov-blue hover:from-ai-purple-dark hover:to-gov-blue-dark disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        {isAnalyzingImage ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Analyzing with SmartWard AI...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 text-amber-200" />
                            Describe Issue & Auto-Fill Form with AI
                          </>
                        )}
                      </button>
                      {aiError && (
                        <p className="text-[10px] text-danger font-bold flex items-center gap-1.5 px-1">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {aiError}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* SLA alert block */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-start gap-2.5 text-[10px] text-slate-500 font-semibold leading-relaxed">
                  <Info className="h-4.5 w-4.5 text-gov-blue shrink-0 mt-0.5" />
                  <span>
                    Your geolocation mapped as <strong>Ward 42, Madurai</strong>. Filing dispatches to Ward Engineer, who is bound by a 36-hour maximum SLA triage commitment.
                  </span>
                </div>

                {/* Footer submit button */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => { onClose(); resetForm(); }}
                    className="px-4 py-2.5 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-white bg-gov-blue hover:bg-gov-blue-dark rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    Dispatch Ticket
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

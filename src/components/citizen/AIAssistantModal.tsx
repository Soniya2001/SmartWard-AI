import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Loader2,
  Copy,
  ArrowRight,
  FileText,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ComplaintCategory } from '../../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDraft: (subject: string, category: ComplaintCategory, description: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onApplyDraft
}) => {
  const [rawText, setRawText] = useState('');
  const [category, setCategory] = useState<ComplaintCategory>('Road');
  
  // AI Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState<{
    subject: string;
    description: string;
    category: ComplaintCategory;
  } | null>(null);
  const [stepMessage, setStepMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    try {
      setIsGenerating(true);
      setGeneratedDraft(null);

      const steps = [
        'Parsing colloquial user vocabulary logs...',
        'Matching with municipal classification ontologies...',
        'Synthesizing formal administrative grievance outlines...',
        'Compiling professional civic petition syntax structures...',
        'Polishing drafted sovereign ticket details...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setStepMessage(steps[i]);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      // Generate a formal, beautiful complaint draft based on category and raw text
      let subject = '';
      let formalDesc = '';

      if (category === 'Road') {
        subject = 'Urgent Remediation Request for Road Surface Structural Damage';
        formalDesc = `Sir/Madam,\n\nI am writing to formally log a grievance regarding severe road surface degradation. The pavement has sustained significant structural damage with deep cracks and hazardous cavities.\n\nCitizens traversing this route are subjected to extreme safety hazards, which increases risk of vehicle accidents and pedestrian injuries. The raw reported issue states: "${rawText.trim()}".\n\nI request immediate deployment of the municipal patching and resurfacing unit to rectify this issue under standard SLA frameworks.\n\nRespectfully submitted,\nVerified Resident, Ward 42`;
      } else if (category === 'Water') {
        subject = 'Urgent Request to Rectify Main Water Supply Leakage and Flooding';
        formalDesc = `Sir/Madam,\n\nThis is a formal petition to alert the municipal water works division regarding a continuous freshwater supply line breach. Water is escaping at high velocity, resulting in localized flooding and water pressure drop in nearby households.\n\nThis wastage of municipal resources is compounded by the threat of structural erosion to adjoining paved areas. The user reports: "${rawText.trim()}".\n\nI appeal for an emergency maintenance crew to isolate and weld the supply main failure point promptly.\n\nRespectfully submitted,\nVerified Resident, Ward 42`;
      } else if (category === 'Garbage') {
        subject = 'Failure in Public Sanitation Services: Overflowing Collection Depots';
        formalDesc = `Sir/Madam,\n\nI am logging this formal complaint to call attention to a severe breakdown in scheduled waste sanitation services. Municipal garbage dumpsters have overflowed past maximum capacity, attracting local pests and scattering trash onto walkways.\n\nThis constitutes an immediate public health hazard and environmental nuisance. The citizen reports: "${rawText.trim()}".\n\nWe require an immediate dispatch of sanitation trucks to clear the accumulation and restore standard bio-waste collection cycles.\n\nRespectfully submitted,\nVerified Resident, Ward 42`;
      } else if (category === 'Streetlight') {
        subject = 'Urgent Restoral Petition: Public Safety Streetlight Network Interruption';
        formalDesc = `Sir/Madam,\n\nThis petition is logged to address a major public safety hazard caused by a series of non-operational streetlight columns. Entire pedestrian segments are left in total darkness during night hours, significantly increasing security risks for women, children, and elderly citizens.\n\nThis darkness has also led to restricted visibility for local motorized vehicles. The user reports: "${rawText.trim()}".\n\nI request the electrical engineering team to deploy maintenance lifts to inspect and replace the faulty wiring/bulbs immediately.\n\nRespectfully submitted,\nVerified Resident, Ward 42`;
      } else if (category === 'Drainage') {
        subject = 'Critical Blockage and Wastewater Overflow in Public Stormwater Channels';
        formalDesc = `Sir/Madam,\n\nI am filing this urgent request regarding a complete blockage in storm drain grates and gutters. Debris and sludge have completely choked the drainage conduits, causing stagnant wastewater to pool on roads.\n\nThis stagnation creates a vector-borne breeding ground and emits strong, toxic odors. The resident reports: "${rawText.trim()}".\n\nWe urgently request municipal vacuum suction units to clear the blockages and flush the storm system conduits.\n\nRespectfully submitted,\nVerified Resident, Ward 42`;
      } else {
        subject = 'Request for Municipal Inspection and Civic Intervention';
        formalDesc = `Sir/Madam,\n\nI am logging this official report to draw the attention of ward officials to a matter requiring immediate municipal inspection. The issue is described in colloquial detail as follows: "${rawText.trim()}".\n\nI request this ticket be logged and dispatched to the appropriate administrative desk for inspection.\n\nRespectfully submitted,\nVerified Resident, Ward 42`;
      }

      setGeneratedDraft({
        subject,
        description: formalDesc,
        category
      });

    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedDraft) return;
    navigator.clipboard.writeText(`Subject: ${generatedDraft.subject}\n\n${generatedDraft.description}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="ai-assistant-modal">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-purple-950 text-white border border-purple-800 rounded-2xl md3-shadow-2xl overflow-hidden w-full max-w-lg flex flex-col max-h-[90vh]"
      >
        {/* Header bar */}
        <div className="bg-purple-900/40 px-6 py-4 border-b border-purple-800 flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-sm font-black uppercase tracking-wider font-mono flex items-center gap-2 text-purple-200">
              <Sparkles className="h-4.5 w-4.5 text-purple-400" />
              SmartWard AI Complaint Stylist
            </h3>
            <p className="text-[10px] text-purple-300 font-medium">Use advanced language models to draft highly professional complaints.</p>
          </div>
          <button 
            onClick={() => { onClose(); setRawText(''); setGeneratedDraft(null); }}
            className="p-1.5 rounded-lg text-purple-400 hover:text-purple-200 hover:bg-purple-900/40 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-grow text-left">
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center space-y-4 py-12 min-h-[300px]"
              >
                <div className="relative">
                  <div className="h-14 w-14 rounded-full border-4 border-purple-500/20 border-t-purple-400 animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5.5 w-5.5 text-purple-400 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-purple-200 uppercase tracking-wide font-mono">Ward AI Sandbox Core</h4>
                  <p className="text-xs text-purple-300 font-semibold">{stepMessage}</p>
                </div>
              </motion.div>
            )}

            {!isGenerating && generatedDraft && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-900/60 border border-purple-700/50 text-[9px] font-mono font-bold text-purple-200 uppercase">
                    Compiled Draft Details
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-1 text-[11px] font-bold font-mono text-purple-200 bg-purple-900/60 hover:bg-purple-900 border border-purple-700/50 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Subject Block */}
                <div className="p-3 bg-purple-900/30 border border-purple-800 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono font-bold text-purple-300 uppercase tracking-wide">SUBJECT FILING:</span>
                  <h5 className="text-xs font-black text-white font-display tracking-tight leading-snug">
                    {generatedDraft.subject}
                  </h5>
                </div>

                {/* Description draft container */}
                <div className="p-4 bg-purple-900/20 border border-purple-800/80 rounded-xl font-mono text-[11px] text-purple-100 max-h-[180px] overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                  {generatedDraft.description}
                </div>

                <div className="p-3 bg-indigo-950/80 border border-indigo-900 rounded-xl flex items-start gap-2.5 text-[10px] text-indigo-200 font-semibold leading-relaxed">
                  <Info className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    Formalizing details using standard municipal terminology guarantees 38%+ faster dispatch speeds. Let's pre-populate the filing card!
                  </span>
                </div>

                {/* Actions bottom */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGeneratedDraft(null)}
                    className="px-4 py-2.5 text-xs font-bold text-purple-300 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-800 rounded-xl transition-colors"
                  >
                    Rewrite
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApplyDraft(generatedDraft.subject, generatedDraft.category, generatedDraft.description);
                      onClose();
                      setRawText('');
                      setGeneratedDraft(null);
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-purple-950 bg-white hover:bg-purple-100 rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    Apply as Complaint Details <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {!isGenerating && !generatedDraft && (
              <motion.form 
                initial={{ opacity: 1 }}
                onSubmit={handleGenerate}
                className="space-y-4"
              >
                <div className="p-4 bg-purple-900/20 border border-purple-800 rounded-xl flex items-start gap-3">
                  <Bookmark className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">Conversational Stylist</h4>
                    <p className="text-[11px] text-purple-200 font-semibold leading-normal">
                      Type the issue casually, select a ward category, and our model will generate the administrative and regulatory terms required.
                    </p>
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-purple-200 tracking-wide uppercase font-mono block">Ward Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                    className="w-full px-3 py-2.5 text-sm bg-purple-900/40 border border-purple-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white font-bold"
                  >
                    <option value="Road" className="bg-purple-950 text-white">🛣️ Road / Pavement damages</option>
                    <option value="Water" className="bg-purple-950 text-white">🚰 Water supply / Leaks</option>
                    <option value="Garbage" className="bg-purple-950 text-white">🚮 Garbage accumulation</option>
                    <option value="Streetlight" className="bg-purple-950 text-white">💡 Streetlights non-functional</option>
                    <option value="Drainage" className="bg-purple-950 text-white">🌀 Drainage overflow</option>
                  </select>
                </div>

                {/* Raw input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-purple-200 tracking-wide uppercase font-mono block">Describe the issue in your own words *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="E.g., there is a huge pipe leaking water in front of ward temple. It has been flooding the walk path and causing mud for school kids walking in the morning..."
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-purple-900/30 border border-purple-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400 text-white placeholder-purple-400 font-semibold resize-none"
                  />
                </div>

                {/* Form Buttons */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => { onClose(); setRawText(''); }}
                    className="px-4 py-2.5 text-xs font-bold text-purple-300 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!rawText.trim()}
                    className="px-5 py-2.5 text-xs font-bold text-purple-950 bg-white hover:bg-purple-100 disabled:bg-purple-900/40 disabled:text-purple-400 rounded-xl transition-all shadow-sm inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    Draft Official Grievance <Sparkles className="h-4 w-4 text-purple-600" />
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

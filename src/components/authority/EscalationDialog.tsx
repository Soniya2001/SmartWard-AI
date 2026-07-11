import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, CheckCircle2, ChevronDown } from 'lucide-react';

interface EscalationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EscalationDialog: React.FC<EscalationDialogProps> = ({ isOpen, onClose }) => {
  const [department, setDepartment] = useState<string>('Roads');
  const [escalationReason, setEscalationReason] = useState<string>('Budget limitations');
  const [comments, setComments] = useState<string>('');
  const [sendMlaAlert, setSendMlaAlert] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');

  if (!isOpen) return null;

  const handleEscalateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setReferenceId(`ESC-42-${randomSuffix}`);
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setComments('');
    setDepartment('Roads');
    setEscalationReason('Budget limitations');
    setSendMlaAlert(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative bg-white w-full max-w-lg rounded-2xl md3-shadow-lg overflow-hidden border border-slate-200 text-left flex flex-col max-h-[90vh] z-10 font-sans"
        >
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-rose-600 animate-pulse" />
                  <h3 className="font-display text-base font-black text-slate-900 tracking-tight">
                    Escalate Ward Issue
                  </h3>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleEscalateSubmit} className="flex-grow p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                  Escalate municipal issues directly to administrative officers and department heads. Use the check box to alert the MLA immediately.
                </p>

                {/* 1. Select Department */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wide">
                    Select Department <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 transition-all font-bold text-slate-800 appearance-none pr-10"
                    >
                      <option value="Roads">Roads</option>
                      <option value="Water Supply">Water Supply</option>
                      <option value="Sanitation">Sanitation</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                    <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* 2. Escalation Reason */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wide">
                    Escalation Reason <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={escalationReason}
                      onChange={(e) => setEscalationReason(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 transition-all font-bold text-slate-800 appearance-none pr-10"
                      required
                    >
                      <option value="Budget limitations">Budget limitations</option>
                      <option value="Lack of labor">Lack of labor</option>
                      <option value="Delay in SLA">Delay in SLA</option>
                      <option value="Equipment shortfalls">Equipment shortfalls</option>
                      <option value="Public health risk">Public health risk</option>
                    </select>
                    <ChevronDown className="h-4 w-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* 3. Custom Comments */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wide">
                    Custom Comments <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Provide additional context for the escalation..."
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-medium text-slate-800 placeholder-slate-400 text-xs resize-none"
                    required
                  />
                </div>

                {/* 4. Checkbox: Send high-priority alert to MLA */}
                <div className="flex items-start gap-2.5 p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
                  <input
                    type="checkbox"
                    id="sendMlaAlert"
                    checked={sendMlaAlert}
                    onChange={(e) => setSendMlaAlert(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="sendMlaAlert" className="text-[11px] font-semibold text-slate-700 leading-snug cursor-pointer select-none">
                    <span className="font-bold text-rose-950 block">Send high-priority alert to MLA</span>
                    Notify Madurai North Constituency MLA Office (Shri. G. Thalapathi) via official SMS channel.
                  </label>
                </div>
              </form>

              {/* Bottom Actions */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEscalateSubmit}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldAlert className="h-4 w-4" /> Escalate Issue
                </button>
              </div>
            </>
          ) : (
            /* Success Confirmation Screen */
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 text-center space-y-6 flex flex-col items-center justify-center"
            >
              <div className="h-14 w-14 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center text-emerald-500 shadow-sm">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl font-black text-slate-900 tracking-tight leading-none">
                  Issue Successfully Escalated
                </h3>
                <p className="text-xs text-slate-500 font-medium max-w-sm leading-relaxed mx-auto">
                  Escalation filed successfully for the <strong>{department}</strong> department due to <strong>{escalationReason}</strong>.
                  {sendMlaAlert && <span className="block mt-1 text-rose-700 font-bold">● High-priority alert dispatched to MLA Office.</span>}
                </p>
              </div>

              {/* Reference ID Block */}
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl w-full max-w-xs space-y-1">
                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                  Escalation ID
                </span>
                <span className="text-base font-mono font-black text-emerald-600 block">
                  {referenceId}
                </span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full max-w-xs py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow transition-all cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

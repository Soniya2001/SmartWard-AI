import React, { useState } from 'react';
import { useAuthority } from '../../contexts/AuthorityContext';
import { 
  Settings, Shield, Cpu, Bell, KeyRound, CheckCircle2, SlidersHorizontal 
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentRole } = useAuthority();
  
  // Settings configurations
  const [autoRouting, setAutoRouting] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [smsForwarding, setSmsForwarding] = useState(true);
  const [dualFactor, setDualFactor] = useState(true);

  const handleSaveSettings = () => {
    alert('Administrative settings updated and saved to secure NIC cloud database safely.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-200 pb-4">
        <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
          {currentRole.roleName} Console &gt; System Settings
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              Console Preferences &amp; Safety
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Configure automated dispatch pipelines, custom notification corridors, and AI threshold indices.
            </p>
          </div>
          <div className="text-[10px] font-mono font-bold text-slate-400">
            SSL Handshake: Validated
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* Left Side: Category Controls */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* AI Settings Section */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900">
              <Cpu className="h-5 w-5 text-ai-purple" />
              <h3 className="text-sm font-bold">Sovereign AI Routing Thresholds</h3>
            </div>

            <div className="space-y-4.5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">Auto-classify &amp; Route Complaints</h4>
                  <p className="text-[11px] text-slate-500 leading-normal font-semibold">Enable computer vision models to directly tag, prioritize, and assign incoming complaints without manual queue reviews.</p>
                </div>
                <button 
                  onClick={() => setAutoRouting(!autoRouting)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    autoRouting ? 'bg-gov-blue' : 'bg-slate-250'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    autoRouting ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <hr className="border-slate-100" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800">Model Confidence Target ({confidenceThreshold}%)</h4>
                  <span className="text-[10px] font-bold font-mono text-ai-purple bg-ai-purple-light px-1.5 py-0.5 rounded">High Accuracy</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal font-semibold">Minimum automated matching accuracy required for self-governing dispatches.</p>
                <input 
                  type="range" 
                  min="50" 
                  max="98" 
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-gov-blue"
                />
              </div>
            </div>
          </div>

          {/* Secure Notifications Section */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900">
              <Bell className="h-5 w-5 text-gov-blue" />
              <h3 className="text-sm font-bold">Secure Alert Coordinates</h3>
            </div>

            <div className="space-y-4.5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">Mobile SMS Escalation Pinning</h4>
                  <p className="text-[11px] text-slate-500 leading-normal font-semibold">Transmit high-urgency SLA warnings directly to the ward officer's registered telephone via NIC Gateway.</p>
                </div>
                <button 
                  onClick={() => setSmsForwarding(!smsForwarding)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    smsForwarding ? 'bg-gov-blue' : 'bg-slate-250'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    smsForwarding ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Institutional Cybersecurity Section */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900">
              <Shield className="h-5 w-5 text-emerald-600" />
              <h3 className="text-sm font-bold">Institutional Security &amp; SSL</h3>
            </div>

            <div className="space-y-4.5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-800">Require Hardware Multi-Factor Check</h4>
                  <p className="text-[11px] text-slate-500 leading-normal font-semibold">Mandate secondary hardware security keys or NIC OTP approvals before modifying critical water valve and pothole repair statuses.</p>
                </div>
                <button 
                  onClick={() => setDualFactor(!dualFactor)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    dualFactor ? 'bg-gov-blue' : 'bg-slate-250'
                  }`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    dualFactor ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Quick Profile Summary & Save */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm flex flex-col justify-between h-fit gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900">
              <KeyRound className="h-4.5 w-4.5 text-slate-400" />
              <h3 className="text-xs font-black text-slate-400 font-mono uppercase tracking-wider">Security Profile</h3>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white font-mono ${currentRole.avatarColor}`}>
                  {currentRole.avatarSeed}
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{currentRole.name}</h4>
                  <span className="text-[9px] text-gov-blue font-bold uppercase font-mono tracking-wide bg-gov-blue-light px-1.5 py-0.5 rounded">{currentRole.badge}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 text-[10px] font-semibold text-slate-500 leading-relaxed space-y-1.5">
                <div>Jurisdiction: <strong className="text-slate-800">{currentRole.jurisdiction}</strong></div>
                <div>SECURE ID Token: <code className="text-ai-purple font-bold">NIC-SEC-0982-MMC</code></div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSaveSettings}
            className="w-full py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <CheckCircle2 className="h-4.5 w-4.5" /> Save Device Preferences
          </button>
        </div>

      </div>

    </div>
  );
};

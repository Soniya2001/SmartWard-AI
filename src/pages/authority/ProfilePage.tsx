import React from 'react';
import { useAuthority } from '../../contexts/AuthorityContext';
import { 
  User, Key, Shield, Landmark, MapPin, Contact, Mail, Phone, Calendar 
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentRole } = useAuthority();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-200 pb-4">
        <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
          {currentRole.roleName} Console &gt; Account Identity
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              Official Identity &amp; Credentials
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Encrypted institutional credential card and administrative access clearances.
            </p>
          </div>
          <div className="text-[10px] font-mono font-bold text-slate-400">
            NIC ID: Verified
          </div>
        </div>
      </div>

      {/* Main Credentials Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
        
        {/* Left Side: Professional ID Card */}
        <div className="md:col-span-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6 rounded-2xl md3-shadow-lg text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-bl from-white/5 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none" />
          
          <div className="flex justify-between items-start">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md">
              <Landmark className="h-5 w-5" />
            </div>
            <span className="text-[9px] font-mono font-bold text-white/40 tracking-widest uppercase">NIC NATIONAL ID</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`h-14 w-14 rounded-full flex items-center justify-center text-lg font-bold text-white font-mono shrink-0 border-2 border-white/20 ${currentRole.avatarColor}`}>
                {currentRole.avatarSeed}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-display text-base font-black tracking-tight">{currentRole.name}</h3>
                <span className="text-[10px] font-bold tracking-wider text-gov-blue-light uppercase font-mono">{currentRole.roleName}</span>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] leading-relaxed font-semibold text-slate-300 space-y-1 font-mono">
              <div>DIVISION: {currentRole.jurisdiction}</div>
              <div>DEPT: {currentRole.department}</div>
              <div>AUTH LEVEL: LEVEL-1 APEX</div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-white/50">
            <span>ISSUED: 2026-07-10</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Shield className="h-3 w-3" /> SECURE-SSL
            </span>
          </div>
        </div>

        {/* Right Side: Account Details Table */}
        <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 md3-shadow-sm space-y-6">
          <h3 className="text-xs font-black text-slate-400 font-mono uppercase tracking-wider">Institutional Data Registry</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-1 flex items-start gap-3">
              <Contact className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block font-mono">Legal Name</span>
                <span className="text-sm font-bold text-slate-800">{currentRole.name}</span>
              </div>
            </div>

            <div className="space-y-1 flex items-start gap-3">
              <Mail className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block font-mono"> NIC Email Coordinates</span>
                <span className="text-sm font-bold text-slate-800">{currentRole.email}</span>
              </div>
            </div>

            <div className="space-y-1 flex items-start gap-3">
              <MapPin className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block font-mono">Jurisdiction Bounds</span>
                <span className="text-sm font-bold text-slate-800">{currentRole.jurisdiction}</span>
              </div>
            </div>

            <div className="space-y-1 flex items-start gap-3">
              <Key className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block font-mono">Clearance Hash</span>
                <span className="text-xs font-mono font-bold text-slate-600 block max-w-[200px] truncate">sha256-0x9812df90ab31e84a29</span>
              </div>
            </div>

          </div>

          <hr className="border-slate-100" />

          <p className="text-xs text-slate-400 leading-normal font-semibold">
            Identity information and access logs are synchronized securely under state audit mandates. Contact the NIC helpdesk to request profile revisions.
          </p>
        </div>

      </div>

    </div>
  );
};

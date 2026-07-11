import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Landmark, DollarSign, Users, Award, FileText, 
  MapPin, CheckCircle2, AlertCircle, RefreshCw, Star, 
  ArrowUpRight, Sparkles, Download, Layers, Calendar,
  ShieldAlert, Sliders, Map, Activity, Hammer, Upload, Check, ClipboardList
} from 'lucide-react';
import { useAuthority } from '../../../contexts/AuthorityContext';
import { getDepartmentData } from '../../../utils/departmentData';

interface OfficerDashboardProps {
  kpis: any;
  onActionTrigger: (actionName: string) => void;
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({ kpis, onActionTrigger }) => {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { selectedDepartment } = useAuthority();

  const deptData = getDepartmentData(selectedDepartment);
  const materialsInventory = deptData.materials;
  const assignedCrew = deptData.crew;

  const handlePhotoUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setPhotoUploaded(true);
      onActionTrigger("AI Verification Success");
    }, 2000);
  };

  return (
    <div className="space-y-6 text-left" id="officer-dashboard-root">
      
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-pink-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
              <Hammer className="h-3.5 w-3.5" />
              <span>Executive Engineer Desk</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              {deptData.title}
            </h1>
            <p className="text-xs sm:text-sm text-pink-100 font-medium max-w-xl">
              {deptData.subtitle}
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onActionTrigger("Update Complaint")}
              className="px-4 py-2 bg-white text-pink-950 text-xs font-bold rounded-xl shadow hover:bg-pink-50 transition-all flex items-center gap-1.5"
            >
              <ClipboardList className="h-3.5 w-3.5" /> Update Complaint
            </button>
            <button 
              onClick={() => onActionTrigger("Assign Staff")}
              className="px-4 py-2 bg-pink-800 text-white border border-pink-700 text-xs font-bold rounded-xl shadow hover:bg-pink-700 transition-all flex items-center gap-1.5"
            >
              <Users className="h-3.5 w-3.5" /> Assign Staff
            </button>
          </div>
        </div>
      </div>

      {/* KPI GRID FOR OFFICER */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Assigned Today", value: kpis.today, desc: "New tickets assigned", icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: "In Active Progress", value: kpis.pending, desc: "Squads operating now", icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: "Resolved Today", value: kpis.resolved, desc: "Photographs uploaded", icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "Critical Priority", value: kpis.critical, desc: "SLA response < 2 hrs", icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', pulse: true }
        ].map((k, idx) => {
          const Icon = k.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">{k.label}</span>
                <div className={`p-1.5 rounded-lg ${k.bg} ${k.color}`}>
                   <Icon className={`h-4.5 w-4.5 ${k.pulse ? 'animate-pulse' : ''}`} />
                </div>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-3 tracking-tight">
                {k.value}
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">{k.desc}</p>
            </div>
          );
        })}
      </div>

      {/* MID SECTION: Materials Inventory & Photographic Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Materials Inventory Checklist */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <div className="flex items-center gap-1.5">
              <Hammer className="h-4.5 w-4.5 text-pink-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Materials Stock Inventory</h3>
            </div>
            <span className="text-[9px] font-mono font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-200">PWD Depot Stock</span>
          </div>

          <div className="space-y-4">
            {materialsInventory.map((item) => (
              <div key={item.item} className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-slate-800">{item.item}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono">({item.level})</span>
                    <span className={`text-[10px] font-bold ${item.status === 'Low Stock' || item.status === 'Critical' ? 'text-rose-600' : 'text-emerald-600'}`}>
                      ● {item.status}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${item.color}`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Assigned Work Queue */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-3">
              <div className="flex items-center gap-1.5">
                <ClipboardList className="h-5 w-5 text-pink-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Assigned Work Queue</h3>
              </div>
              <span className="text-[9px] font-bold font-mono text-pink-600 bg-pink-50 px-2 py-0.5 rounded">Live Tracker</span>
            </div>

            <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mb-4">
              Operational track of active and pending tickets assigned to your department. Click "Update Complaint" to log status edits.
            </p>

            <div className="space-y-3 overflow-y-auto max-h-72 pr-1">
              {deptData.complaints.map((complaint) => (
                <div key={complaint.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3 hover:border-slate-350 transition-all">
                  <div className="flex items-center gap-3">
                    {/* Citizen Images */}
                    <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-slate-200 border border-slate-200">
                      {complaint.images && complaint.images.length > 0 ? (
                        <img src={complaint.images[0]} alt="Citizen proof" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[10px] font-mono text-slate-400 bg-slate-100">No image</div>
                      )}
                    </div>
                    {/* Ticket details */}
                    <div className="space-y-0.5 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-950 font-mono">#{complaint.id}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wide ${
                          complaint.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          complaint.status === 'active' ? 'bg-blue-100 text-blue-700' :
                          complaint.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-800 font-bold truncate max-w-[180px]">{complaint.title}</p>
                      <div className="text-[10px] text-slate-400 font-medium">
                        Staff: <strong className="text-slate-600">{complaint.assignedTo || 'Unassigned (Pending)'}</strong>
                      </div>
                    </div>
                  </div>
                  {/* Due Date & Severity */}
                  <div className="text-right shrink-0 space-y-1">
                    <div className="text-[10px] text-slate-500 font-mono font-bold">
                      Due: {complaint.slaDays ? `In ${complaint.slaDays} Days` : 'N/A'}
                    </div>
                    <span className={`inline-block text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                      complaint.severity === 'critical' ? 'bg-rose-100 text-rose-700' :
                      complaint.severity === 'high' ? 'bg-amber-100 text-amber-700' :
                      complaint.severity === 'medium' ? 'bg-slate-100 text-slate-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {complaint.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* LOWER SECTION: Crew Dispatch Schedules */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-150">
          <div className="flex items-center gap-1.5">
            <Users className="h-4.5 w-4.5 text-pink-600" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Field Squad Deployment</h3>
          </div>
          <span className="text-[9px] font-mono font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-200">Active Crew</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {assignedCrew.map((crew) => (
            <div key={crew.name} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>{crew.name}</span>
                <span className="text-pink-600 font-mono font-bold">{crew.strength} men</span>
              </div>
              <div className="text-[11px] text-slate-500 font-semibold">
                Leader: <strong>{crew.leader}</strong>
              </div>
              <div className="text-[11px] text-slate-600 font-bold">
                Deploy Status: <span className="text-pink-700">{crew.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

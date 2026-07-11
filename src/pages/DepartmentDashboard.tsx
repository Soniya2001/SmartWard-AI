import React, { useState, useEffect } from 'react';
import { useAuthority } from '../contexts/AuthorityContext';
import { 
  Users, User, Shield, Briefcase, MapPin, Calendar, CheckCircle2, 
  Clock, AlertCircle, Sparkles, SlidersHorizontal, ArrowRight, Building2,
  Phone, Mail, Globe, Plus, Send, MessageSquare, ClipboardList, RefreshCw, X, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getDepartmentData, StaffProfile } from '../utils/departmentData';

interface FieldStaff {
  id: string;
  name: string;
  role: string;
  photo: string;
  currentTask: string;
  availability: 'Available' | 'Busy' | 'Off Duty';
  assignedCount: number;
  contact: string;
  email: string;
  experience: string;
  tasks: string[];
}

export const DepartmentDashboard: React.FC = () => {
  const { currentRole, selectedDepartment } = useAuthority();

  // Selected staff states for modals
  const [selectedStaffProfile, setSelectedStaffProfile] = useState<FieldStaff | null>(null);
  const [selectedStaffAssign, setSelectedStaffAssign] = useState<FieldStaff | null>(null);
  const [selectedStaffTasks, setSelectedStaffTasks] = useState<FieldStaff | null>(null);

  // Form states for assignment
  const [targetComplaintId, setTargetComplaintId] = useState('WT-3301');
  const [priorityCode, setPriorityCode] = useState('High');
  const [dueDate, setDueDate] = useState('2026-07-12');
  const [notes, setNotes] = useState('');

  // Helper mapper
  const mapStaffProfilesToFieldStaff = (profiles: StaffProfile[]): FieldStaff[] => {
    const photos = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
    ];

    return profiles.map((p, idx) => ({
      id: p.id,
      name: p.name,
      role: p.role,
      photo: photos[idx % photos.length],
      currentTask: p.tasks.length > 0 ? p.tasks[0] : 'Ready for dispatch order',
      availability: p.tasks.length > 0 ? 'Busy' : 'Available',
      assignedCount: p.tasks.length,
      contact: p.contact,
      email: p.email,
      experience: p.experience,
      tasks: p.tasks
    }));
  };

  // Initial Field Staff State
  const [fieldStaff, setFieldStaff] = useState<FieldStaff[]>(() => {
    const rawStaff = getDepartmentData(selectedDepartment || 'Water Supply').staff;
    return mapStaffProfilesToFieldStaff(rawStaff);
  });

  // Sync field staff when selectedDepartment changes
  useEffect(() => {
    const rawStaff = getDepartmentData(selectedDepartment || 'Water Supply').staff;
    setFieldStaff(mapStaffProfilesToFieldStaff(rawStaff));
    
    // Set a sensible default target complaint ID if complaints are available
    const deptData = getDepartmentData(selectedDepartment || 'Water Supply');
    if (deptData.complaints.length > 0) {
      setTargetComplaintId(deptData.complaints[0].id);
    }
  }, [selectedDepartment]);

  const handleAssignTaskLocal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaffAssign) return;

    setFieldStaff(prev => prev.map(staff => {
      if (staff.id === selectedStaffAssign.id) {
        return {
          ...staff,
          availability: 'Busy',
          assignedCount: staff.assignedCount + 1,
          tasks: [...staff.tasks, `#${targetComplaintId}: Newly Assigned. Notes: ${notes || 'None'}`],
          currentTask: `Active assignment: #${targetComplaintId}`
        };
      }
      return staff;
    }));

    alert(`Work order #${targetComplaintId} successfully assigned to ${selectedStaffAssign.name}!`);
    setSelectedStaffAssign(null);
    setNotes('');
  };

  return (
    <div className="space-y-6" id="field-staff-page-root">
      
      {/* 4. FIXED DEPARTMENT CONTEXT HEADER */}
      <div className="bg-gradient-to-r from-sky-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-sky-800/40 shadow-sm animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black tracking-tight text-white font-sans uppercase">
              {currentRole.department}
            </h2>
            <p className="text-[10px] sm:text-xs text-sky-200/80 font-mono font-semibold">
              Madurai Municipal Corporation • {currentRole.jurisdiction}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[9px] font-mono font-extrabold bg-sky-500/20 text-sky-300 px-2.5 py-1 rounded border border-sky-500/30">
            OFFICER SESSION SECURE
          </span>
          <span className="text-[9px] font-mono font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
            UTC: 2026-07-10
          </span>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-1">
        <h1 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Field Staff Management Console
        </h1>
        <p className="text-xs text-slate-500 font-semibold">
          Real-time availability tracking, assignment matrix, and performance metrics for Ward 42 {currentRole.department} squads.
        </p>
      </div>

      {/* 5. FIELD STAFF GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fieldStaff.map((staff) => {
          const statusConfig = {
            'Available': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', dot: 'bg-emerald-500' },
            'Busy': { bg: 'bg-rose-50 text-rose-700 border-rose-100', dot: 'bg-rose-500' },
            'Off Duty': { bg: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' }
          };

          return (
            <div 
              key={staff.id} 
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-sky-400 hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 shadow-sm"
              id={`staff-card-${staff.id}`}
            >
              {/* Profile Overview */}
              <div className="flex items-start gap-4">
                <img 
                  src={staff.photo} 
                  alt={staff.name} 
                  className="h-16 w-16 rounded-xl object-cover border border-slate-100 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1 min-w-0 flex-grow">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 truncate leading-tight">
                      {staff.name}
                    </h3>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase font-mono tracking-wider">
                    {staff.role}
                  </p>
                  
                  {/* Availability Badge */}
                  <div className="pt-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase border ${statusConfig[staff.availability].bg}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusConfig[staff.availability].dot}`} />
                      {staff.availability}
                    </span>
                  </div>
                </div>
              </div>

              {/* Task Details */}
              <div className="space-y-2 text-xs border-t border-b border-slate-100 py-3 font-sans">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Current Assignment:</span>
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                    {staff.assignedCount} Active Tasks
                  </span>
                </div>
                <p className="text-slate-700 font-semibold leading-relaxed truncate" title={staff.currentTask}>
                  {staff.currentTask}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setSelectedStaffProfile(staff)}
                  className="px-2 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 transition-all text-center"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => setSelectedStaffAssign(staff)}
                  disabled={staff.availability === 'Off Duty'}
                  className={`px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all text-center border ${
                    staff.availability === 'Off Duty' 
                      ? 'bg-slate-50 text-slate-300 border-slate-150 cursor-not-allowed'
                      : 'bg-sky-50 border-sky-150 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  Assign Task
                </button>
                <button 
                  onClick={() => setSelectedStaffTasks(staff)}
                  className="px-2 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 transition-all text-center"
                >
                  View Tasks
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* STAFF PROFILE MODAL */}
      <AnimatePresence>
        {selectedStaffProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStaffProfile(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl border border-slate-200 md3-shadow-lg w-full max-w-sm p-5 text-left space-y-4 relative z-10 font-sans"
            >
              <div className="flex justify-between items-start border-b border-slate-150 pb-2">
                <div>
                  <h3 className="font-display font-black text-slate-900 text-sm sm:text-base">
                    Field Officer Profile
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold font-mono uppercase tracking-widest">
                    SmartWard Operations ID: #{selectedStaffProfile.id}
                  </p>
                </div>
                <button onClick={() => setSelectedStaffProfile(null)} className="p-1 rounded-full hover:bg-slate-100">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <img 
                  src={selectedStaffProfile.photo} 
                  alt={selectedStaffProfile.name} 
                  className="h-16 w-16 rounded-xl object-cover border border-slate-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                    {selectedStaffProfile.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-semibold">{selectedStaffProfile.role}</p>
                  <p className="text-[10px] text-sky-600 font-bold mt-1">Water Supply Maintenance Sector</p>
                </div>
              </div>

              <div className="space-y-2 text-xs font-sans border-t pt-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-150">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Experience</span>
                    <strong className="text-slate-800 text-[10px] leading-tight block mt-0.5">
                      {selectedStaffProfile.experience}
                    </strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-150">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Availability</span>
                    <strong className="text-slate-800 text-[10px] block mt-0.5 uppercase font-mono">
                      {selectedStaffProfile.availability}
                    </strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-150 space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-mono font-semibold">{selectedStaffProfile.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span>{selectedStaffProfile.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedStaffProfile(null)}
                  className="px-4 py-2 bg-sky-950 hover:bg-sky-900 text-white text-xs font-bold rounded-lg transition-colors shadow"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ASSIGN TASK DIALOG FROM FIELD STAFF CARD */}
      <AnimatePresence>
        {selectedStaffAssign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStaffAssign(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl border border-slate-200 md3-shadow-lg w-full max-w-md p-5 text-left space-y-4 relative z-10 font-sans"
            >
              <div className="border-b border-slate-150 pb-3 flex justify-between items-start">
                <div>
                  <h3 className="font-display font-black text-slate-900 text-sm sm:text-base tracking-tight">
                    Direct Task Dispatch
                  </h3>
                  <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    Assigning task directly to <strong>{selectedStaffAssign.name}</strong>
                  </p>
                </div>
                <button onClick={() => setSelectedStaffAssign(null)} className="p-1 rounded-full hover:bg-slate-100">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleAssignTaskLocal} className="space-y-3 text-xs font-sans">
                {/* SELECT ACTIVE WATER COMPLAINT */}
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase text-[9px] block">Select Active Ward Complaint</label>
                  <select 
                    value={targetComplaintId}
                    onChange={(e) => setTargetComplaintId(e.target.value)}
                    className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
                  >
                    <option value="WT-3301">#WT-3301: Main Bypass Valve Leak (SWM Sector 4 Corridor)</option>
                    <option value="WT-9842">#WT-9842: Contaminated muddy supply (Bypass Road)</option>
                    <option value="WT-4210">#WT-4210: Water main fracture (West Street Crossing)</option>
                    <option value="WT-1102">#WT-1102: Complete overhead pressure drop (North Colony)</option>
                  </select>
                </div>

                {/* PRIORITY SELECTOR */}
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase text-[9px] block">Select Priority Code</label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High', 'Critical'].map((pri) => (
                      <button
                        key={pri}
                        type="button"
                        onClick={() => setPriorityCode(pri)}
                        className={`flex-grow py-1.5 rounded-lg border text-[11px] font-bold text-center transition-all ${
                          priorityCode === pri 
                            ? 'bg-sky-950 border-sky-950 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {pri}
                      </button>
                    ))}
                  </div>
                </div>

                {/* DATE */}
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase text-[9px] block">Expected Completion Date</label>
                  <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
                  />
                </div>

                {/* INSTRUCTIONS */}
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase text-[9px] block">Special Instructions</label>
                  <textarea 
                    placeholder="Enter explicit repair notes, valve codes, safety instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600 min-h-[70px]"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t border-slate-150 pt-3">
                  <button
                    type="button"
                    onClick={() => setSelectedStaffAssign(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-950 hover:bg-sky-900 text-white text-xs font-bold rounded-lg transition-colors shadow"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW CURRENT TASKS TIMELINE MODAL */}
      <AnimatePresence>
        {selectedStaffTasks && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedStaffTasks(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl border border-slate-200 md3-shadow-lg w-full max-w-sm p-5 text-left space-y-4 relative z-10 font-sans"
            >
              <div className="flex justify-between items-start border-b border-slate-150 pb-2">
                <div>
                  <h3 className="font-display font-black text-slate-900 text-sm sm:text-base">
                    Active Tasks Ledger
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Current active assignments loaded for <strong>{selectedStaffTasks.name}</strong>
                  </p>
                </div>
                <button onClick={() => setSelectedStaffTasks(null)} className="p-1 rounded-full hover:bg-slate-100">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4 font-sans text-xs">
                {selectedStaffTasks.tasks.length === 0 ? (
                  <div className="text-center py-6 space-y-1.5 text-slate-400">
                    <CheckCircle2 className="h-8 w-8 text-slate-300 mx-auto" />
                    <p className="font-bold">No active tasks assigned</p>
                    <p className="text-[10px]">Supervisor is available for dispatch.</p>
                  </div>
                ) : (
                  <div className="relative pl-3.5 border-l border-sky-200 space-y-3.5">
                    {selectedStaffTasks.tasks.map((tsk, i) => (
                      <div key={i} className="relative">
                        <span className="absolute -left-[18.5px] top-1 h-2 w-2 rounded-full bg-sky-600" />
                        <p className="font-bold text-slate-800 leading-normal">{tsk}</p>
                        <span className="text-[9px] font-mono font-bold bg-sky-50 text-sky-700 px-1 rounded border border-sky-100 mt-1 inline-block">
                          Active Target SLA
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2 border-t">
                <button
                  onClick={() => setSelectedStaffTasks(null)}
                  className="px-4 py-2 bg-sky-950 hover:bg-sky-900 text-white text-xs font-bold rounded-lg transition-colors shadow"
                >
                  Close Ledger
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

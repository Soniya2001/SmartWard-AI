import React, { useState, useEffect } from 'react';
import { useAuthority } from '../../contexts/AuthorityContext';
import { 
  FileText, Search, Filter, ShieldAlert, CheckCircle2, Clock, 
  AlertCircle, ChevronRight, MessageSquare, ArrowUpDown, ArrowLeft,
  Users, MapPin, Phone, Globe, Upload, Check, Sparkles, Eye, Award, Hammer, X, Trash2, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EscalationDialog } from '../../components/authority/EscalationDialog';
import { getDepartmentData, MockComplaint, updateStoredComplaint, getStoredComplaints } from '../../utils/departmentData';

const CM_ESCALATED_ISSUES: MockComplaint[] = [
  {
    id: 'ESC-4022',
    category: 'Water & Sewage',
    title: 'Inter-district Drainage Canal Contamination Spillover',
    location: 'Coimbatore-Tiruppur Border Canal Network',
    slaDays: 3,
    status: 'pending',
    severity: 'critical',
    reportedAt: '12 mins ago',
    description: 'Coimbatore Dyeing Unit industrial runoff overflowing into Tiruppur agricultural canals. High priority inter-agency escalation. Local collectorates are in gridlock regarding jurisdictional clean-up costs.',
    citizenName: 'Coimbatore Farmer Association',
    preferredLanguage: 'English',
    contact: '+91 90812 77412',
    images: ['https://images.unsplash.com/photo-1599740831119-07284763f831?auto=format&fit=crop&w=800&q=80'],
    ward: 'Coimbatore Division',
    assignedTo: 'State Environmental Board'
  },
  {
    id: 'ESC-9125',
    category: 'Drainage & Storm Water',
    title: 'Bypass Expressway Flood-Basin Sinkhole Structural Failure',
    location: 'Madurai Bypass National Highway (NH-45)',
    slaDays: 2,
    status: 'active',
    severity: 'critical',
    reportedAt: '45 mins ago',
    description: 'Major road subsidence over the primary storm drainage bed. Immediate threat to highway traffic and low-lying residential clusters. Escalated by Madurai District Collector for state emergency funds allocation.',
    citizenName: 'Superintendent PWD Highway',
    preferredLanguage: 'Tamil',
    contact: '+91 94441 55021',
    images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'],
    ward: 'Madurai District',
    assignedTo: 'PWD Highway Team'
  },
  {
    id: 'ESC-8103',
    category: 'Solid Waste Management',
    title: 'State Highway Toxic Dump Combustion Emergency',
    location: 'Salem Bypass Landfill Outer Rim',
    slaDays: 1,
    status: 'pending',
    severity: 'critical',
    reportedAt: '1 hour ago',
    description: 'Unauthorized industrial waste dumped on the state highway margin has caught fire, releasing toxic fumes. Air quality index has crossed hazardous levels. Escalated by Salem District Health Officer for cross-agency fire-containment dispatch.',
    citizenName: 'Salem Citizen Council',
    preferredLanguage: 'English',
    contact: '+91 98402 77412',
    images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'],
    ward: 'Salem District',
    assignedTo: 'Salem Disaster Management'
  }
];

const COLLECTOR_ESCALATED_ISSUES: MockComplaint[] = [
  {
    id: 'ESC-MD-501',
    category: 'Water & Sewage',
    title: 'Anaimalai Reservoir Canal Valve Blockage',
    location: 'Anaimalai Canal Headworks, Madurai',
    slaDays: 2,
    status: 'pending',
    severity: 'critical',
    reportedAt: '15 mins ago',
    description: 'Irrigation canal control valve jammed causing severe water supply disruption in northern agricultural blocks. Escalated by Ward 12 Councillor for emergency technical team deployment due to a jurisdictional deadlock between PWD and Municipal Corporation.',
    citizenName: 'Ward 12 Councillor Office',
    preferredLanguage: 'Tamil',
    contact: '+91 94445 12019',
    images: ['https://images.unsplash.com/photo-1599740831119-07284763f831?auto=format&fit=crop&w=800&q=80'],
    ward: 'Madurai North',
    assignedTo: 'PWD Water Resources'
  },
  {
    id: 'ESC-MD-502',
    category: 'Solid Waste Management',
    title: 'Mattuthavani Terminal Waste Accumulation Crisis',
    location: 'Mattuthavani Integrated Bus Stand, Madurai',
    slaDays: 3,
    status: 'active',
    severity: 'critical',
    reportedAt: '1 hour ago',
    description: 'Over 15 tons of unsegregated organic waste rotting behind the main terminal. Escalated by Madurai Corporation Commissioner. Local health inspectors are facing stiff resistance from the transit private vendors union, requiring District Magistrate administrative enforcement.',
    citizenName: 'Municipal Commissioner Office',
    preferredLanguage: 'English',
    contact: '+91 98402 11025',
    images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'],
    ward: 'Madurai East',
    assignedTo: 'SWM Enforcement Wing'
  },
  {
    id: 'ESC-MD-503',
    category: 'Drainage & Storm Water',
    title: 'Sellur Bypass Core Drainage Conduit Collapse',
    location: 'Sellur Rail Overbridge Bypass, Madurai',
    slaDays: 1,
    status: 'pending',
    severity: 'critical',
    reportedAt: '2 hours ago',
    description: 'Structural collapse of a 4-foot brick conduit under the bypass road. Escalated by Assistant PWD Engineer. Heavy waterlogging has commenced. Local Corporation teams lack the structural heavy shoring equipment to stabilize the highway flank.',
    citizenName: 'Assistant PWD Engineer',
    preferredLanguage: 'English',
    contact: '+91 90812 44321',
    images: ['https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80'],
    ward: 'Madurai Central',
    assignedTo: 'PWD Bridges & Highways Division'
  }
];

export const ComplaintsPage: React.FC = () => {
  const { currentRole, kpis, selectedDepartment, setSelectedDepartment } = useAuthority();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'resolved'>('all');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Gallery Zoom State
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Assign Task Dialog State
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState('Suresh Gopalan');
  const [selectedPriority, setSelectedPriority] = useState('High');
  const [expectedDate, setExpectedDate] = useState('2026-07-12');
  const [instructions, setInstructions] = useState('');

  // Status Update Dropdown State
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // Reply state
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<{ id: string; text: string; time: string; author: string }[]>([]);

  // Simulated complaints database
  const [complaints, setComplaints] = useState<MockComplaint[]>(() => {
    if (currentRole.id === 'cm' || currentRole.id === 'minister') {
      return CM_ESCALATED_ISSUES;
    }
    if (currentRole.id === 'collector') {
      return COLLECTOR_ESCALATED_ISSUES;
    }
    return getDepartmentData(selectedDepartment || 'Water Supply').complaints;
  });

  // Keep complaints in sync with switcher department
  useEffect(() => {
    if (currentRole.id === 'cm' || currentRole.id === 'minister') {
      setComplaints(CM_ESCALATED_ISSUES);
      setSelectedTicketId(null);
    } else if (currentRole.id === 'collector') {
      setComplaints(COLLECTOR_ESCALATED_ISSUES);
      setSelectedTicketId(null);
    } else if (currentRole.id === 'officer' || currentRole.id === 'councillor') {
      const data = getDepartmentData(selectedDepartment);
      setComplaints(data.complaints);
      setSelectedTicketId(null); // Clear active ticket selection on department switch
    }
  }, [selectedDepartment, currentRole.id]);

  // Authority Images Upload state
  const [progressImages, setProgressImages] = useState<Record<string, {
    before?: { url: string; time: string; officer: string };
    during?: { url: string; time: string; officer: string };
    after?: { url: string; time: string; officer: string };
  }>>(() => {
    const saved = localStorage.getItem('authority_progress_images');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      'WT-3301': {},
      'WT-9842': {
        before: {
          url: 'https://images.unsplash.com/photo-1599740831119-07284763f831?auto=format&fit=crop&w=800&q=80',
          time: '2026-07-10 11:30 AM',
          officer: 'Er. Rajesh Kumar'
        }
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('authority_progress_images', JSON.stringify(progressImages));
  }, [progressImages]);

  // Timeline State
  const [customTimelines, setCustomTimelines] = useState<Record<string, string[]>>({
    'WT-3301': ['Grievance filed by citizen via SmartWard Mobile app.', 'Auto-triaged to Ward 42 Water Supply Department.'],
    'WT-9842': ['Grievance filed by citizen.', 'Assigned to Suresh Gopalan.', 'Field work started on the utility line.']
  });

  const [escalationTargetComplaint, setEscalationTargetComplaint] = useState<any>(null);
  const [selectedTimelineComplaintId, setSelectedTimelineComplaintId] = useState<string | null>(null);

  const selectedComplaint = (() => {
    if (!selectedTicketId) return null;
    const all = getStoredComplaints();
    return all.find(c => c.id === selectedTicketId) || complaints.find(c => c.id === selectedTicketId) || null;
  })();

  const filtered = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.id.toLowerCase().includes(search.toLowerCase()) ||
                          c.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAssignTask = () => {
    if (!selectedTicketId) return;
    
    // Update complaint state
    setComplaints(prev => prev.map(c => {
      if (c.id === selectedTicketId) {
        return {
          ...c,
          status: 'active',
          assignedTo: selectedStaff,
          severity: selectedPriority as any
        };
      }
      return c;
    }));

    // Update in localStorage
    updateStoredComplaint(selectedTicketId, {
      status: 'active',
      assignedTo: selectedStaff,
      severity: selectedPriority as any
    });

    // Update timeline
    setCustomTimelines(prev => ({
      ...prev,
      [selectedTicketId]: [
        ...(prev[selectedTicketId] || []),
        `Assigned to ${selectedStaff} by Er. Rajesh Kumar. Notes: "${instructions || 'None'}"`
      ]
    }));

    setIsAssignDialogOpen(false);
    setInstructions('');
    alert(`Task assigned successfully to ${selectedStaff}!`);
  };

  const handleStatusChange = (newStatus: 'pending' | 'active' | 'resolved' | 'closed') => {
    if (!selectedTicketId) return;
    
    setComplaints(prev => prev.map(c => {
      if (c.id === selectedTicketId) {
        return { ...c, status: newStatus };
      }
      return c;
    }));

    // Update in localStorage
    updateStoredComplaint(selectedTicketId, { status: newStatus });

    setCustomTimelines(prev => ({
      ...prev,
      [selectedTicketId]: [
        ...(prev[selectedTicketId] || []),
        `Status updated to "${newStatus.toUpperCase()}" by Er. Rajesh Kumar.`
      ]
    }));

    setShowStatusMenu(false);
    alert(`Complaint status updated to ${newStatus.toUpperCase()}!`);
  };

  const handleAcceptComplaint = () => {
    if (!selectedTicketId) return;
    setComplaints(prev => prev.map(c => {
      if (c.id === selectedTicketId) {
        return { ...c, status: 'active' };
      }
      return c;
    }));

    // Update in localStorage
    updateStoredComplaint(selectedTicketId, { status: 'active' });

    setCustomTimelines(prev => ({
      ...prev,
      [selectedTicketId]: [
        ...(prev[selectedTicketId] || []),
        'Complaint accepted by Department Officer Er. Rajesh Kumar.'
      ]
    }));
    alert('Complaint has been marked as ACCEPTED.');
  };

  const handleMarkAsCompleted = () => {
    if (!selectedTicketId) return;
    setComplaints(prev => prev.map(c => {
      if (c.id === selectedTicketId) {
        return { ...c, status: 'resolved' };
      }
      return c;
    }));

    // Update in localStorage
    updateStoredComplaint(selectedTicketId, { status: 'resolved' });

    setCustomTimelines(prev => ({
      ...prev,
      [selectedTicketId]: [
        ...(prev[selectedTicketId] || []),
        'Work marked as COMPLETED. Sent to citizen for verification.'
      ]
    }));
    alert('Complaint marked as COMPLETED.');
  };

  const handleReplyToCitizen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicketId) return;

    const newReply = {
      id: Math.random().toString(),
      text: replyText,
      time: 'Just Now',
      author: 'Er. Rajesh Kumar (Executive Engineer)'
    };

    setReplies(prev => [...prev, newReply]);

    // Update in localStorage
    const currentReplies = selectedComplaint?.replies || [];
    updateStoredComplaint(selectedTicketId, {
      replies: [...currentReplies, newReply]
    } as any);

    setCustomTimelines(prev => ({
      ...prev,
      [selectedTicketId]: [
        ...(prev[selectedTicketId] || []),
        `Reply sent to citizen: "${replyText}"`
      ]
    }));

    setReplyText('');
    alert('Reply dispatched directly to citizen portal!');
  };

  const simulateProgressUpload = (type: 'before' | 'during' | 'after') => {
    if (!selectedTicketId) return;

    const urls = {
      before: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=800&q=80',
      during: 'https://images.unsplash.com/photo-1599740831119-07284763f831?auto=format&fit=crop&w=800&q=80',
      after: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'
    };

    setProgressImages(prev => {
      const current = prev[selectedTicketId] || {};
      return {
        ...prev,
        [selectedTicketId]: {
          ...current,
          [type]: {
            url: urls[type],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString(),
            officer: 'Er. Rajesh Kumar'
          }
        }
      };
    });

    setCustomTimelines(prev => ({
      ...prev,
      [selectedTicketId]: [
        ...(prev[selectedTicketId] || []),
        `Progress image (${type.toUpperCase()} repair) uploaded by Er. Rajesh Kumar.`
      ]
    }));

    alert(`${type.toUpperCase()} repair image uploaded successfully!`);
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'during' | 'after') => {
    if (!selectedTicketId) return;
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setProgressImages(prev => {
          const current = prev[selectedTicketId] || {};
          return {
            ...prev,
            [selectedTicketId]: {
              ...current,
              [type]: {
                url: dataUrl,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + new Date().toLocaleDateString(),
                officer: 'Er. Rajesh Kumar'
              }
            }
          };
        });

        setCustomTimelines(prev => ({
          ...prev,
          [selectedTicketId]: [
            ...(prev[selectedTicketId] || []),
            `Progress image (${type.toUpperCase()} repair) manually uploaded by Er. Rajesh Kumar.`
          ]
        }));

        alert(`${type.toUpperCase()} repair image uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProgressImage = (type: 'before' | 'during' | 'after') => {
    if (!selectedTicketId) return;
    setProgressImages(prev => {
      const current = { ...(prev[selectedTicketId] || {}) };
      delete current[type];
      return {
        ...prev,
        [selectedTicketId]: current
      };
    });

    setCustomTimelines(prev => ({
      ...prev,
      [selectedTicketId]: [
        ...(prev[selectedTicketId] || []),
        `Progress image (${type.toUpperCase()} repair) removed by Er. Rajesh Kumar.`
      ]
    }));
  };

  const handleReopenComplaint = () => {
    if (!selectedTicketId) return;
    setComplaints(prev => prev.map(c => {
      if (c.id === selectedTicketId) {
        return { 
          ...c, 
          status: 'pending',
          rating: undefined,
          feedback: undefined
        };
      }
      return c;
    }));

    // Update in localStorage
    updateStoredComplaint(selectedTicketId, { 
      status: 'pending',
      rating: undefined,
      feedback: undefined
    });

    setCustomTimelines(prev => ({
      ...prev,
      [selectedTicketId]: [
        ...(prev[selectedTicketId] || []),
        'Complaint has been REOPENED for further field investigation and repair.'
      ]
    }));
    alert('Complaint status has been reset to PENDING and reopened successfully.');
  };

  return (
    <div className="space-y-6" id="complaints-page-root">
      
      {/* 4. FIXED DEPARTMENT CONTEXT HEADER */}
      <div className="bg-gradient-to-r from-sky-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-sky-800/40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold">
            <Globe className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black tracking-tight text-white font-sans uppercase">
              {(currentRole.id === 'cm' || currentRole.id === 'minister') ? 'Apex State Command' : currentRole.id === 'collector' ? 'District Magistracy Command' : currentRole.department}
            </h2>
            <p className="text-[10px] sm:text-xs text-sky-200/80 font-mono font-semibold">
              {(currentRole.id === 'cm' || currentRole.id === 'minister') ? 'Tamil Nadu Secretariat' : currentRole.id === 'collector' ? 'Madurai District Collectorate' : 'Madurai Municipal Corporation'} • {currentRole.jurisdiction}
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

      <AnimatePresence mode="wait">
        {!selectedTicketId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Header Title Block */}
            <div className="space-y-1">
              <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {(currentRole.id === 'cm' || currentRole.id === 'minister') ? 'Sovereign Critical Issues Queue' : currentRole.id === 'collector' ? 'Magistrate Critical Issues Queue' : 'Department Complaint Queue'}
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                {(currentRole.id === 'cm' || currentRole.id === 'minister') 
                  ? 'Escalated administrative and infrastructure issues from municipal and district authorities requiring state-level action.'
                  : currentRole.id === 'collector'
                  ? 'Escalated infrastructure and boundary deadlocks routed from ward councillors and municipal officers requiring collector-level intervention.'
                  : `Official operational ledger of citizen complaints routed to ${selectedDepartment || 'Water Supply Division'}.`}
              </p>
            </div>

            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-slate-50 text-slate-500 rounded-lg">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Aggregate Inflow</span>
                  <span className="text-sm font-black text-slate-800">{complaints.length} Tickets</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Pending Reviews</span>
                  <span className="text-sm font-black text-amber-600">
                    {complaints.filter(c => c.status === 'pending').length} Tickets
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Resolved SLA</span>
                  <span className="text-sm font-black text-emerald-600">
                    {complaints.filter(c => c.status === 'resolved').length} Closed
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center gap-3 shadow-sm">
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                  <AlertCircle className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase font-mono block">Critical Priority</span>
                  <span className="text-sm font-black text-rose-600 font-mono">
                    {complaints.filter(c => c.severity === 'critical').length} Urgent
                  </span>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-3 justify-between items-stretch lg:items-center bg-white p-4 rounded-xl border border-slate-200/80">
              <div className="flex flex-col md:flex-row gap-3 flex-grow">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder={`Search ${selectedDepartment} tickets by ID, location, or keyword...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:bg-white focus:ring-sky-600 transition-all font-semibold"
                  />
                </div>

                {/* Department Dropdown for Councillor & Officer */}
                {(currentRole.id === 'councillor' || currentRole.id === 'officer') && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider whitespace-nowrap font-mono">Dept:</span>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="bg-slate-50 border border-slate-200 hover:border-sky-500 text-xs font-bold text-slate-700 py-2.5 px-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer transition-all w-full md:w-56"
                    >
                      {[
                        'Roads Department',
                        'Water Supply',
                        'Sanitation',
                        'Electrical',
                        'Drainage & Storm Water',
                        'Solid Waste Management',
                        'Street Lighting',
                        'Parks & Public Spaces'
                      ].map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 justify-start lg:justify-end">
                {(['all', 'pending', 'active', 'resolved'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize border transition-all shrink-0 ${
                      statusFilter === st 
                        ? 'bg-sky-950 text-white border-sky-950 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st === 'all' ? 'All Complaints' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200/80 space-y-2">
                  <FileText className="h-10 w-10 text-slate-300 mx-auto" />
                  <h3 className="font-bold text-slate-700">No active complaints</h3>
                  <p className="text-xs text-slate-400 font-semibold">Clear filters or try a different search phrase.</p>
                </div>
              ) : (
                filtered.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedTicketId(item.id)}
                    className="bg-white p-4.5 rounded-xl border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wide">
                          #{item.id}
                        </span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-bold text-slate-700">{item.category}</span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className={`text-[10px] font-bold font-mono uppercase px-1.5 py-0.5 rounded ${
                          item.severity === 'critical' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                          item.severity === 'high' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {item.severity} Priority
                        </span>
                        {item.assignedTo && (
                          <>
                            <span className="text-xs text-slate-300">•</span>
                            <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded font-bold">
                              Assigned To: {item.assignedTo}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {item.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-end gap-2 border-t md:border-t-0 pt-3.5 md:pt-0 border-slate-100 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${
                          item.status === 'resolved' ? 'bg-emerald-500' :
                          item.status === 'active' ? 'bg-sky-600' : 'bg-amber-500'
                        }`} />
                        <span className="text-xs font-bold text-slate-700 capitalize">
                          {item.status === 'active' ? 'Assigned / In Progress' : item.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-right">
                        <span className="text-[10px] font-mono text-slate-400 block font-semibold mb-1">Reported {item.reportedAt}</span>
                        
                        {currentRole.id === 'councillor' ? (
                          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch gap-1.5 justify-end">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTicketId(item.id);
                              }}
                              className="text-[11px] font-bold text-sky-600 hover:text-sky-800 hover:underline inline-flex items-center justify-center gap-1 bg-sky-50 hover:bg-sky-100/60 px-2.5 py-1.5 rounded-lg border border-sky-100 transition-all cursor-pointer"
                            >
                              <Eye className="h-3 w-3" /> View Details
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setEscalationTargetComplaint({
                                  id: item.id,
                                  title: item.title,
                                  category: item.category,
                                  ward: item.ward || '42',
                                  status: item.status,
                                  severity: item.severity
                                });
                              }}
                              className="text-[11px] font-bold text-rose-600 hover:text-rose-800 hover:underline inline-flex items-center justify-center gap-1 bg-rose-50 hover:bg-rose-100/60 px-2.5 py-1.5 rounded-lg border border-rose-100 transition-all cursor-pointer"
                            >
                              <ShieldAlert className="h-3 w-3" /> Escalate
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTimelineComplaintId(item.id);
                              }}
                              className="text-[11px] font-bold text-teal-600 hover:text-teal-800 hover:underline inline-flex items-center justify-center gap-1 bg-teal-50 hover:bg-teal-100/60 px-2.5 py-1.5 rounded-lg border border-teal-100 transition-all cursor-pointer"
                            >
                              <Clock className="h-3 w-3" /> View Timeline
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTicketId(item.id);
                            }}
                            className="text-xs font-bold text-sky-600 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                          >
                            Manage Ticket <ChevronRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* BACK BUTTON AND HEADER */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedTicketId(null)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors focus:outline-none"
                  title="Back to List"
                >
                  <ArrowLeft className="h-4.5 w-4.5" />
                </button>
                <div>
                  <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                    #{selectedComplaint?.id} • {selectedComplaint?.category} operations
                  </div>
                  <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    Complaint Details Workspace
                  </h1>
                </div>
              </div>

              {/* ACTION MENU STRIP */}
              <div className="flex flex-wrap items-center gap-2">
                {selectedComplaint?.status === 'closed' ? (
                  <button 
                    onClick={handleReopenComplaint}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-md cursor-pointer font-sans"
                  >
                    <ArrowUpDown className="h-3.5 w-3.5 animate-bounce" /> Reopen Complaint
                  </button>
                ) : (
                  <>
                    {selectedComplaint?.status === 'pending' && (
                      <button 
                        onClick={handleAcceptComplaint}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-lg text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        Accept Complaint
                      </button>
                    )}
                    <button 
                      onClick={() => setIsAssignDialogOpen(true)}
                      className="px-3 py-1.5 bg-sky-950 hover:bg-sky-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Users className="h-3.5 w-3.5" /> Assign Field Staff
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowStatusMenu(!showStatusMenu)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Update Status ({selectedComplaint?.status})</span>
                      </button>
                      {showStatusMenu && (
                        <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg border border-slate-200 shadow-lg z-50 py-1 font-sans text-xs">
                          {['pending', 'active', 'resolved', 'closed'].map((st) => (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(st as any)}
                              className="w-full px-3 py-2 text-left hover:bg-slate-50 font-bold capitalize text-slate-700 cursor-pointer"
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={handleMarkAsCompleted}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Mark Completed
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* WORKSPACE DUAL GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT SIDE: DETAILS CARD */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 1. COMPLAINT & CITIZEN DIRECT INFORMATION */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="h-4.5 w-4.5 text-sky-600" />
                      Grievance Audit Information
                    </h3>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      selectedComplaint?.status === 'resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      selectedComplaint?.status === 'active' ? 'bg-sky-50 text-sky-700 border border-sky-100' :
                      'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {selectedComplaint?.status === 'active' ? 'Assigned' : selectedComplaint?.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">Ticket ID</span>
                      <strong className="text-slate-800 font-mono text-sm">#{selectedComplaint?.id}</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">Complaint Title</span>
                      <strong className="text-slate-800 text-sm block">{selectedComplaint?.title}</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">Category / Sector</span>
                      <strong className="text-slate-800 block">{selectedComplaint?.category}</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">Severity / Priority</span>
                      <strong className={`font-mono text-[11px] font-bold uppercase ${
                        selectedComplaint?.severity === 'critical' ? 'text-rose-600' : 'text-amber-600'
                      }`}>
                        {selectedComplaint?.severity}
                      </strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">Reported Date / Time</span>
                      <strong className="text-slate-700 block">2026-07-10 • {selectedComplaint?.reportedAt}</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">Ward Location</span>
                      <strong className="text-slate-700 block">Ward 42, Madurai Corp.</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">assigned supervisor</span>
                      <strong className="text-sky-700 block font-bold">{selectedComplaint?.assignedTo || "Unassigned"}</strong>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-semibold text-[10px] uppercase block">GPS coordinates</span>
                      <span className="text-slate-600 font-mono text-[11px] block">{selectedComplaint?.location}</span>
                    </div>
                  </div>

                  {/* MAP PLACEHOLDER */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5 flex flex-col items-center justify-center text-center space-y-1.5 h-36 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />
                    <MapPin className="h-6 w-6 text-sky-600 relative z-10 animate-bounce" />
                    <span className="text-[11px] font-bold text-slate-700 relative z-10">SmartWard Map Integration</span>
                    <p className="text-[10px] text-slate-400 font-semibold max-w-sm relative z-10">
                      Geofence auto-mapped to Ward 42 boundaries. Proximity search active for matching pipelines.
                    </p>
                  </div>
                </div>

                {/* 2. CITIZEN INFORMATION */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-3.5 shadow-sm">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <Users className="h-4.5 w-4.5 text-sky-600" />
                    Citizen Grievance Profile
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[10px] font-bold uppercase block">Citizen Name</span>
                      <strong className="text-slate-800">{selectedComplaint?.citizenName}</strong>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[10px] font-bold uppercase block">Preferred Language</span>
                      <strong className="text-slate-800 flex items-center gap-1">
                        <Globe className="h-3 w-3 text-slate-400" />
                        {selectedComplaint?.preferredLanguage}
                      </strong>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-slate-400 text-[10px] font-bold uppercase block">Contact Detail</span>
                      <strong className="text-slate-800 flex items-center gap-1 font-mono">
                        <Phone className="h-3 w-3 text-slate-400" />
                        {selectedComplaint?.contact}
                      </strong>
                    </div>
                  </div>
                  <div className="bg-sky-50 border border-sky-100 p-3.5 rounded-lg">
                    <span className="text-[10px] font-bold text-sky-800 uppercase block tracking-wider mb-1">Citizen Statement</span>
                    <p className="text-xs text-sky-950 font-medium leading-relaxed italic">
                      "{selectedComplaint?.description}"
                    </p>
                  </div>
                </div>

                {/* 3. UPLOADED EVIDENCE & ZOOM */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-3 shadow-sm">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Citizen Uploaded Evidence
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {selectedComplaint?.images && selectedComplaint.images.length > 0 ? (
                      selectedComplaint.images.map((imgUrl, i) => (
                        <div 
                          key={i}
                          onClick={() => setZoomedImage(imgUrl)}
                          className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-lg overflow-hidden border border-slate-200 cursor-zoom-in hover:scale-105 transition-transform group"
                        >
                          <img 
                            src={imgUrl} 
                            alt="Citizen proof" 
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full py-6 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-500">
                        No photographic evidence was uploaded by the citizen.
                      </div>
                    )}
                  </div>
                </div>

                {/* CITIZEN RATING & FEEDBACK */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                      Citizen Satisfaction Rating
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded border border-amber-100">
                      Sovereign Feedback Loop
                    </span>
                  </div>

                  {selectedComplaint?.rating ? (
                    <div className="space-y-3 font-sans">
                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-5 w-5 ${
                                star <= (selectedComplaint.rating || 0)
                                  ? 'text-amber-500 fill-amber-500' 
                                  : 'text-slate-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm font-extrabold text-slate-800">
                          {selectedComplaint.rating} out of 5 Stars
                        </span>
                      </div>
                      
                      {selectedComplaint.feedback && (
                        <div className="bg-amber-50/50 border border-amber-100 p-3.5 rounded-xl">
                          <span className="text-[10px] font-bold text-amber-800 uppercase block tracking-wider mb-1">Citizen Feedback Comments</span>
                          <p className="text-xs text-amber-950 font-medium leading-relaxed italic">
                            "{selectedComplaint.feedback}"
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-5 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl">
                      <p className="text-xs font-bold text-slate-500">
                        {selectedComplaint?.status === 'resolved' 
                          ? 'Grievance is completed/resolved. Awaiting resident rating & closure.' 
                          : 'Rating and comments will be available once the grievance is completed and closed by the resident.'}
                      </p>
                    </div>
                  )}
                </div>

                {/* 4. AUTHORITY IMAGE UPLOAD (BEFORE / DURING / AFTER) */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4 shadow-sm" id="work-progress-section">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        Work Progress Evidence
                      </h3>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                        Photographic logs generated by municipal officers to certify physical resolution phases.
                      </p>
                    </div>
                    <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded border border-emerald-100">
                      Live Citizen Sync
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* BEFORE REPAIR */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">1. Before Repair</span>
                      {progressImages[selectedComplaint!.id]?.before ? (
                        <div className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-50 group">
                          <img 
                            src={progressImages[selectedComplaint!.id].before?.url} 
                            alt="Before repair" 
                            className="h-28 w-full object-cover cursor-zoom-in"
                            onClick={() => setZoomedImage(progressImages[selectedComplaint!.id].before?.url || null)}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveProgressImage('before')}
                            className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 shadow cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <div className="p-2 text-[9px] text-slate-500 font-semibold space-y-0.5">
                            <p>Time: {progressImages[selectedComplaint!.id].before?.time}</p>
                            <p>Officer: {progressImages[selectedComplaint!.id].before?.officer}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-dashed border-slate-200 rounded-lg p-4 h-36 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors relative">
                          <Upload className="h-5 w-5 text-slate-400 mb-1.5" />
                          <label className="text-[10px] font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded border border-sky-100 cursor-pointer transition-colors">
                            Upload File
                            <input 
                              type="file" 
                              accept="image/*"
                              className="hidden" 
                              onChange={(e) => handleManualUpload(e, 'before')} 
                            />
                          </label>
                          <button 
                            onClick={() => simulateProgressUpload('before')}
                            className="text-[9px] font-semibold text-slate-400 hover:text-slate-600 mt-2 hover:underline cursor-pointer"
                          >
                            or Simulate Photo
                          </button>
                        </div>
                      )}
                    </div>

                    {/* DURING REPAIR */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">2. During Repair</span>
                      {progressImages[selectedComplaint!.id]?.during ? (
                        <div className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-50 group">
                          <img 
                            src={progressImages[selectedComplaint!.id].during?.url} 
                            alt="During repair" 
                            className="h-28 w-full object-cover cursor-zoom-in"
                            onClick={() => setZoomedImage(progressImages[selectedComplaint!.id].during?.url || null)}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveProgressImage('during')}
                            className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 shadow cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <div className="p-2 text-[9px] text-slate-500 font-semibold space-y-0.5">
                            <p>Time: {progressImages[selectedComplaint!.id].during?.time}</p>
                            <p>Officer: {progressImages[selectedComplaint!.id].during?.officer}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-dashed border-slate-200 rounded-lg p-4 h-36 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors relative">
                          <Upload className="h-5 w-5 text-slate-400 mb-1.5" />
                          <label className="text-[10px] font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded border border-sky-100 cursor-pointer transition-colors">
                            Upload File
                            <input 
                              type="file" 
                              accept="image/*"
                              className="hidden" 
                              onChange={(e) => handleManualUpload(e, 'during')} 
                            />
                          </label>
                          <button 
                            onClick={() => simulateProgressUpload('during')}
                            className="text-[9px] font-semibold text-slate-400 hover:text-slate-600 mt-2 hover:underline cursor-pointer"
                          >
                            or Simulate Photo
                          </button>
                        </div>
                      )}
                    </div>

                    {/* AFTER REPAIR */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">3. After Repair</span>
                      {progressImages[selectedComplaint!.id]?.after ? (
                        <div className="relative border border-slate-200 rounded-lg overflow-hidden bg-slate-50 group">
                          <img 
                            src={progressImages[selectedComplaint!.id].after?.url} 
                            alt="After repair" 
                            className="h-28 w-full object-cover cursor-zoom-in"
                            onClick={() => setZoomedImage(progressImages[selectedComplaint!.id].after?.url || null)}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveProgressImage('after')}
                            className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-700 shadow cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <div className="p-2 text-[9px] text-slate-500 font-semibold space-y-0.5">
                            <p>Time: {progressImages[selectedComplaint!.id].after?.time}</p>
                            <p>Officer: {progressImages[selectedComplaint!.id].after?.officer}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="border border-dashed border-slate-200 rounded-lg p-4 h-36 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-50 transition-colors relative">
                          <Upload className="h-5 w-5 text-slate-400 mb-1.5" />
                          <label className="text-[10px] font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-2.5 py-1 rounded border border-sky-100 cursor-pointer transition-colors">
                            Upload File
                            <input 
                              type="file" 
                              accept="image/*"
                              className="hidden" 
                              onChange={(e) => handleManualUpload(e, 'after')} 
                            />
                          </label>
                          <button 
                            onClick={() => simulateProgressUpload('after')}
                            className="text-[9px] font-semibold text-slate-400 hover:text-slate-600 mt-2 hover:underline cursor-pointer"
                          >
                            or Simulate Photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 5. REPLY TO CITIZEN */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                    <MessageSquare className="h-4.5 w-4.5 text-sky-600" />
                    Direct Citizen Communication
                  </h3>

                  <form onSubmit={handleReplyToCitizen} className="space-y-3">
                    <textarea
                      placeholder="Type official message dispatch directly to resident's active mobile screen..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full text-xs font-semibold p-3.5 border border-slate-200 rounded-lg bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-sky-600 focus:bg-white min-h-[80px]"
                    />
                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-sky-950 text-white text-xs font-bold rounded-lg hover:bg-sky-900 transition-colors flex items-center gap-2 shadow-sm"
                      >
                        Send Official Response
                      </button>
                    </div>
                  </form>

                  {/* Replies history list */}
                  {replies.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Dispatch History</span>
                      <div className="space-y-2">
                        {replies.map((rep) => (
                          <div key={rep.id} className="p-3 bg-slate-50 rounded-lg border border-slate-150 text-xs">
                            <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                              <strong>{rep.author}</strong>
                              <span>{rep.time}</span>
                            </div>
                            <p className="text-slate-700 font-semibold leading-relaxed">"{rep.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT SIDE: TIMELINE & AI DECISION SUPPORT */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* 6. CONTEXTUAL AI DECISION SUPPORT */}
                <div className="bg-gradient-to-b from-sky-950 to-slate-950 text-white rounded-xl border border-sky-900 p-5 space-y-4 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-28 w-28 bg-sky-500/5 rounded-full pointer-events-none" />
                  
                  <div className="flex items-center justify-between pb-3 border-b border-sky-800/60">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-sky-400 animate-pulse" />
                      <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                        AI Operational Support
                      </h3>
                    </div>
                    <span className="text-[9px] font-bold font-mono bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded">
                      Model Verified
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs font-sans">
                    <div>
                      <span className="text-[9px] font-bold text-sky-300 uppercase font-mono block">Suggested Priority</span>
                      <strong className="text-white text-xs flex items-center gap-1 mt-0.5">
                        <Award className="h-3.5 w-3.5 text-sky-400" />
                        {selectedComplaint?.severity === 'critical' ? 'High Critical Alert' : 'Standard SLA High'}
                      </strong>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-sky-300 uppercase font-mono block">Suggested Team</span>
                      <strong className="text-white text-xs block mt-0.5">Water Maintenance Squad Alpha (Emergency)</strong>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-sky-300 uppercase font-mono block">Estimated Resolution</span>
                      <strong className="text-white block mt-0.5">1-2 Business Days</strong>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-sky-300 uppercase font-mono block">Required Field Staff</span>
                      <p className="text-slate-300 mt-0.5 leading-tight">1 PWD Supervisor + 2 Hydraulics Pipe Welder Technicians</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-sky-300 uppercase font-mono block">Required Equipment</span>
                      <p className="text-slate-300 mt-0.5 leading-tight">Emergency Water Pump, High-Pressure Pipeline Welders, Modular Valves</p>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-sky-300 uppercase font-mono block">Nearby Similar Complaints</span>
                      <p className="text-slate-300 mt-0.5 leading-tight font-semibold text-sky-200">
                        ● 2 nearby drainage and pressure reports detected in Ward 42
                      </p>
                    </div>

                    <div>
                      <span className="text-[9px] font-bold text-sky-300 uppercase font-mono block">Risk Level Assessment</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded mt-0.5">
                        Elevated Hazard: Subsurface Flooding
                      </span>
                    </div>

                    <div className="bg-sky-900/40 p-3 rounded-lg border border-sky-800/40">
                      <span className="text-[9px] font-bold text-sky-300 uppercase block font-mono">Suggested Next Action</span>
                      <p className="text-slate-200 mt-1 font-medium leading-relaxed">
                        Dispatch a combined field crew to inspect the main bypass valve and resolve the related pressure drops on the same visit to optimize vehicle overheads.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 7. COMPLAINT TIMELINE LIFECYCLE */}
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4 shadow-sm">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Complaint Lifecycle
                  </h3>

                  <div className="relative pl-4 border-l-2 border-slate-200 space-y-5 text-xs text-slate-600">
                    {/* Hardcoded milestone markers matching prompt lifecycle */}
                    <div className="relative">
                      <span className="absolute -left-[21px] top-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-white" />
                      <div className="font-bold text-slate-800">Submitted</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Initial citizen filing approved and ledger verified.</p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[21px] top-0.5 h-2 w-2 rounded-full bg-emerald-500 border border-white" />
                      <div className="font-bold text-slate-800">Accepted</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Officer confirmed structural triage classification.</p>
                    </div>

                    <div className="relative">
                      <span className={`absolute -left-[21px] top-0.5 h-2 w-2 rounded-full border border-white ${
                        selectedComplaint?.assignedTo ? 'bg-emerald-500' : 'bg-slate-300'
                      }`} />
                      <div className="font-bold text-slate-800">Assigned</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {selectedComplaint?.assignedTo 
                          ? `Assigned to ${selectedComplaint.assignedTo} for physical repair.` 
                          : 'Awaiting dispatch of field supervisor.'}
                      </p>
                    </div>

                    <div className="relative">
                      <span className={`absolute -left-[21px] top-0.5 h-2 w-2 rounded-full border border-white ${
                        selectedComplaint?.status === 'active' || selectedComplaint?.status === 'resolved' ? 'bg-sky-500' : 'bg-slate-300'
                      }`} />
                      <div className="font-bold text-slate-800">Work Started</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Squad team deployed on bypass grid with repair kits.</p>
                    </div>

                    <div className="relative">
                      <span className={`absolute -left-[21px] top-0.5 h-2 w-2 rounded-full border border-white ${
                        selectedComplaint?.status === 'resolved' ? 'bg-emerald-500' : 'bg-slate-300'
                      }`} />
                      <div className="font-bold text-slate-800">Completed</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Physical repairs finalized, asphalt seal certified.</p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[21px] top-0.5 h-2 w-2 rounded-full bg-slate-300 border border-white" />
                      <div className="font-bold text-slate-800">Citizen Verification</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Sent notification for user-side feedback rating.</p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-[21px] top-0.5 h-2 w-2 rounded-full bg-slate-300 border border-white" />
                      <div className="font-bold text-slate-800">Closed</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">Final archivable ledger entry locked.</p>
                    </div>
                  </div>

                  {/* CUSTOM TIMELINE EVENTS */}
                  {customTimelines[selectedComplaint!.id]?.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Operational Activity Logs</span>
                      <ul className="text-[11px] space-y-1 text-slate-600 font-semibold list-disc list-inside">
                        {customTimelines[selectedComplaint!.id].map((evt, i) => (
                          <li key={i}>{evt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. ASSIGN TASK DIALOG */}
      <AnimatePresence>
        {isAssignDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsAssignDialogOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl border border-slate-200 md3-shadow-lg w-full max-w-md p-5 text-left space-y-4 relative z-10 font-sans"
            >
              <div className="border-b border-slate-150 pb-3">
                <h3 className="font-display font-black text-slate-900 text-sm sm:text-base tracking-tight">
                  Assign Task to Field Staff
                </h3>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                  Select qualified supervisors and priority codes for physical repair work.
                </p>
              </div>

              <div className="space-y-3.5 text-xs font-sans">
                {/* FIELD STAFF */}
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase text-[9px] block">Select Field Staff</label>
                  <select 
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
                  >
                    <option value="Suresh Gopalan">Suresh Gopalan (PWD Site Supervisor - Active)</option>
                    <option value="M. Kartikeyan">M. Kartikeyan (Senior Asphalt Lead - Available)</option>
                    <option value="A. Selvaraj">A. Selvaraj (Hydraulics Technician - Busy)</option>
                    <option value="P. Murugan">P. Murugan (Junior Line Inspector - Available)</option>
                  </select>
                </div>

                {/* PRIORITY */}
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase text-[9px] block">Select Priority Code</label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High', 'Critical'].map((pri) => (
                      <button
                        key={pri}
                        type="button"
                        onClick={() => setSelectedPriority(pri)}
                        className={`flex-grow py-1.5 rounded-lg border text-[11px] font-bold text-center transition-all ${
                          selectedPriority === pri 
                            ? 'bg-sky-950 border-sky-950 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {pri}
                      </button>
                    ))}
                  </div>
                </div>

                {/* EXPECTED COMPLETION DATE */}
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase text-[9px] block">Expected Completion Date</label>
                  <input 
                    type="date"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                    className="w-full text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
                  />
                </div>

                {/* INSTRUCTIONS */}
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase text-[9px] block">Instructions / Operational Notes</label>
                  <textarea 
                    placeholder="Enter dispatch notes, specific machinery requests, safety warnings..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full text-xs font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600 min-h-[70px]"
                  />
                </div>
              </div>

              {/* DIALOG BUTTONS */}
              <div className="flex justify-end gap-2 border-t border-slate-150 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAssignDialogOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAssignTask}
                  className="px-4 py-2 bg-sky-950 hover:bg-sky-900 text-white text-xs font-bold rounded-lg transition-colors shadow"
                >
                  Assign Task
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GALLERY ZOOM MODAL */}
      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setZoomedImage(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full max-h-[85vh] overflow-hidden flex items-center justify-center bg-slate-950 rounded-xl border border-slate-800 z-10"
            >
              <img 
                src={zoomedImage} 
                alt="Zoomed evidence" 
                className="max-w-full max-h-[80vh] object-contain"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setZoomedImage(null)}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center font-bold hover:bg-black/75 transition-colors focus:outline-none text-sm"
              >
                &times;
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <EscalationDialog 
        isOpen={!!escalationTargetComplaint} 
        onClose={() => setEscalationTargetComplaint(null)} 
        complaint={escalationTargetComplaint}
      />

      {/* TIMELINE DIALOG MODAL */}
      <AnimatePresence>
        {selectedTimelineComplaintId && (() => {
          const tc = complaints.find(c => c.id === selectedTimelineComplaintId);
          if (!tc) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedTimelineComplaintId(null)} />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                className="relative bg-white w-full max-w-md rounded-2xl md3-shadow-lg p-6 border border-slate-200 z-10 font-sans text-left"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase tracking-wider">
                      Complaint Lifecycle Status
                    </span>
                    <h3 className="font-display text-sm font-black text-slate-900 uppercase">
                      Timeline for #{tc.id}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedTimelineComplaintId(null)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="relative pl-5 border-l-2 border-slate-200 space-y-4 text-xs text-slate-600 my-4 max-h-[350px] overflow-y-auto">
                  <div className="relative">
                    <span className="absolute -left-[25px] top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    <div className="font-bold text-slate-800">Submitted</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Initial citizen filing approved and ledger verified.</p>
                  </div>

                  <div className="relative">
                    <span className="absolute -left-[25px] top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    <div className="font-bold text-slate-800">Accepted</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Officer confirmed structural triage classification.</p>
                  </div>

                  <div className="relative">
                    <span className={`absolute -left-[25px] top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                      tc.assignedTo ? 'bg-emerald-500' : 'bg-slate-300'
                    }`} />
                    <div className="font-bold text-slate-800">Assigned</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {tc.assignedTo ? `Assigned to ${tc.assignedTo} for physical repair.` : 'Awaiting dispatch of field supervisor.'}
                    </p>
                  </div>

                  <div className="relative">
                    <span className={`absolute -left-[25px] top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                      tc.status === 'active' || tc.status === 'resolved' ? 'bg-sky-500' : 'bg-slate-300'
                    }`} />
                    <div className="font-bold text-slate-800">Work Started</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Squad team deployed on bypass grid with repair kits.</p>
                  </div>

                  <div className="relative">
                    <span className={`absolute -left-[25px] top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                      tc.status === 'resolved' ? 'bg-emerald-500' : 'bg-slate-300'
                    }`} />
                    <div className="font-bold text-slate-800">Completed</div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Physical repairs finalized, asphalt seal certified.</p>
                  </div>
                </div>

                {/* CUSTOM LOG EVENTS FOR THIS CARD */}
                {customTimelines[tc.id]?.length > 0 && (
                  <div className="pt-3 border-t border-slate-100 mt-3 space-y-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                      Operational Activity Logs
                    </span>
                    <ul className="text-[11px] space-y-1 text-slate-600 font-semibold list-disc list-inside">
                      {customTimelines[tc.id].map((evt: string, i: number) => (
                        <li key={i}>{evt}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    onClick={() => setSelectedTimelineComplaintId(null)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
};

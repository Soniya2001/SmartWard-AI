import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ChevronRight, 
  Grid3X3, 
  ListTodo, 
  User, 
  Bell, 
  Award, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  FolderSync,
  Lock,
  Camera,
  Phone,
  MapPin,
  Mail,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import our beautiful extracted widgets
import { 
  CitizenWelcome, 
  QuickActions, 
  ComplaintSummary, 
  ProfileCard, 
  FloatingReportButton 
} from '../components/citizen/DashboardComponents';

import { 
  ComplaintCard, 
  TimelineWidget, 
  NotificationCard, 
  NearbyUpdates, 
  AIAssistantCard, 
  Announcements, 
  CitizenRewards, 
  HelpSupport,
  DemoComplaint,
  DemoNotification,
  DemoAnnouncement,
  DemoRewardBadge
} from '../components/citizen/DashboardWidgets';

import { ReportIssueModal } from '../components/citizen/ReportIssueModal';
import { AIAssistantModal } from '../components/citizen/AIAssistantModal';
import { ComplaintCategory } from '../types';
import { getCitizenComplaints, getStoredComplaints, saveStoredComplaints, mapDemoToMock } from '../utils/departmentData';

// INITIAL DEMO DATA
const INITIAL_COMPLAINTS: DemoComplaint[] = [
  {
    id: 'CMP582910',
    issue: 'Major potholes on Ward 42 Main Avenue Road',
    category: 'Road',
    status: 'In Progress',
    priority: 'High',
    date: 'Jul 08, 2026',
    ward: 'Ward 42',
    district: 'Madurai',
    timeline: [
      { title: 'Complaint Submitted', description: 'Grievance logged via citizen portal using authenticated secure ID.', time: 'Jul 08, 10:00 AM', done: true },
      { title: 'Authority Assigned', description: 'Dispatched to Senior Ward Engineer - M. Selvaraj.', time: 'Jul 08, 02:30 PM', done: true },
      { title: 'Field Inspection Active', description: 'Road repair crew marked site for patching. Asphalt truck loaded.', time: 'Jul 09, 09:15 AM', done: true },
      { title: 'Resolution & Closure', description: 'Asphalt layering and steamroller compaction with photographic proof.', time: 'Awaiting SLA', done: false }
    ]
  },
  {
    id: 'CMP940212',
    issue: 'Continuous freshwater pipeline leakage near Temple tank',
    category: 'Water',
    status: 'Pending',
    priority: 'Critical',
    date: 'Jul 10, 2026',
    ward: 'Ward 42',
    district: 'Madurai',
    timeline: [
      { title: 'Complaint Submitted', description: 'Freshwater line rupture logged by resident Soniya.', time: 'Jul 10, 08:00 AM', done: true },
      { title: 'Authority Assigned', description: 'Allocating emergency water main team desk node 3C.', time: 'In Progress', done: false },
      { title: 'Field Inspection Active', description: 'Excavation of ground conduit to weld steel main failure.', time: 'Awaiting', done: false },
      { title: 'Resolution & Closure', description: 'Water pressure restored, backfilled path compacted.', time: 'Awaiting', done: false }
    ]
  },
  {
    id: 'CMP472911',
    issue: 'Streetlight column failure on 4th Cross Pedestrian Way',
    category: 'Streetlight',
    status: 'Resolved',
    priority: 'Medium',
    date: 'Jul 05, 2026',
    ward: 'Ward 42',
    district: 'Madurai',
    timeline: [
      { title: 'Complaint Submitted', description: 'Dark path hazard reported near senior citizen apartments.', time: 'Jul 05, 09:00 PM', done: true },
      { title: 'Authority Assigned', description: 'Assigned to Ward Electrical Grid Supervisor.', time: 'Jul 06, 08:30 AM', done: true },
      { title: 'Field Work Commenced', description: 'Electrical bucket lift dispatched. Faulty wiring and bulb replaced.', time: 'Jul 06, 11:15 AM', done: true },
      { title: 'Resolution Completed', description: 'Verified illumination active. Resident confirmed work closed.', time: 'Jul 06, 04:00 PM', done: true }
    ]
  },
  {
    id: 'CMP283914',
    issue: 'Garbage dumpsters overflowing on North Bazaar Corner',
    category: 'Garbage',
    status: 'Closed',
    priority: 'High',
    date: 'Jul 01, 2026',
    ward: 'Ward 42',
    district: 'Madurai',
    timeline: [
      { title: 'Grievance Registered', description: 'Excess garbage and health hazard logged.', time: 'Jul 01, 07:00 AM', done: true },
      { title: 'Sanitation Dispatch', description: 'Heavy compactor truck dispatched to clear bin overflows.', time: 'Jul 01, 11:30 AM', done: true },
      { title: 'Clean-up Completed', description: 'Bins emptied and site sprayed with non-toxic sanitizing fluid.', time: 'Jul 01, 01:15 PM', done: true },
      { title: 'Resident Sign-off Verified', description: 'Citizen marked resolution as 5-star satisfactory.', time: 'Jul 02, 10:00 AM', done: true }
    ]
  }
];

const INITIAL_NOTIFICATIONS: DemoNotification[] = [
  {
    id: 'N1',
    title: 'Complaint Assigned',
    description: 'Your water leakage grievance (#CMP940212) has been automatically routed to Senior Ward Engineer Selvaraj.',
    time: '2 hours ago',
    type: 'assigned'
  },
  {
    id: 'N2',
    title: 'Official Team Dispatch',
    description: 'A road maintenance vehicle has been dispatched to begin asphalt repairs on Ward 42 Main Avenue.',
    time: '1 day ago',
    type: 'reply'
  },
  {
    id: 'N3',
    title: 'Resolution Complete',
    description: 'Your streetlight failure ticket #CMP472911 was resolved. Please rate the service quality.',
    time: '4 days ago',
    type: 'resolved'
  }
];

const NEARBY_ISSUES = [
  { id: 'NB1', title: 'Broken sidewalk near Girls Secondary School', category: 'Road', distance: '120m away', status: 'In Progress' },
  { id: 'NB2', title: 'Drain block causing water logging on West Street', category: 'Drainage', distance: '340m away', status: 'In Progress' },
  { id: 'NB3', title: 'Power line sparking on transformer column', category: 'Streetlight', distance: '450m away', status: 'Resolved' }
];

const PUBLIC_ANNOUNCEMENTS: DemoAnnouncement[] = [
  {
    id: 'A1',
    title: 'Scheduled Water Supply Interruption',
    desc: 'Main supply pipes under rehabilitation on Thursday. Please store water. Expected restoration by 8:00 PM.',
    date: 'Jul 12, 2026',
    badge: 'Water Works',
    badgeColor: 'bg-blue-100 border-blue-200 text-blue-800'
  },
  {
    id: 'A2',
    title: 'Anti-Dengue Fogging & Sanitation Drive',
    desc: 'Ward safety workers will conduct block-by-block thermal fogging on Saturday starting 6:00 AM. Keep windows closed.',
    date: 'Jul 15, 2026',
    badge: 'Sanitation',
    badgeColor: 'bg-emerald-100 border-emerald-200 text-emerald-800'
  },
  {
    id: 'A3',
    title: 'New Traffic Diversion: Bazaar Overpass Repair',
    desc: 'Heavy traffic diverted through Bypass Link Road starting tomorrow for structural joint reinforcement.',
    date: 'Jul 11, 2026',
    badge: 'Police / Traffic',
    badgeColor: 'bg-amber-100 border-amber-200 text-amber-800'
  }
];

const REWARD_BADGES: DemoRewardBadge[] = [
  { id: 'B1', name: 'Civic Initiator', description: 'Log your very first verified ward grievance.', earned: true, icon: '🌱' },
  { id: 'B2', name: 'Resolution Auditor', description: 'Verify and rate 3 completed field resolution cards.', earned: true, icon: '⚖️' },
  { id: 'B3', name: 'Ward Champion', description: 'Help clean up 5 physical local hotspots.', earned: false, icon: '🏆' },
  { id: 'B4', name: 'AI Pioneer', description: 'Draft a municipal complaint using the AI Stylist.', earned: true, icon: '⚡' }
];

export const CitizenDashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const profilePhotoInputRef = React.useRef<HTMLInputElement>(null);

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Redirect if not authenticated (or not citizen)
  useEffect(() => {
    if (!user) {
      navigate('/login/citizen');
    } else if (user.role === 'authority') {
      navigate('/authority/dashboard');
    }
  }, [user, navigate]);

  // Dashboard state variables
  const [complaints, setComplaints] = useState<DemoComplaint[]>(() => getCitizenComplaints());
  const [notifications, setNotifications] = useState<DemoNotification[]>(INITIAL_NOTIFICATIONS);
  const [selectedComplaint, setSelectedComplaint] = useState<DemoComplaint | null>(() => {
    const list = getCitizenComplaints();
    return list.length > 0 ? list[0] : null;
  });
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals visibility states
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Form Pre-fills from AI drafts
  const [aiDraftText, setAiDraftText] = useState('');
  const [aiDraftCategory, setAiDraftCategory] = useState<ComplaintCategory>('Road');
  const [aiDraftDescription, setAiDraftDescription] = useState('');

  // Profile Edit fields (in-page mock edit modal)
  const [profileName, setProfileName] = useState(user?.name || 'Soniya Baskaran');
  const [profileWard, setProfileWard] = useState('Ward 42');
  const [profileDistrict, setProfileDistrict] = useState('Madurai');
  const [profileLanguage, setProfileLanguage] = useState('English (EN)');
  const [profileAvatarUrl, setProfileAvatarUrl] = useState(user?.avatarUrl || 'https://api.dicebear.com/7.x/initials/svg?seed=Soniya&backgroundColor=2563eb&textColor=white');
  const [profilePhone, setProfilePhone] = useState('+91 94421 82910');
  const [profileAddress, setProfileAddress] = useState('12, North Bazaar Street, Ward 42, Madurai - 625001');
  const [profileNotifications, setProfileNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });

  // Temporary Edit states (reverts if user Cancels edit)
  const [tempName, setTempName] = useState(profileName);
  const [tempWard, setTempWard] = useState(profileWard);
  const [tempDistrict, setTempDistrict] = useState(profileDistrict);
  const [tempLanguage, setTempLanguage] = useState(profileLanguage);
  const [tempAvatarUrl, setTempAvatarUrl] = useState(profileAvatarUrl);
  const [tempPhone, setTempPhone] = useState(profilePhone);
  const [tempAddress, setTempAddress] = useState(profileAddress);
  const [tempNotifications, setTempNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  
  // Update state if user context loads
  useEffect(() => {
    if (user?.name) {
      setProfileName(user.name);
      setTempName(user.name);
    }
    if (user?.avatarUrl) {
      setProfileAvatarUrl(user.avatarUrl);
      setTempAvatarUrl(user.avatarUrl);
    }
  }, [user]);

  // Poll localStorage for new complaints, replies, or status changes from Authority
  useEffect(() => {
    const checkUpdates = () => {
      const freshList = getCitizenComplaints();
      
      let hasChanges = false;
      const newNotifications: DemoNotification[] = [];

      freshList.forEach((freshItem) => {
        const oldItem = complaints.find(c => c.id === freshItem.id);
        if (!oldItem) {
          return;
        }

        // 1. Status change check
        if (oldItem.status !== freshItem.status) {
          hasChanges = true;
          let notifTitle = 'Status Updated';
          let notifType: 'assigned' | 'reply' | 'resolved' | 'reminder' | 'system' = 'system';
          
          if (freshItem.status === 'In Progress') {
            notifTitle = 'Field Team Dispatched';
            notifType = 'assigned';
          } else if (freshItem.status === 'Resolved') {
            notifTitle = 'Resolution Completed';
            notifType = 'resolved';
          } else if (freshItem.status === 'Closed') {
            notifTitle = 'Grievance Closed';
            notifType = 'resolved';
          }

          newNotifications.push({
            id: 'N_' + freshItem.id + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            title: notifTitle,
            description: `Complaint #${freshItem.id} ("${freshItem.issue}") has been marked as ${freshItem.status}.`,
            time: 'Just Now',
            type: notifType
          });
        }

        // 2. Replies count or content check
        const oldReplies = oldItem.replies || [];
        const freshReplies = freshItem.replies || [];
        if (freshReplies.length > oldReplies.length) {
          hasChanges = true;
          const latestReply = freshReplies[freshReplies.length - 1];
          newNotifications.push({
            id: 'R_' + freshItem.id + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            title: `Official Feedback Received`,
            description: `New message on #${freshItem.id}: "${latestReply.text}" - ${latestReply.author}`,
            time: 'Just Now',
            type: 'reply'
          });
        }
      });

      if (hasChanges || freshList.length !== complaints.length) {
        setComplaints(freshList);
        
        // Update selected complaint if it is the one that changed
        if (selectedComplaint) {
          const updatedSelected = freshList.find(c => c.id === selectedComplaint.id);
          if (updatedSelected) {
            setSelectedComplaint(updatedSelected);
          }
        } else if (freshList.length > 0) {
          setSelectedComplaint(freshList[0]);
        }

        if (newNotifications.length > 0) {
          setNotifications(prev => [...newNotifications, ...prev]);
        }
      }
    };

    const interval = setInterval(checkUpdates, 2000);
    window.addEventListener('focus', checkUpdates);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkUpdates);
    };
  }, [complaints, selectedComplaint]);

  // Handle adding a new complaint
  const handleAddComplaint = (newComplaint: DemoComplaint) => {
    // Map DemoComplaint to MockComplaint and save to localStorage
    const mock = mapDemoToMock(newComplaint);
    const allStored = getStoredComplaints();
    allStored.unshift(mock);
    saveStoredComplaints(allStored);

    // Refresh unified complaints state
    const updatedComplaints = getCitizenComplaints();
    setComplaints(updatedComplaints);
    
    // Find the added complaint in the newly mapped array to keep references happy
    const added = updatedComplaints.find(c => c.id === newComplaint.id) || newComplaint;
    setSelectedComplaint(added); // Instantly highlight in the timeline

    // Add a corresponding in-app alert notification
    const newNotif: DemoNotification = {
      id: 'N' + Math.floor(Math.random() * 10000),
      title: 'New Complaint Queued',
      description: `Your issue regarding "${newComplaint.issue}" was successfully dispatched to ward nodes.`,
      time: 'Just Now',
      type: 'assigned'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handle rating & closing complaint
  const handleRateComplaint = (id: string, rating: number, feedback: string) => {
    const allStored = getStoredComplaints();
    const updatedStored = allStored.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: 'closed' as const,
          rating,
          feedback
        };
      }
      return c;
    });
    saveStoredComplaints(updatedStored);

    // Refresh state
    const updatedComplaints = getCitizenComplaints();
    setComplaints(updatedComplaints);

    // Update active selection
    const updatedSelected = updatedComplaints.find(c => c.id === id);
    if (updatedSelected) {
      setSelectedComplaint(updatedSelected);
    }

    // Add completion sign-off notification
    const signOffNotif: DemoNotification = {
      id: 'SF_' + id + '_' + Date.now(),
      title: 'Sign-Off Feedback Submitted',
      description: `You gave #${id} a ${rating}-star rating. The ticket is officially resolved and archived.`,
      time: 'Just Now',
      type: 'resolved'
    };
    setNotifications(prev => [signOffNotif, ...prev]);
  };

  // Handle AI draft completion
  const handleApplyDraft = (subject: string, category: ComplaintCategory, description: string) => {
    setAiDraftText(subject);
    setAiDraftCategory(category);
    setAiDraftDescription(description);

    // Open ReportIssueModal immediately, with prefilled variables!
    setIsReportOpen(true);
  };

  // Filter complaints based on drop downs
  const filteredComplaints = complaints.filter((comp) => {
    const matchesCategory = categoryFilter === 'All' || comp.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || comp.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  // KPI calculations
  const totalCount = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved' || c.status === 'Closed').length;
  const pendingCount = complaints.filter((c) => c.status === 'Pending').length;
  const activeCount = complaints.filter((c) => c.status === 'In Progress').length;

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans" id="citizen-dashboard-root">
      
      {/* Dynamic App Header */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gov-blue text-white flex items-center justify-center">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-black font-display uppercase tracking-widest leading-none flex items-center gap-1.5">
                Sovereign Portal <span className="text-ai-purple bg-ai-purple-light/10 text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">NODE-OK</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Connected as secure public citizen node: {user?.email || 'soniya@smartward.in'}</p>
            </div>
          </div>
          
          {/* Quick link bar & Notifications Bell */}
          <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>WARD-42 ENGINE ONLINE</span>
            </div>

            <div className="h-4 w-px bg-slate-800" />

            {/* Notification Bell with Floating Panel */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all relative cursor-pointer flex items-center justify-center"
                title="Notification Center"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 bg-rose-500 text-[9px] font-black text-white rounded-full flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden text-slate-800 max-h-[400px] flex flex-col"
                    >
                      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider font-mono text-slate-700">Official Dispatches</span>
                        <span className="text-[10px] font-mono font-bold text-gov-blue bg-gov-blue/10 px-2 py-0.5 rounded-full">
                          {notifications.length} dispatches
                        </span>
                      </div>

                      <div className="overflow-y-auto flex-1 divide-y divide-slate-100 max-h-[300px]">
                        {notifications.length === 0 ? (
                          <div className="py-8 text-center flex flex-col items-center justify-center space-y-1">
                            <span className="text-2xl">📭</span>
                            <p className="text-xs text-slate-400 font-bold">No new dispatch logs.</p>
                          </div>
                        ) : (
                          notifications.map((notif) => (
                            <div key={notif.id} className="p-3 hover:bg-slate-50/80 transition-colors space-y-1 text-left relative group">
                              <div className="flex items-start justify-between gap-2">
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider font-mono ${
                                  notif.type === 'resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                  notif.type === 'assigned' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                  notif.type === 'reply' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                  'bg-slate-100 text-slate-700 border border-slate-200'
                                }`}>
                                  {notif.type}
                                </span>
                                <span className="text-[9px] font-mono text-slate-400">{notif.time}</span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-800">{notif.title}</h5>
                              <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{notif.description}</p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setNotifications(prev => prev.filter(n => n.id !== notif.id));
                                }}
                                className="absolute right-2 top-2 text-[9px] font-bold text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              >
                                Dismiss
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {notifications.length > 0 && (
                        <button
                          onClick={() => {
                            setNotifications([]);
                            setIsNotifOpen(false);
                          }}
                          className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-center text-[10px] font-bold font-mono text-gov-blue uppercase tracking-wider border-t border-slate-200 cursor-pointer"
                        >
                          Clear All Dispatches
                        </button>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Welcome Block */}
        <CitizenWelcome 
          name={profileName}
          avatarUrl={profileAvatarUrl}
          ward={profileWard}
          district={profileDistrict}
          language={profileLanguage}
          email={user?.email || 'citizen@domain.com'}
        />

        {/* Quick Action Matrix */}
        <QuickActions 
          onReportIssue={() => {
            // Reset prefilled variables first so it is clean
            setAiDraftText('');
            setAiDraftCategory('Road');
            setAiDraftDescription('');
            setIsReportOpen(true);
          }}
          onMyComplaints={() => {
            const listEl = document.getElementById('my-complaints-anchor');
            if (listEl) listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          onNotifications={() => {
            const listEl = document.getElementById('notifications-anchor');
            if (listEl) listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          onAnnouncements={() => {
            const listEl = document.getElementById('announcements-anchor');
            if (listEl) listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          onPublicDashboard={() => navigate('/public-dashboard')}
          onNearbyIssues={() => {
            const listEl = document.getElementById('nearby-updates-anchor');
            if (listEl) listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        {/* KPI Performance Section */}
        <ComplaintSummary 
          total={totalCount}
          resolved={resolvedCount}
          pending={pendingCount}
          inProgress={activeCount}
          avgTime="28 Hours"
          avgRating={4.7}
        />

        {/* 3-COLUMN RESPONSIVE LAYOUT (Bento Grid Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMN 1: COMPLAINTS REGISTER (5 cols) */}
          <div className="lg:col-span-5 space-y-5" id="my-complaints-anchor">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              
              {/* Filter panel header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="text-left">
                  <h3 className="text-xs font-black uppercase tracking-wider font-mono text-slate-700 flex items-center gap-1.5">
                    <ListTodo className="h-4.5 w-4.5 text-gov-blue" />
                    My Grievance Ledger
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">Click on any ticket to fetch timeline audit dispatches.</p>
                </div>
                
                {/* Filter selects */}
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold font-mono focus:outline-none focus:ring-1 focus:ring-gov-blue text-slate-600"
                  >
                    <option value="All">All Categories</option>
                    <option value="Road">Road</option>
                    <option value="Water">Water</option>
                    <option value="Garbage">Garbage</option>
                    <option value="Streetlight">Streetlight</option>
                    <option value="Drainage">Drainage</option>
                  </select>
                </div>
              </div>

              {/* Complaints list */}
              {filteredComplaints.length === 0 ? (
                <div className="py-12 border border-dashed border-slate-200 rounded-xl text-center flex flex-col items-center justify-center space-y-2">
                  <span className="text-4xl select-none">📁</span>
                  <div className="space-y-1">
                    <h5 className="font-bold text-slate-700 text-xs">No Complaints Mapped</h5>
                    <p className="text-[10px] text-slate-400 max-w-xs font-semibold">
                      Adjust your active filters or log a new grievance using the report buttons.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
                  {filteredComplaints.map((comp) => (
                    <ComplaintCard 
                      key={comp.id}
                      complaint={comp}
                      isSelected={selectedComplaint?.id === comp.id}
                      onSelect={(c) => setSelectedComplaint(c)}
                      onViewDetails={(c) => setSelectedComplaint(c)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Report New Civic Issue Action Card */}
            <AIAssistantCard onStartAIChoice={() => setIsReportOpen(true)} />
          </div>

          {/* COLUMN 2: ACTIVE DISPATCH TIMELINE & NOTIFICATIONS (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Vertical timeline */}
            <TimelineWidget 
              selectedComplaint={selectedComplaint} 
              onRateComplaint={handleRateComplaint}
            />

            {/* In-app dispatch alerts */}
            <div id="notifications-anchor">
              <NotificationCard 
                notifications={notifications}
                onDismiss={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
              />
            </div>
          </div>

          {/* COLUMN 3: SIDEBAR PANEL (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            
            {/* Profile Info Node */}
            <ProfileCard 
              name={profileName}
              email={user?.email || 'soniya@smartward.in'}
              ward={profileWard}
              district={profileDistrict}
              language={profileLanguage}
              avatarUrl={profileAvatarUrl}
              phone={profilePhone}
              address={profileAddress}
              onPhotoUpload={(base64) => {
                setProfileAvatarUrl(base64);
                setTempAvatarUrl(base64);
                updateUser({ avatarUrl: base64 });
              }}
              onEdit={() => {
                setTempName(profileName);
                setTempWard(profileWard);
                setTempDistrict(profileDistrict);
                setTempLanguage(profileLanguage);
                setTempAvatarUrl(profileAvatarUrl);
                setTempPhone(profilePhone);
                setTempAddress(profileAddress);
                setTempNotifications({...profileNotifications});
                setIsProfileEditOpen(true);
              }}
            />

            {/* Citizen rewards index */}
            <CitizenRewards 
              badges={REWARD_BADGES}
              resolvedCount={resolvedCount}
              participationLevel="Municipal Star"
              leaderboardRank={14}
            />

            {/* announcements card */}
            <div id="announcements-anchor">
              <Announcements items={PUBLIC_ANNOUNCEMENTS} />
            </div>
          </div>

        </div>

        {/* NEARBY CIVIC UPDATES SECTION (FULL WIDTH GRID CARD) */}
        <div id="nearby-updates-anchor">
          <NearbyUpdates 
            updates={NEARBY_ISSUES}
            onExploreMap={() => alert('Launching full-screen high-resolution vector GIS map layer (Demonstration node only).')}
          />
        </div>

        {/* ESCALATIONS AND SUPPORT DECK */}
        <HelpSupport />

      </div>

      {/* FLOATING ACTION REPORT BUTTON */}
      <FloatingReportButton onClick={() => setIsReportOpen(true)} />

      {/* DYNAMIC BACKDROP MODAL: REPORT ISSUE */}
      <ReportIssueModal 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onAddComplaint={handleAddComplaint}
        defaultIssueText={aiDraftText}
        defaultCategory={aiDraftCategory}
      />

      {/* DYNAMIC BACKDROP MODAL: AI COMPLAINT ASSISTANT */}
      <AIAssistantModal 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onApplyDraft={handleApplyDraft}
      />

      {/* IN-PAGE PROFILE EDITOR MODAL */}
      <AnimatePresence>
        {isProfileEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="profile-edit-modal-backdrop">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-2xl md3-shadow-2xl overflow-hidden w-full max-w-lg flex flex-col max-h-[90vh]"
            >
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider font-mono">Edit Profile Credentials</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Modify your secure citizen identification metadata.</p>
                </div>
                <button 
                  onClick={() => setIsProfileEditOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 text-left overflow-y-auto max-h-[calc(90vh-100px)]">
                {/* Photo Upload / Avatar Select Section */}
                <div className="flex flex-col items-center justify-center space-y-2 py-3 border-b border-slate-100 mb-2">
                  <div className="relative group cursor-pointer" onClick={() => profilePhotoInputRef.current?.click()}>
                    <img
                      src={tempAvatarUrl}
                      alt="Profile Avatar Preview"
                      className="h-20 w-20 rounded-full border-2 border-slate-300 object-cover group-hover:opacity-75 transition-opacity shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 rounded-full bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Camera className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => profilePhotoInputRef.current?.click()}
                    className="text-xs font-bold text-gov-blue hover:text-gov-blue-dark flex items-center gap-1 cursor-pointer"
                  >
                    <Camera className="h-3.5 w-3.5" /> Change Photo
                  </button>
                  <input
                    type="file"
                    ref={profilePhotoInputRef}
                    onChange={handleProfilePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                {/* Read-Only System Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 tracking-wide uppercase font-mono flex items-center gap-1.5">
                      Registered Email <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    </label>
                    <div className="w-full px-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-bold select-none flex items-center justify-between">
                      <span className="truncate max-w-[140px]" title={user?.email || 'soniya@smartward.in'}>
                        {user?.email || 'soniya@smartward.in'}
                      </span>
                      <span className="text-[8px] font-mono font-black uppercase tracking-wider bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded shrink-0">Locked</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 tracking-wide uppercase font-mono flex items-center gap-1.5">
                      Citizen ID <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    </label>
                    <div className="w-full px-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-bold select-none flex items-center justify-between font-mono">
                      <span>CIT-82910-MD</span>
                      <span className="text-[8px] font-mono font-black uppercase tracking-wider bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">Locked</span>
                    </div>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Full Name</label>
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Phone Number</label>
                    <input
                      type="text"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold font-mono"
                    />
                  </div>
                </div>

                {/* Ward & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Ward Mapping</label>
                    <select
                      value={tempWard}
                      onChange={(e) => setTempWard(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold"
                    >
                      <option value="Ward 42">Ward 42 (Madurai Core)</option>
                      <option value="Ward 43">Ward 43 (Melur East)</option>
                      <option value="Ward 12">Ward 12 (Chennai Central)</option>
                      <option value="Ward 84">Ward 84 (Bengaluru South)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">District Hub</label>
                    <input
                      type="text"
                      value={tempDistrict}
                      onChange={(e) => setTempDistrict(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Preferred Language & Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Muni Preferred Language</label>
                  <select
                    value={tempLanguage}
                    onChange={(e) => setTempLanguage(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold"
                  >
                    <option value="English (EN)">English (EN)</option>
                    <option value="Tamil (TA)">தமிழ் (Tamil)</option>
                    <option value="Hindi (HI)">हिन्दी (Hindi)</option>
                    <option value="Kannada (KN)">ಕನ್ನಡ (Kannada)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Home Address</label>
                  <textarea
                    rows={2}
                    value={tempAddress}
                    onChange={(e) => setTempAddress(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-semibold resize-none"
                  />
                </div>

                {/* Notification Preferences */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Notification Channels</label>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer select-none hover:bg-slate-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={tempNotifications.email}
                        onChange={(e) => setTempNotifications(prev => ({ ...prev, email: e.target.checked }))}
                        className="h-4 w-4 text-gov-blue rounded border-slate-300 focus:ring-gov-blue"
                      />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer select-none hover:bg-slate-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={tempNotifications.push}
                        onChange={(e) => setTempNotifications(prev => ({ ...prev, push: e.target.checked }))}
                        className="h-4 w-4 text-gov-blue rounded border-slate-300 focus:ring-gov-blue"
                      />
                      <span>Push</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer select-none hover:bg-slate-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={tempNotifications.sms}
                        onChange={(e) => setTempNotifications(prev => ({ ...prev, sms: e.target.checked }))}
                        className="h-4 w-4 text-gov-blue rounded border-slate-300 focus:ring-gov-blue"
                      />
                      <span>SMS</span>
                    </label>
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[10px] text-slate-500 leading-normal font-semibold">
                  ⚡ Updates propagate instantly to all active Ward Dispatch engines. Handled securely under encryption.
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                  <button
                    onClick={() => setIsProfileEditOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setProfileName(tempName);
                      setProfileWard(tempWard);
                      setProfileDistrict(tempDistrict);
                      setProfileLanguage(tempLanguage);
                      setProfileAvatarUrl(tempAvatarUrl);
                      setProfilePhone(tempPhone);
                      setProfileAddress(tempAddress);
                      setProfileNotifications({...tempNotifications});
                      updateUser({ name: tempName, avatarUrl: tempAvatarUrl });
                      setIsProfileEditOpen(false);
                      alert('Identification profile metadata saved successfully!');
                    }}
                    className="px-5 py-2 text-xs font-bold text-white bg-gov-blue hover:bg-gov-blue-dark rounded-lg transition-colors shadow-sm cursor-pointer"
                  >
                    Save & Sync Node
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

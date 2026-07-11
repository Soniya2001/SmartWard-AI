import React from 'react';
import { 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  User, 
  Bell, 
  Map, 
  Sparkles, 
  Info, 
  ArrowRight,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  FileCheck,
  Award,
  PhoneCall,
  Flame,
  Milestone
} from 'lucide-react';
import { motion } from 'motion/react';
import { ComplaintStatus, ComplaintPriority, ComplaintCategory } from '../../types';

// Let's declare our widget structures
export interface DemoComplaint {
  id: string;
  issue: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  date: string;
  ward: string;
  district: string;
  timeline: {
    title: string;
    description: string;
    time: string;
    done: boolean;
  }[];
}

// 1. ComplaintCard Component
interface ComplaintCardProps {
  complaint: DemoComplaint;
  isSelected: boolean;
  onSelect: (complaint: DemoComplaint) => void;
  onViewDetails: (complaint: DemoComplaint) => void;
}

export const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  isSelected,
  onSelect,
  onViewDetails
}) => {
  // Determine color matching for status chips
  const getStatusStyle = (status: ComplaintStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-blue-50 text-blue-700 border-blue-200/50';
      case 'In Progress':
        return 'bg-amber-50 text-amber-800 border-amber-200/50';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
      case 'Closed':
        return 'bg-slate-100 text-slate-700 border-slate-200/60';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getPriorityStyle = (priority: ComplaintPriority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'High':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  // Progress Bar Width
  const getProgressWidth = (status: ComplaintStatus) => {
    switch (status) {
      case 'Pending': return 'w-1/4';
      case 'In Progress': return 'w-2/3';
      case 'Resolved': return 'w-11/12';
      case 'Closed': return 'w-full';
      default: return 'w-1/12';
    }
  };

  const getCategoryEmoji = (cat: ComplaintCategory) => {
    switch (cat) {
      case 'Road': return '🛣️';
      case 'Garbage': return '🚮';
      case 'Water': return '🚰';
      case 'Streetlight': return '💡';
      case 'Drainage': return '🌀';
      default: return '📁';
    }
  };

  return (
    <div 
      onClick={() => onSelect(complaint)}
      className={`border p-5 rounded-2xl cursor-pointer transition-all flex flex-col justify-between text-left group hover:shadow ${
        isSelected 
          ? 'border-gov-blue bg-gov-blue/5 shadow-sm' 
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="space-y-3">
        {/* Card Header info */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">
              #{complaint.id}
            </span>
            <span className="text-xs text-slate-400 font-semibold">{complaint.date}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border font-mono ${getStatusStyle(complaint.status)}`}>
              {complaint.status}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border font-mono ${getPriorityStyle(complaint.priority)}`}>
              {complaint.priority}
            </span>
          </div>
        </div>

        {/* Complaint Issue and Description */}
        <div>
          <h4 className="font-bold text-slate-800 text-sm group-hover:text-gov-blue transition-colors flex items-center gap-1.5">
            <span className="text-base select-none">{getCategoryEmoji(complaint.category)}</span>
            {complaint.issue}
          </h4>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{complaint.ward}, {complaint.district}</span>
          </div>
        </div>

        {/* Progress Bar with steps */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">
            <span>Progress Status</span>
            <span>
              {complaint.status === 'Pending' && '15% - Logged'}
              {complaint.status === 'In Progress' && '60% - Assigned / Dispatched'}
              {complaint.status === 'Resolved' && '90% - Work Finished'}
              {complaint.status === 'Closed' && '100% - Sign-off verified'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full bg-gov-blue transition-all duration-500 rounded-full ${getProgressWidth(complaint.status)}`} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 mt-4 pt-3">
        <span className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wide">
          SLA compliance OK
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(complaint);
          }}
          className="text-xs font-bold text-gov-blue group-hover:underline inline-flex items-center gap-1"
        >
          View Action Log <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

// 2. ComplaintTimelineWidget Component
interface TimelineWidgetProps {
  selectedComplaint: DemoComplaint | null;
}

export const TimelineWidget: React.FC<TimelineWidgetProps> = ({ selectedComplaint }) => {
  if (!selectedComplaint) {
    return (
      <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-3 h-full min-h-[300px]">
        <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
          <Clock className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h5 className="font-bold text-slate-800 text-sm">No Complaint Selected</h5>
          <p className="text-xs text-slate-400 max-w-xs leading-normal font-medium">
            Select an active grievance from the list on the left to display its physical routing audit logs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full" id="timeline-widget-panel">
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Milestone className="h-4.5 w-4.5 text-gov-blue" />
          <div className="text-left">
            <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-700">Audit Desks Tracking</h4>
            <p className="text-[10px] text-slate-400 font-medium">Sovereign dispatch timeline logs for #{selectedComplaint.id}</p>
          </div>
        </div>

        {/* Selected issue brief */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 flex items-center gap-3 text-left">
          <span className="text-lg bg-white h-9 w-9 rounded-lg shadow-sm flex items-center justify-center shrink-0">
            {selectedComplaint.category === 'Road' && '🛣️'}
            {selectedComplaint.category === 'Garbage' && '🚮'}
            {selectedComplaint.category === 'Water' && '🚰'}
            {selectedComplaint.category === 'Streetlight' && '💡'}
            {selectedComplaint.category === 'Drainage' && '🌀'}
          </span>
          <div className="min-w-0">
            <h5 className="text-xs font-bold text-slate-800 truncate leading-snug">{selectedComplaint.issue}</h5>
            <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wide font-bold mt-0.5">
              Ward {selectedComplaint.ward}
            </p>
          </div>
        </div>

        {/* The Vertical Timeline */}
        <div className="relative pl-6 space-y-6 pt-2 text-left">
          {/* Vertical track line */}
          <div className="absolute left-[9px] top-4 bottom-4 w-0.5 bg-slate-100 border-l-2 border-slate-200" />

          {selectedComplaint.timeline.map((item, idx) => (
            <div key={idx} className="relative flex gap-4">
              {/* Dot marker */}
              <span className={`absolute left-[-22px] top-1 h-5 w-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center shrink-0 ${
                item.done 
                  ? 'bg-gov-blue text-white' 
                  : 'bg-slate-100 text-slate-400'
              }`}>
                {item.done ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                )}
              </span>

              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide block">
                  {item.time}
                </span>
                <h5 className={`text-xs font-bold leading-snug ${item.done ? 'text-slate-800' : 'text-slate-400'}`}>
                  {item.title}
                </h5>
                <p className={`text-[11px] leading-relaxed font-medium ${item.done ? 'text-slate-500' : 'text-slate-400/80'}`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl mt-6 text-left flex items-start gap-2 text-[10px] text-indigo-700 font-semibold leading-relaxed">
        <Sparkles className="h-4 w-4 shrink-0 mt-0.5 text-indigo-500" />
        <span>
          <strong>AI Routing Node Note:</strong> SmartWard auto-assigned this issue to municipal Desk Node 4B based on geolocated Ward data. No manual triage required.
        </span>
      </div>
    </div>
  );
};

// 3. NotificationCard Component
export interface DemoNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'assigned' | 'reply' | 'resolved' | 'reminder' | 'system';
}

interface NotificationCardProps {
  notifications: DemoNotification[];
  onDismiss: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notifications, onDismiss }) => {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'assigned':
        return { icon: FileText, bg: 'bg-blue-50 text-blue-600 border-blue-100' };
      case 'reply':
        return { icon: User, bg: 'bg-purple-50 text-purple-600 border-purple-100' };
      case 'resolved':
        return { icon: CheckCircle2, bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
      case 'reminder':
        return { icon: Clock, bg: 'bg-amber-50 text-amber-600 border-amber-100' };
      default:
        return { icon: Bell, bg: 'bg-slate-50 text-slate-600 border-slate-100' };
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left" id="notification-box">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Bell className="h-4.5 w-4.5 text-gov-blue" />
          <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-700">Official Dispatches</h4>
        </div>
        <span className="text-[10px] font-mono font-bold text-gov-blue bg-gov-blue-light px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {notifications.length} Active
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="py-8 text-center flex flex-col items-center justify-center space-y-2">
          <span className="text-3xl select-none">📭</span>
          <p className="text-xs text-slate-400 font-semibold">No dispatch logs found.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
          {notifications.map((notif) => {
            const styles = getTypeStyles(notif.type);
            const Icon = styles.icon;
            return (
              <div 
                key={notif.id}
                className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl relative overflow-hidden flex items-start gap-3 group hover:border-slate-300 transition-colors"
              >
                <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${styles.bg}`}>
                  <Icon className="h-4 w-4" />
                </div>

                <div className="space-y-0.5 min-w-0 flex-grow">
                  <div className="flex justify-between items-start gap-2">
                    <h5 className="text-xs font-bold text-slate-800 leading-tight truncate">{notif.title}</h5>
                    <span className="text-[9px] font-mono font-bold text-slate-400 shrink-0 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{notif.description}</p>
                </div>

                <button
                  onClick={() => onDismiss(notif.id)}
                  className="absolute right-2 bottom-2 text-[10px] font-bold font-mono text-slate-400 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Dismiss alert"
                >
                  Dismiss
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// 4. NearbyUpdates Component (with Mock SVG Map)
export interface NearbyIssue {
  id: string;
  title: string;
  category: string;
  distance: string;
  status: string;
}

interface NearbyUpdatesProps {
  updates: NearbyIssue[];
  onExploreMap: () => void;
}

export const NearbyUpdates: React.FC<NearbyUpdatesProps> = ({ updates, onExploreMap }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left grid grid-cols-1 md:grid-cols-12 gap-6" id="nearby-issues-section">
      
      {/* Left List of Issues */}
      <div className="md:col-span-7 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <MapPin className="h-4.5 w-4.5 text-gov-blue" />
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-700">Geographic Hotspots</h4>
            <p className="text-[10px] text-slate-400 font-medium">Citizen complaints active within 500m of your mapped home node.</p>
          </div>
        </div>

        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
          {updates.map((issue) => (
            <div key={issue.id} className="p-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-200/60 rounded-xl transition-colors flex items-center justify-between gap-3 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base select-none">
                  {issue.category === 'Road' && '🛣️'}
                  {issue.category === 'Water' && '🚰'}
                  {issue.category === 'Garbage' && '🚮'}
                  {issue.category === 'Streetlight' && '💡'}
                  {issue.category === 'Drainage' && '🌀'}
                </span>
                <div className="min-w-0">
                  <h5 className="font-bold text-slate-800 truncate">{issue.title}</h5>
                  <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                    {issue.distance} • SLA Active
                  </p>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border shrink-0 ${
                issue.status === 'In Progress' 
                  ? 'bg-amber-100 border-amber-200 text-amber-800' 
                  : 'bg-emerald-100 border-emerald-200 text-emerald-800'
              }`}>
                {issue.status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onExploreMap}
          className="w-full py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 mt-2"
        >
          View Full Interactive Map <Map className="h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>

      {/* Right Map Placeholder */}
      <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden min-h-[250px]">
        <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block z-10">
          Ward Geographic Layout
        </span>

        {/* Beautiful vector SVG map placeholder */}
        <div className="absolute inset-x-0 top-10 bottom-12 flex items-center justify-center opacity-80 pointer-events-none">
          <svg className="w-full h-full p-2" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background Grid */}
            <line x1="20" y1="0" x2="20" y2="100" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="60" y1="0" x2="60" y2="100" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="100" y1="0" x2="100" y2="100" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="0" y1="30" x2="120" y2="30" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="0" y1="70" x2="120" y2="70" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="2 2" />

            {/* Simulated Road Paths */}
            <path d="M10 20 Q 60 50 110 20" stroke="#94a3b8" strokeWidth="3" fill="none" />
            <path d="M30 10 Q 50 60 40 90" stroke="#94a3b8" strokeWidth="2.5" fill="none" />
            <path d="M80 5 Q 85 50 105 95" stroke="#94a3b8" strokeWidth="2" fill="none" />

            {/* Mapped Hotspots/Markers */}
            {/* User Location */}
            <circle cx="50" cy="45" r="5" fill="#2563eb" fillOpacity="0.2" />
            <circle cx="50" cy="45" r="2.5" fill="#2563eb" />

            {/* Hotspot 1: Pothole */}
            <circle cx="35" cy="27" r="4" fill="#ea580c" fillOpacity="0.2" className="animate-pulse" />
            <circle cx="35" cy="27" r="2" fill="#ea580c" />

            {/* Hotspot 2: Water leak */}
            <circle cx="82" cy="30" r="4" fill="#0284c7" fillOpacity="0.2" />
            <circle cx="82" cy="30" r="2" fill="#0284c7" />

            {/* Hotspot 3: Garbage overflow */}
            <circle cx="92" cy="65" r="4" fill="#16a34a" fillOpacity="0.2" />
            <circle cx="92" cy="65" r="2" fill="#16a34a" />
          </svg>
        </div>

        <div className="z-10 bg-white/95 backdrop-blur border border-slate-200/60 p-2 rounded-lg text-[9px] font-mono leading-tight shadow-sm text-slate-500">
          📍 Connected to <strong>Ward 42 Hub</strong>. Current distance SLA node metrics active.
        </div>
      </div>

    </div>
  );
};

// 5. AIAssistantCard Component
interface AIAssistantCardProps {
  onStartAIChoice: () => void;
}

export const AIAssistantCard: React.FC<AIAssistantCardProps> = ({ onStartAIChoice }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-700 rounded-2xl p-6 shadow-md text-left relative overflow-hidden h-full flex flex-col justify-between min-h-[220px]" id="report-civic-issue-promo">
      {/* Background glow graphics */}
      <div className="absolute right-0 top-0 w-48 h-48 bg-gov-blue/15 rounded-full blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/4" />
      <div className="absolute left-0 bottom-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -translate-x-1/4 translate-y-1/4" />

      <div className="space-y-2.5 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gov-blue/20 border border-gov-blue/40 text-[10px] font-bold text-blue-200 uppercase tracking-widest font-mono">
          <MapPin className="h-3 w-3 text-gov-blue" /> Report a New Civic Issue
        </span>
        <h4 className="text-lg font-black font-display tracking-tight leading-snug">
          📍 Report a New Civic Issue
        </h4>
        <p className="text-xs text-slate-300 font-semibold leading-relaxed max-w-sm">
          Report road damage, garbage, drainage, streetlight, water leakage and other civic problems in your locality.
        </p>
      </div>

      <div className="pt-4 relative z-10">
        <button
          onClick={onStartAIChoice}
          className="px-5 py-2.5 bg-gov-blue hover:bg-gov-blue-dark text-white font-black text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md"
        >
          Report Issue <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

// 6. Announcements Component
export interface DemoAnnouncement {
  id: string;
  title: string;
  desc: string;
  date: string;
  badge: string;
  badgeColor: string;
}

interface AnnouncementsProps {
  items: DemoAnnouncement[];
}

export const Announcements: React.FC<AnnouncementsProps> = ({ items }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left" id="announcements-section">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Milestone className="h-4.5 w-4.5 text-gov-blue" />
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-700">Official Communiqués</h4>
          <p className="text-[10px] text-slate-400 font-medium">Critical service notices and structural dispatches from the ward council.</p>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl space-y-1.5 hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between flex-wrap gap-1.5">
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${item.badgeColor}`}>
                {item.badge}
              </span>
              <span className="text-[10px] text-slate-400 font-bold font-mono">{item.date}</span>
            </div>
            <div className="space-y-0.5">
              <h5 className="text-xs font-bold text-slate-800 leading-tight">{item.title}</h5>
              <p className="text-[11px] text-slate-500 font-semibold leading-normal">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. CitizenRewards Component
export interface DemoRewardBadge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  icon: string;
}

interface CitizenRewardsProps {
  badges: DemoRewardBadge[];
  resolvedCount: number;
  participationLevel: string;
  leaderboardRank: number;
}

export const CitizenRewards: React.FC<CitizenRewardsProps> = ({
  badges,
  resolvedCount,
  participationLevel,
  leaderboardRank
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-4" id="citizen-rewards-gamification">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Award className="h-4.5 w-4.5 text-gov-blue" />
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-700">Community Contributor</h4>
          <p className="text-[10px] text-slate-400 font-medium">Earn loyalty badges and track civic participation index logs.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200/60 rounded-xl text-center">
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Grievances Cleared</span>
          <span className="text-sm font-black text-slate-800 font-mono mt-0.5 block">{resolvedCount} Issues</span>
        </div>
        <div className="border-x border-slate-200">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Platform Level</span>
          <span className="text-xs font-bold text-slate-800 mt-1 block uppercase tracking-wide">{participationLevel}</span>
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide block">Leaderboard Rank</span>
          <span className="text-sm font-black text-gov-blue font-mono mt-0.5 block">#{leaderboardRank}</span>
        </div>
      </div>

      {/* Badges list */}
      <div className="space-y-2">
        <h5 className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-wider block">My Civic Ribbons</h5>
        <div className="grid grid-cols-2 gap-2">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-2.5 border rounded-xl flex items-center gap-2.5 text-xs transition-colors ${
                badge.earned 
                  ? 'border-indigo-100 bg-indigo-50/20 text-indigo-900' 
                  : 'border-slate-100 bg-slate-50/50 text-slate-400/80 grayscale'
              }`}
            >
              <span className="text-lg shrink-0">{badge.icon}</span>
              <div className="min-w-0">
                <h6 className="font-bold truncate leading-tight">{badge.name}</h6>
                <p className="text-[9px] text-slate-400 truncate leading-snug">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 8. HelpSupport Component
export const HelpSupport: React.FC = () => {
  const links = [
    { name: 'Frequently Asked Questions', desc: 'SLA dispatches, escalation protocols.', icon: HelpCircle },
    { name: 'Emergency Command Center', desc: 'Direct desk hotlines & helpline lists.', icon: PhoneCall },
    { name: 'SmartWard Desk Help Desk', desc: 'Secure technical support portal.', icon: Info },
    { name: 'Chat Support (Sovereign Node)', desc: 'Talk to Ward AI bot logs.', icon: Sparkles }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-4" id="help-and-escalation">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <PhoneCall className="h-4.5 w-4.5 text-gov-blue" />
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-700">Escalation & Help Desk</h4>
          <p className="text-[10px] text-slate-400 font-medium">Verify dispute frameworks or escalate persistent gridlock dispatches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link, idx) => {
          const Icon = link.icon;
          return (
            <button
              key={idx}
              onClick={() => alert(`Redirecting to: ${link.name} (Demonstration node, no functional links setup)`)}
              className="p-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-200/50 hover:border-slate-300 rounded-xl transition-all flex items-start gap-3 text-left shrink-0 group cursor-pointer"
            >
              <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-gov-blue transition-colors shadow-sm">
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h5 className="text-xs font-bold text-slate-800 leading-tight group-hover:text-gov-blue transition-colors truncate">{link.name}</h5>
                <p className="text-[10px] text-slate-400 font-semibold leading-snug">{link.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Plus, 
  MapPin, 
  Globe, 
  Sparkles, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar, 
  User, 
  ArrowRight, 
  Activity, 
  ListTodo, 
  Mail, 
  Phone,
  Bookmark,
  Bell,
  BarChart3,
  Building2,
  ThumbsUp,
  Star,
  Camera
} from 'lucide-react';
import { motion } from 'motion/react';

// CitizenWelcome Component
interface CitizenWelcomeProps {
  name: string;
  avatarUrl?: string;
  ward: string;
  district: string;
  language: string;
  email: string;
}

export const CitizenWelcome: React.FC<CitizenWelcomeProps> = ({
  name,
  avatarUrl = 'https://api.dicebear.com/7.x/initials/svg?seed=Soniya&backgroundColor=2563eb&textColor=white',
  ward,
  district,
  language
}) => {
  return (
    <div className="bg-gradient-to-r from-gov-blue/10 via-white to-gov-blue/5 border border-gov-blue/15 p-6 rounded-2xl relative overflow-hidden" id="citizen-welcome-widget">
      {/* Visual background accents */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-gov-blue/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute left-1/3 bottom-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none translate-y-1/3" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img 
              src={avatarUrl} 
              alt={name} 
              className="h-16 w-16 rounded-full border-2 border-white ring-4 ring-gov-blue/20 object-cover shadow-sm"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 h-4.5 w-4.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center" title="Online profile active">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black font-display text-slate-900 tracking-tight">
                Good Morning, {name} 👋
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                Verified Citizen
              </span>
            </div>
            <p className="text-sm font-bold text-slate-800">
              Welcome back to SmartWard AI.
            </p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-lg">
              Together we're building cleaner, safer and smarter communities. Your civic contributions keep our municipality accountable and beautiful.
            </p>
          </div>
        </div>

        {/* Profile Stats Mini Panel */}
        <div className="grid grid-cols-3 gap-3 md:w-80 p-3 bg-white/80 border border-slate-200/80 rounded-xl shadow-sm">
          <div className="space-y-0.5 text-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Territory</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800">
              <MapPin className="h-3.5 w-3.5 text-gov-blue shrink-0" /> {ward}
            </span>
          </div>
          <div className="space-y-0.5 text-center border-x border-slate-200">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">District</span>
            <span className="text-xs font-bold text-slate-800 block truncate" title={district}>
              {district}
            </span>
          </div>
          <div className="space-y-0.5 text-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Language</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800">
              <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" /> {language}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// QuickActions Component
interface QuickActionsProps {
  onReportIssue: () => void;
  onMyComplaints: () => void;
  onNotifications: () => void;
  onAnnouncements: () => void;
  onPublicDashboard: () => void;
  onNearbyIssues: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onReportIssue,
  onMyComplaints,
  onNotifications,
  onAnnouncements,
  onPublicDashboard,
  onNearbyIssues
}) => {
  const actions = [
    {
      title: '📸 Report New Issue',
      desc: 'Submit photos of trash, leaks, or pothole damages.',
      color: 'from-blue-500 to-indigo-600 bg-blue-50/50 hover:bg-blue-50 border-blue-200/60 hover:border-blue-300 text-blue-700',
      action: onReportIssue,
      badge: 'Fast Track'
    },
    {
      title: '📂 My Complaints',
      desc: 'Track progress logs and resolution proof-of-work.',
      color: 'from-emerald-500 to-teal-600 bg-emerald-50/40 hover:bg-emerald-50 border-emerald-200/60 hover:border-emerald-300 text-emerald-700',
      action: onMyComplaints,
      badge: 'Live Status'
    },
    {
      title: '🔔 Notifications',
      desc: 'View status dispatches and official messages.',
      color: 'from-amber-500 to-orange-600 bg-amber-50/40 hover:bg-amber-50 border-amber-200/60 hover:border-amber-300 text-amber-700',
      action: onNotifications,
      badge: '3 New'
    },
    {
      title: '🏛 Authorities Directory',
      desc: 'Connect with ward engineers and local desk nodes.',
      color: 'from-slate-700 to-slate-900 bg-slate-50 hover:bg-slate-100/60 border-slate-200 hover:border-slate-300 text-slate-700',
      action: onAnnouncements,
      badge: 'Local Nodes'
    },
    {
      title: '📊 Public Dashboard',
      desc: 'Explore real-time municipal SLAs and ward scores.',
      color: 'from-purple-500 to-pink-600 bg-purple-50/40 hover:bg-purple-50 border-purple-200/60 hover:border-purple-300 text-purple-700',
      action: onPublicDashboard,
      badge: 'Insights'
    },
    {
      title: '📍 Nearby Issues',
      desc: 'View geolocated citizen alerts reported nearby.',
      color: 'from-cyan-500 to-sky-600 bg-cyan-50/40 hover:bg-cyan-50 border-cyan-200/60 hover:border-cyan-300 text-cyan-700',
      action: onNearbyIssues,
      badge: 'Ward Map'
    }
  ];

  return (
    <div className="space-y-3" id="quick-actions-section">
      <div className="flex items-center gap-2">
        <Activity className="h-4.5 w-4.5 text-gov-blue" />
        <h3 className="text-xs font-black uppercase tracking-wider font-mono text-slate-500">Quick Citizen Actions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((act, idx) => (
          <motion.button
            key={idx}
            whileHover={{ y: -2 }}
            onClick={act.action}
            className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between h-36 relative overflow-hidden group ${act.color} shadow-sm`}
          >
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles className="h-28 w-28" />
            </div>

            <div className="flex items-center justify-between w-full">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white text-[9px] font-bold shadow-sm uppercase tracking-wider border font-mono">
                {act.badge}
              </span>
              <span className="text-slate-400 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>

            <div className="space-y-1 relative z-10">
              <h4 className="text-sm font-black font-display tracking-tight leading-snug">
                {act.title}
              </h4>
              <p className="text-[11px] leading-snug font-medium opacity-85">
                {act.desc}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// ComplaintSummary Component (KPI Cards)
interface ComplaintSummaryProps {
  total: number;
  resolved: number;
  pending: number;
  inProgress: number;
  avgTime: string;
  avgRating: number;
}

export const ComplaintSummary: React.FC<ComplaintSummaryProps> = ({
  total,
  resolved,
  pending,
  inProgress,
  avgTime,
  avgRating
}) => {
  const kpis = [
    {
      title: 'My Complaints',
      value: total,
      icon: FileText,
      color: 'border-slate-200 text-slate-800 bg-white hover:border-slate-300',
      sub: 'Total issues logged'
    },
    {
      title: 'Resolved',
      value: resolved,
      icon: CheckCircle,
      color: 'border-emerald-200 text-emerald-800 bg-emerald-50/20 hover:border-emerald-300',
      sub: 'Proof of work verified'
    },
    {
      title: 'In Progress',
      value: inProgress,
      icon: Clock,
      color: 'border-amber-200 text-amber-800 bg-amber-50/20 hover:border-amber-300',
      sub: 'Active field dispatches'
    },
    {
      title: 'Pending',
      value: pending,
      icon: AlertCircle,
      color: 'border-blue-200 text-blue-800 bg-blue-50/20 hover:border-blue-300',
      sub: 'Awaiting triage allocation'
    },
    {
      title: 'Avg. SLA Resolution',
      value: avgTime,
      icon: Bookmark,
      color: 'border-purple-200 text-purple-800 bg-purple-50/20 hover:border-purple-300',
      sub: 'Platform average: 36 hrs'
    },
    {
      title: 'Citizen Rating Given',
      value: `${avgRating} / 5.0`,
      icon: Star,
      color: 'border-cyan-200 text-cyan-800 bg-cyan-50/20 hover:border-cyan-300',
      sub: 'Based on feedback cards'
    }
  ];

  return (
    <div className="space-y-3" id="complaint-summary-kpis">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4.5 w-4.5 text-gov-blue" />
        <h3 className="text-xs font-black uppercase tracking-wider font-mono text-slate-500">Complaint Performance Metres</h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div 
              key={idx} 
              className={`p-4 rounded-xl border transition-all shadow-sm flex flex-col justify-between text-left relative overflow-hidden group ${kpi.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 tracking-wide block truncate w-32">
                  {kpi.title}
                </span>
                <Icon className="h-4.5 w-4.5 opacity-80 shrink-0" />
              </div>

              <div className="my-2.5">
                <span className="text-xl md:text-2xl font-black font-display tracking-tight block">
                  {kpi.value}
                </span>
              </div>

              <span className="text-[9px] text-slate-400 font-semibold block leading-tight">
                {kpi.sub}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ProfileCard Component
interface ProfileCardProps {
  name: string;
  email: string;
  ward: string;
  district: string;
  language: string;
  avatarUrl: string;
  phone?: string;
  address?: string;
  onEdit: () => void;
  onPhotoUpload?: (base64: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  ward,
  district,
  language,
  avatarUrl,
  phone,
  address,
  onEdit,
  onPhotoUpload
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onPhotoUpload) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onPhotoUpload(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4 text-left" id="citizen-sidebar-profile">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <User className="h-4 w-4 text-gov-blue" />
        <h4 className="text-xs font-black uppercase tracking-wider font-mono text-slate-700">Citizen Profile Node</h4>
      </div>

      <div className="flex flex-col items-center text-center space-y-2 py-2">
        <div 
          className="relative group cursor-pointer" 
          onClick={() => fileInputRef.current?.click()}
          title="Click to upload profile photo"
        >
          <img 
            src={avatarUrl} 
            alt={name} 
            className="h-16 w-16 rounded-full border border-slate-200 shadow-sm object-cover group-hover:opacity-75 transition-opacity"
            referrerPolicy="no-referrer"
          />
          {/* Camera Upload Overlay */}
          <div className="absolute inset-0 rounded-full bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gov-blue text-white flex items-center justify-center border border-white text-[10px] font-bold">
            ✓
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div>
          <h5 className="font-bold text-slate-900 text-sm leading-tight">{name}</h5>
          <p className="text-[11px] text-slate-400 font-mono font-bold">{email}</p>
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 text-[10px] font-bold text-gov-blue hover:underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
          >
            <Camera className="h-3 w-3" /> Upload Photo
          </button>
        </div>
      </div>

      <div className="space-y-2.5 pt-2 text-xs">
        <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
          <span className="text-slate-400 font-semibold">Territory Node</span>
          <span className="font-bold text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded text-[10px]">
            {ward}
          </span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
          <span className="text-slate-400 font-semibold">District Hub</span>
          <span className="font-bold text-slate-800">{district}</span>
        </div>
        <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
          <span className="text-slate-400 font-semibold">Muni Language</span>
          <span className="font-bold text-slate-800">{language}</span>
        </div>
        {phone && (
          <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
            <span className="text-slate-400 font-semibold">Phone Number</span>
            <span className="font-bold text-slate-800 font-mono">{phone}</span>
          </div>
        )}
        {address && (
          <div className="flex justify-between items-start py-1.5 border-b border-slate-50 gap-2">
            <span className="text-slate-400 font-semibold shrink-0">Address</span>
            <span className="font-bold text-slate-800 text-right line-clamp-2" title={address}>{address}</span>
          </div>
        )}
        <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
          <span className="text-slate-400 font-semibold">KYC Verification</span>
          <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
            <CheckCircle className="h-3.5 w-3.5" /> SECURE MATCH
          </span>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="w-full mt-2 py-2 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
      >
        Edit Profile Credentials
      </button>
    </div>
  );
};

// FloatingReportButton Component
interface FloatingReportButtonProps {
  onClick: () => void;
}

export const FloatingReportButton: React.FC<FloatingReportButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 group" id="floating-report-button-wrapper">
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-wide">
        📸 Report New Issue
      </span>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="h-14 w-14 rounded-full bg-gov-blue hover:bg-gov-blue-dark text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer relative"
        title="Report New Issue"
      >
        <Plus className="h-7 w-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gov-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-gov-blue-dark border-2 border-white"></span>
        </span>
      </motion.button>
    </div>
  );
};

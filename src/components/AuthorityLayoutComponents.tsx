import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Users, 
  Sparkles, 
  FileSpreadsheet, 
  Bell, 
  Settings,
  Building2, 
  AlertCircle, 
  BarChart3, 
  BookmarkCheck, 
  DollarSign, 
  Globe, 
  Truck, 
  Landmark, 
  Shield,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  SlidersHorizontal,
  LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthority } from '../contexts/AuthorityContext';

// Structure of a government role option
export interface GovernmentRole {
  id: string;
  roleName: string;
  name: string;
  email: string;
  department: string;
  jurisdiction: string;
  badge: string;
  avatarSeed: string;
  avatarColor: string;
}

// Sidebar config helper
export function getSidebarMenuItems(roleId: string, criticalBadgeCount: number) {
  switch (roleId) {
    case 'officer':
      return [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'assigned_complaints', label: 'Assigned Complaints', icon: FileText, badge: criticalBadgeCount },
        { id: 'field_staff', label: 'Field Staff', icon: Users },
        { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'councillor':
      return [
        { id: 'dashboard', label: 'Ward Dashboard', icon: LayoutDashboard },
        { id: 'ward_complaints', label: 'Ward Complaints', icon: FileText, badge: criticalBadgeCount },
        { id: 'ward_analytics', label: 'Ward Analytics', icon: BarChart3 },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'mla':
      return [
        { id: 'dashboard', label: 'Constituency Dashboard', icon: LayoutDashboard },
        { id: 'constituency_analytics', label: 'Constituency Analytics', icon: BarChart3 },
        { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'commissioner':
      return [
        { id: 'dashboard', label: 'Corporation Dashboard', icon: LayoutDashboard },
        { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'collector':
      return [
        { id: 'dashboard', label: 'District Dashboard', icon: LayoutDashboard },
        { id: 'corporation_comparison', label: 'Corporation Comparison', icon: Layers },
        { id: 'district_analytics', label: 'District Analytics', icon: BarChart3 },
        { id: 'critical_issues', label: 'Critical Issues', icon: AlertCircle, badge: criticalBadgeCount },
        { id: 'performance_reports', label: 'Performance Reports', icon: FileSpreadsheet },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'minister':
      return [
        { id: 'dashboard', label: 'State Dashboard', icon: LayoutDashboard },
        { id: 'state_performance', label: 'State Performance', icon: BarChart3 },
        { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    case 'cm':
    default:
      return [
        { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
        { id: 'district_rankings', label: 'District Rankings', icon: BarChart3 },
        { id: 'critical_alerts', label: 'Critical Alerts', icon: AlertCircle, badge: criticalBadgeCount },
        { id: 'ai_strategic_insights', label: 'AI Strategic Insights', icon: Sparkles },
        { id: 'performance_reports', label: 'Performance Reports', icon: FileSpreadsheet },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 4 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
  }
}

// Header detail helper
export function getHeaderDetails(role: GovernmentRole) {
  switch (role.id) {
    case 'officer':
      return {
        title: "Department Officer Dashboard",
        breadcrumb: "Authority > Department Officer Dashboard",
        subtitle: "Water Supply Department • Madurai Corporation"
      };
    case 'councillor':
      return {
        title: "Ward Dashboard",
        breadcrumb: "Authority > Ward Dashboard",
        subtitle: "Ward 42 • Madurai Corporation"
      };
    case 'mla':
      return {
        title: "Constituency Representative Dashboard",
        breadcrumb: "Authority > Constituency Dashboard",
        subtitle: "Madurai North Constituency"
      };
    case 'commissioner':
      return {
        title: "Corporation Head Dashboard",
        breadcrumb: "Authority > Corporation Dashboard",
        subtitle: "Madurai Municipal Corporation"
      };
    case 'collector':
      return {
        title: "District Collector Dashboard",
        breadcrumb: "Authority > Collector Dashboard",
        subtitle: "Madurai District"
      };
    case 'minister':
      return {
        title: "State Governance Dashboard",
        breadcrumb: "Authority > State Dashboard",
        subtitle: "Urban Development & Municipal Administration"
      };
    case 'cm':
    default:
      return {
        title: "Executive Governance Dashboard",
        breadcrumb: "Authority > Executive Dashboard",
        subtitle: "Tamil Nadu"
      };
  }
}

// Dynamic KPI helper
export function getRoleKPICardsData(roleId: string, kpis: any) {
  const commonSLA = kpis.avgSla || "2.4 Days";
  const commonSat = kpis.satisfaction || "4.6/5.0";

  switch (roleId) {
    case 'officer':
      return [
        { label: "Assigned", value: kpis.today, desc: "Assigned today", trend: "+18%", trendType: "danger" as const },
        { label: "In Progress", value: kpis.pending, desc: "Active operations", trend: "Normal" as const, trendType: "neutral" as const },
        { label: "Resolved", value: kpis.resolved, desc: "Action verified", icon: CheckCircle2, iconColor: "text-success" },
        { label: "Critical", value: kpis.critical, desc: "SLA escalation", icon: AlertCircle, iconColor: "text-danger", animatePulse: true }
      ];
    case 'councillor':
      return [
        { label: "Ward Complaints", value: kpis.today, desc: "Reported this week", trend: "+12%" as const, trendType: "warning" as const },
        { label: "In Routing", value: kpis.pending, desc: "Assigned to PWD", trend: "Stabilized" as const, trendType: "success" as const },
        { label: "Resolved Tasks", value: kpis.resolved, desc: "Resident closed", icon: CheckCircle2, iconColor: "text-success" },
        { label: "Escalated Issues", value: kpis.critical, desc: "SLA alert", icon: AlertCircle, iconColor: "text-danger" }
      ];
    case 'mla':
      return [
        { label: "Constituency Issues", value: Math.round(kpis.today * 1.5), desc: "North Constituency", trend: "Active" as const, trendType: "success" as const },
        { label: "CDF Fund Utilized", value: "₹1.85 Cr", desc: "Out of ₹3.40 Cr available", trend: "54% Spent" as const, trendType: "neutral" as const },
        { label: "Completed Works", value: Math.round(kpis.resolved * 1.5), desc: "Civic inspections", icon: CheckCircle2, iconColor: "text-success" },
        { label: "Urgent Petitions", value: kpis.critical, desc: "High-priority status", icon: AlertCircle, iconColor: "text-warning" }
      ];
    case 'commissioner':
      return [
        { label: "Corporation Inflow", value: Math.round(kpis.today * 2.1), desc: "City-wide today", trend: "+8%" as const, trendType: "warning" as const },
        { label: "SWM Fleet Dispatch", value: "14/14 Trucks", desc: "GPS verified active", trend: "100% active" as const, trendType: "success" as const },
        { label: "SLA Compliance", value: "92.5%", desc: "Target 95.0% benchmark", icon: CheckCircle2, iconColor: "text-gov-blue" },
        { label: "Critical Heat Spots", value: kpis.critical * 2, desc: "Urgent deployment", icon: AlertCircle, iconColor: "text-danger" }
      ];
    case 'collector':
      return [
        { label: "Total District Complaints", value: Math.round(kpis.today * 3.4), desc: "District aggregate", trend: "High load" as const, trendType: "warning" as const },
        { label: "Resolution Rate", value: "94.8%", desc: "Audit compliant", trend: "Sovereign Target Met" as const, trendType: "success" as const },
        { label: "Critical Districts", value: "3 Wards", desc: "SLA intervention needed", icon: AlertCircle, iconColor: "text-warning" },
        { label: "Average Resolution Time", value: commonSLA, desc: "District benchmark", icon: Clock, iconColor: "text-gov-blue" }
      ];
    case 'minister':
      return [
        { label: "State Complaints", value: Math.round(kpis.today * 8.2), desc: "State aggregate inflow", trend: "+5% Weekly" as const, trendType: "warning" as const },
        { label: "District Rankings", value: "Top: Madurai", desc: "Highest SLA compliance", trend: "Madurai #1" as const, trendType: "success" as const },
        { label: "Citizen Satisfaction", value: commonSat, desc: "SMS verified feedback", icon: BookmarkCheck, iconColor: "text-amber-500" },
        { label: "AI Governance Score", value: "91.2%", desc: "Predictive policy rate", icon: Sparkles, iconColor: "text-ai-purple" }
      ];
    case 'cm':
    default:
      return [
        { label: "State Complaints", value: Math.round(kpis.today * 12.5), desc: "Consolidated state inflow", trend: "Stably Managed" as const, trendType: "success" as const },
        { label: "District Rankings", value: "Madurai #1, Chennai #2", desc: "SLA compliance leaderboard", trend: "View Ranks" as const, trendType: "neutral" as const },
        { label: "Citizen Satisfaction", value: commonSat, desc: "Direct citizen polls rating", icon: BookmarkCheck, iconColor: "text-amber-500" },
        { label: "AI Governance Score", value: "98.2%", desc: "Apex command audit index", icon: Sparkles, iconColor: "text-ai-purple", animatePulse: true }
      ];
  }
}

// Quick actions helper
export function getRoleQuickActions(roleId: string) {
  switch (roleId) {
    case 'officer':
      return [
        { label: "Update Complaint", desc: "Submit progress logs & status", icon: FileText, color: "text-gov-blue", bg: "bg-gov-blue-light/30" },
        { label: "Assign Staff", desc: "Dispatch field squad supervisors", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Upload Resolution", desc: "Verify PWD photos with AI Sandbox", icon: Sparkles, color: "text-ai-purple", bg: "bg-ai-purple-light/40" }
      ];
    case 'councillor':
      return [
        { label: "Monitor Ward", desc: "Review local streets GIS mapping", icon: Globe, color: "text-gov-blue", bg: "bg-gov-blue-light/30" },
        { label: "Escalate Complaint", desc: "Trigger SLA emergency protocol", icon: AlertCircle, color: "text-danger", bg: "bg-danger-light" },
        { label: "View Departments", desc: "Check engineer division schedules", icon: Building2, color: "text-teal-600", bg: "bg-teal-50" }
      ];
    case 'mla':
      return [
        { label: "Allocate CDF Funds", desc: "Grant infrastructure budget credits", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Compare Wards", desc: "Review ward-by-ward SLA rankings", icon: Layers, color: "text-gov-blue", bg: "bg-gov-blue-light/30" },
        { label: "Resident Meet", desc: "Schedule town-hall public agenda", icon: Users, color: "text-teal-600", bg: "bg-teal-50" }
      ];
    case 'commissioner':
      return [
        { label: "Allocate Resources", desc: "Re-route waste treatment machinery", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "GPS Truck Dispatch", desc: "Review active solid waste fleet", icon: Truck, color: "text-success", bg: "bg-success-light" },
        { label: "Audit Departments", desc: "Review performance metrics on desk", icon: Layers, color: "text-gov-blue", bg: "bg-gov-blue-light/30" }
      ];
    case 'collector':
      return [
        { label: "Compare Municipalities", desc: "Analyse rural vs urban SLA", icon: Layers, color: "text-gov-blue", bg: "bg-gov-blue-light/30" },
        { label: "Review Critical Issues", desc: "Direct command of active alerts", icon: AlertCircle, color: "text-danger", bg: "bg-danger-light" },
        { label: "Generate District Report", desc: "Print secure revenue dashboard PDF", icon: FileSpreadsheet, color: "text-emerald-600", bg: "bg-emerald-50" }
      ];
    case 'minister':
      return [
        { label: "Issue Policy Directive", desc: "Enforce state-wide sanitation SOP", icon: Shield, color: "text-ai-purple", bg: "bg-ai-purple-light/40" },
        { label: "Review State Budgets", desc: "Authorize regional project reserves", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Audit Collectorates", desc: "Review district collector logs", icon: Landmark, color: "text-gov-blue", bg: "bg-gov-blue-light/30" }
      ];
    case 'cm':
    default:
      return [
        { label: "View State Analytics", desc: "State-wide GIS heatmaps & metrics", icon: BarChart3, color: "text-gov-blue", bg: "bg-gov-blue-light/30" },
        { label: "AI Recommendations", desc: "Apex command governance insights", icon: Sparkles, color: "text-ai-purple", bg: "bg-ai-purple-light/40" },
        { label: "Export Executive Report", desc: "Sign state-level compliance briefs", icon: FileSpreadsheet, color: "text-emerald-600", bg: "bg-emerald-50" }
      ];
  }
}

// 1. REUSABLE HEADER COMPONENT
interface DynamicHeaderProps {
  currentRole: GovernmentRole;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v: boolean) => void;
  roleMenuOpen: boolean;
  setRoleMenuOpen: (v: boolean) => void;
  notificationMenuOpen: boolean;
  setNotificationMenuOpen: (v: boolean) => void;
  profileMenuOpen: boolean;
  setProfileMenuOpen: (v: boolean) => void;
  globalSearch: string;
  setGlobalSearch: (s: string) => void;
  rolesList: GovernmentRole[];
  handleRoleSwitch: (r: GovernmentRole) => void;
  notifications: any[];
  handleLogout: () => void;
}

export const DynamicHeader: React.FC<DynamicHeaderProps> = ({
  currentRole,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  roleMenuOpen,
  setRoleMenuOpen,
  notificationMenuOpen,
  setNotificationMenuOpen,
  profileMenuOpen,
  setProfileMenuOpen,
  globalSearch,
  setGlobalSearch,
  rolesList,
  handleRoleSwitch,
  notifications,
  handleLogout
}) => {
  const { selectedDepartment, setSelectedDepartment } = useAuthority();

  const departments = [
    'Roads Department',
    'Water Supply',
    'Sanitation',
    'Electrical',
    'Drainage & Storm Water',
    'Solid Waste Management',
    'Street Lighting',
    'Parks & Public Spaces'
  ];

  return (
    <header className="sticky top-0 z-40 h-14 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 md3-shadow-sm">
      
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setSidebarCollapsed(!sidebarCollapsed);
            setMobileSidebarOpen(!mobileSidebarOpen);
          }}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none"
          title="Toggle Menu"
          id="sidebar-toggle"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gov-blue text-white shadow-sm font-bold">
            <Landmark className="h-4.5 w-4.5" />
          </div>
          <span className="font-display text-sm font-bold tracking-tight text-slate-900 hidden sm:inline-flex items-center gap-1.5">
            SmartWard <span className="text-ai-purple font-mono text-[10px] px-1.5 py-0.5 bg-ai-purple-light rounded font-bold">CONSOLE</span>
          </span>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="hidden md:flex items-center max-w-md w-full px-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search complaints, wards, or municipal codes..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:bg-white focus:ring-gov-blue transition-all font-semibold"
            id="global-search"
          />
        </div>
      </div>

      {/* Right: Quick actions, notifications, and dynamic role switching demo selector */}
      <div className="flex items-center gap-3">
        
        {/* DEPARTMENT SWITCHER (DEMO MODE) */}
        {currentRole.id === 'officer' && (
          <div className="flex items-center gap-2 border-r border-slate-200 pr-3 mr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider hidden md:inline">Current Department:</span>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-slate-50 border border-slate-200 hover:border-gov-blue text-xs font-bold text-slate-700 py-1 px-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue cursor-pointer transition-all"
                id="department-demo-switcher"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Demo Mode Badge with Tooltip */}
            <div className="relative group inline-flex">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/20 cursor-help flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                Demo Mode
              </span>
              <div className="absolute right-0 top-full mt-2 w-56 p-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-md font-semibold font-sans leading-normal">
                Department switching is enabled for demonstration purposes. In production, the department is determined automatically from the logged-in officer.
              </div>
            </div>
          </div>
        )}

        {/* CRITICAL ROLE SWITCHER */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100/80 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            id="authority-role-switcher-btn"
          >
            <div className={`h-2 w-2 rounded-full ${currentRole.avatarColor} animate-pulse`} />
            <span className="hidden lg:inline">{currentRole.roleName}:</span>
            <span className="text-gov-blue max-w-[120px] truncate">{currentRole.name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          <AnimatePresence>
            {roleMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRoleMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-1.5 w-72 bg-white rounded-xl border border-slate-200 md3-shadow-lg z-50 py-1.5 text-left"
                >
                  <div className="px-3.5 py-2 border-b border-slate-100">
                    <span className="text-[10px] font-black font-mono text-slate-400 uppercase tracking-widest block">Role-Aware Sandbox</span>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Switch profiles to preview role-specific administrative views.</p>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto py-1">
                    {rolesList.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          handleRoleSwitch(r);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 hover:bg-slate-50 flex items-start gap-2.5 text-left transition-colors ${
                          currentRole.id === r.id ? 'bg-gov-blue-light/50' : ''
                        }`}
                      >
                        <div className={`h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[9px] font-bold text-white font-mono ${r.avatarColor}`}>
                          {r.avatarSeed}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 leading-tight">{r.roleName}</span>
                            {currentRole.id === r.id && <span className="h-1.5 w-1.5 rounded-full bg-gov-blue" />}
                          </div>
                          <span className="text-[10px] text-slate-500 block leading-tight font-medium">{r.name}</span>
                          <span className="text-[9px] text-slate-400 font-mono block leading-none pt-0.5">{r.department}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Language Selector */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
          <Globe className="h-4 w-4 text-slate-400" />
          <span>EN</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors focus:outline-none relative"
            id="top-notification-bell"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger animate-pulse" />
          </button>

          <AnimatePresence>
            {notificationMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotificationMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-1.5 w-80 bg-white rounded-xl border border-slate-200 md3-shadow-lg z-50 py-1.5 text-left"
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">National Alert Feeds</span>
                    <span className="text-[10px] font-bold text-gov-blue px-1.5 py-0.5 bg-gov-blue-light rounded">4 New</span>
                  </div>
                  
                  <div className="max-h-[280px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="p-3 hover:bg-slate-50 border-b border-slate-100 last:border-none transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            notif.type === 'critical' ? 'text-danger' : notif.type === 'warning' ? 'text-warning' : 'text-gov-blue'
                          }`}>
                            {notif.type} alert
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono">{notif.time}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-800 mt-1">{notif.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{notif.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
            id="top-profile-btn"
          >
            <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold text-white font-mono ${currentRole.avatarColor}`}>
              {currentRole.avatarSeed}
            </div>
          </button>

          <AnimatePresence>
            {profileMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl border border-slate-200 md3-shadow-lg z-50 py-1.5 text-left"
                >
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white font-mono ${currentRole.avatarColor}`}>
                      {currentRole.avatarSeed}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">{currentRole.name}</h4>
                      <span className="text-[10px] text-gov-blue font-bold tracking-wide uppercase font-mono">{currentRole.badge}</span>
                      <span className="text-[9px] text-slate-400 block max-w-[140px] truncate">{currentRole.email}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => { setProfileMenuOpen(false); alert('Profile preference dialogs staged for Module 3.'); }}
                      className="w-full px-4 py-2 hover:bg-slate-50 text-left text-xs font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Users className="h-4 w-4 text-slate-400" /> My Profile
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); alert('Account settings variables staged.'); }}
                      className="w-full px-4 py-2 hover:bg-slate-50 text-left text-xs font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4 text-slate-400" /> Account Preferences
                    </button>
                    <button
                      onClick={() => { setProfileMenuOpen(false); alert('System keys synced securely.'); }}
                      className="w-full px-4 py-2 hover:bg-slate-50 text-left text-xs font-semibold text-slate-700 flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4 text-slate-400" /> Security Keys
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1 mt-1">
                    <button
                      onClick={() => {
                        setProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 hover:bg-danger-light text-left text-xs font-bold text-danger flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};


// 2. REUSABLE DYNAMIC SIDEBAR
interface DynamicSidebarProps {
  currentRole: GovernmentRole;
  sidebarCollapsed: boolean;
  activeTab: string;
  setActiveTab: (t: string) => void;
  criticalBadgeCount: number;
  handleLogout: () => void;
}

export const DynamicSidebar: React.FC<DynamicSidebarProps> = ({
  currentRole,
  sidebarCollapsed,
  activeTab,
  setActiveTab,
  criticalBadgeCount,
  handleLogout
}) => {
  const menuItems = getSidebarMenuItems(currentRole.id, criticalBadgeCount);

  return (
    <aside className={`hidden md:flex flex-col border-r border-slate-200/80 bg-white transition-all duration-300 shrink-0 ${
      sidebarCollapsed ? 'w-16' : 'w-60'
    }`} id="desktop-sidebar">
      <div className="flex-grow py-4 flex flex-col justify-between">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  active
                    ? 'bg-gov-blue-light text-gov-blue shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                id={`sidebar-item-${item.id}`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? 'text-gov-blue' : 'text-slate-400'}`} />
                {!sidebarCollapsed && (
                  <span className="flex-grow text-left truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge !== undefined && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    item.id === 'assigned_complaints' || item.id === 'ward_complaints' || item.id === 'critical_issues' || item.id === 'critical_alerts'
                      ? 'bg-danger text-white animate-pulse'
                      : 'bg-gov-blue text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="px-3 pt-4 border-t border-slate-150">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-danger hover:bg-danger-light transition-all"
          >
            <LogOut className="h-4.5 w-4.5 shrink-0" />
            {!sidebarCollapsed && <span>Log Out Console</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};


// 3. REUSABLE ROLE WELCOME CARD
interface RoleWelcomeCardProps {
  currentRole: GovernmentRole;
}

export const RoleWelcomeCard: React.FC<RoleWelcomeCardProps> = ({ currentRole }) => {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-200/80 md3-shadow-md overflow-hidden p-6 sm:p-8">
      {/* Top design strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gov-blue via-ai-purple to-emerald-500" />
      <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-gov-blue/5 to-transparent rounded-full -mr-6 -mt-6 pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 font-mono tracking-wider uppercase">Active Administrative Session</span>
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] font-bold font-mono text-success bg-success-light px-2 py-0.5 rounded border border-success/10">SSL SECURE CONNECTION</span>
          </div>
          
          <div className="space-y-1 text-left">
            <span className="text-[11px] text-slate-400 font-bold block">Good Morning,</span>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {currentRole.name}
            </h1>
          </div>
          
          <div className="text-xs sm:text-sm text-slate-500 font-semibold flex flex-wrap items-center gap-1.5 pt-1">
            <span>Authorized Role:</span>
            <span className="text-gov-blue bg-gov-blue-light px-2.5 py-0.5 rounded-md font-bold text-xs uppercase font-mono tracking-wide">
              {currentRole.roleName}
            </span>
            <span>•</span>
            <span>Jurisdiction Division:</span>
            <strong className="text-slate-800">{currentRole.jurisdiction}</strong>
          </div>
        </div>

        {/* Action shortcuts / System Feed Badge */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <div className="h-9 w-9 rounded-lg bg-ai-purple-light flex items-center justify-center text-ai-purple border border-ai-purple/10">
            <Sparkles className="h-5 w-5 text-ai-purple animate-pulse" />
          </div>
          <div className="space-y-0.5 text-left pr-2">
            <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block">Governance Engine</span>
            <span className="text-xs font-bold text-slate-800">Sovereign SmartWard AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// 4. REUSABLE ROLE KPI CARDS
interface RoleKPICardsProps {
  currentRole: GovernmentRole;
  kpis: any;
}

export const RoleKPICards: React.FC<RoleKPICardsProps> = ({ currentRole, kpis }) => {
  const cards = getRoleKPICardsData(currentRole.id, kpis);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div 
            key={idx} 
            className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm hover:border-slate-300 transition-all text-left flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                  {card.label}
                </span>
                {Icon && (
                  <Icon className={`h-4.5 w-4.5 ${card.iconColor || 'text-slate-400'} ${card.animatePulse ? 'animate-pulse' : ''}`} />
                )}
              </div>
              <h3 className={`font-display text-2xl sm:text-3xl font-black mt-3 tracking-tight ${
                card.label === 'Critical' || card.label === 'Critical Issues' || card.label === 'Escalated Issues' || card.label === 'Critical Heat Spots'
                  ? 'text-danger' : 'text-slate-900'
              }`}>
                {card.value}
              </h3>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-50 flex items-center justify-between text-[10px]">
              <span className="text-slate-500 font-semibold">{card.desc}</span>
              {card.trend && (
                <span className={`font-bold font-mono px-1.5 py-0.5 rounded ${
                  card.trendType === 'danger' 
                    ? 'bg-danger-light text-danger' 
                    : card.trendType === 'success' 
                    ? 'bg-success-light text-success' 
                    : card.trendType === 'warning'
                    ? 'bg-warning-light text-warning'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {card.trend}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};


// 5. REUSABLE ROLE QUICK ACTIONS
interface RoleQuickActionsProps {
  currentRole: GovernmentRole;
  onActionClick: (label: string) => void;
}

export const RoleQuickActions: React.FC<RoleQuickActionsProps> = ({ currentRole, onActionClick }) => {
  const actions = getRoleQuickActions(currentRole.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((act, idx) => {
        const Icon = act.icon;
        return (
          <button
            key={idx}
            onClick={() => onActionClick(act.label)}
            className="p-5 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all text-left flex flex-col justify-between group cursor-pointer bg-white"
          >
            <div className={`h-10 w-10 rounded-xl ${act.bg} flex items-center justify-center ${act.color} mb-3.5 shrink-0 transition-transform group-hover:scale-105`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                {act.label} <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </h4>
              <p className="text-[10px] text-slate-400 leading-normal mt-1 font-semibold">{act.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

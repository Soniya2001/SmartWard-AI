import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAuthority } from '../contexts/AuthorityContext';
import { motion } from 'motion/react';
import { Landmark } from 'lucide-react';
import { 
  DynamicHeader, 
  DynamicSidebar, 
  getSidebarMenuItems,
  GovernmentRole
} from './AuthorityLayoutComponents';

interface AuthorityLayoutProps {
  children: React.ReactNode;
}

export const AuthorityLayout: React.FC<AuthorityLayoutProps> = ({ children }) => {
  const { user, logout, login } = useAuth();
  const { currentRole, setCurrentRole, rolesList, kpis } = useAuthority();
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Search filter query
  const [globalSearch, setGlobalSearch] = useState('');

  // Dropdowns
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  // Notifications list
  const notifications = [
    { id: '1', title: 'High Priority Complaint Escalated', desc: 'Critical sewer failure reported on Bypass Hwy Ward 42. SLA response expires in 2 hrs.', time: '5m ago', type: 'critical' },
    { id: '2', title: 'Complaint Assigned', desc: 'SLA priority code #SW-9742 assigned to PWD engineering desk.', time: '14m ago', type: 'info' },
    { id: '3', title: 'Weekly Audit Dispatch', desc: 'State-wide citizen satisfaction rating scorecard published.', time: '1h ago', type: 'update' },
    { id: '4', title: 'Reminder: PWD Review', desc: 'Pending road repairs verify checklist submission required before 17:00 IST.', time: '3h ago', type: 'warning' },
  ];

  // Map click on Tab ID to Route
  const handleTabClick = (id: string) => {
    if (id === 'dashboard') {
      navigate('/authority/dashboard');
    } else if (['assigned_complaints', 'complaint_queue', 'ward_complaints', 'critical_issues', 'critical_alerts'].includes(id)) {
      navigate('/authority/complaints');
    } else if (id === 'field_staff') {
      navigate('/authority/dashboard/department');
    } else if (['ai_recommendations', 'ai_insights', 'ai_strategic_insights', 'ward_analytics', 'constituency_analytics', 'state_performance', 'district_analytics', 'district_rankings', 'state_analytics', 'ward_performance', 'heatmaps'].includes(id)) {
      navigate('/authority/dashboard?tab=analytics');
    } else if (['reports', 'performance_reports'].includes(id)) {
      navigate('/authority/reports');
    } else if (id === 'notifications') {
      navigate('/authority/notifications');
    } else {
      navigate('/authority/dashboard');
    }
  };

  // Map Route to Active Tab ID
  const activeTab = useMemo(() => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');

    if (path === '/authority/dashboard') {
      if (tabParam === 'analytics') {
        if (currentRole.id === 'cm') return 'state_analytics';
        if (currentRole.id === 'collector') return 'district_analytics';
        if (currentRole.id === 'officer') return 'ai_recommendations';
        if (currentRole.id === 'councillor') return 'ward_analytics';
        if (currentRole.id === 'mla') return 'constituency_analytics';
        if (currentRole.id === 'commissioner') return 'ward_performance';
        if (currentRole.id === 'minister') return 'state_performance';
        return 'ai_insights';
      }
      return 'dashboard';
    }
    if (path === '/authority/dashboard/department') return 'field_staff';
    if (path === '/authority/complaints') {
      if (currentRole.id === 'officer') return 'assigned_complaints';
      if (currentRole.id === 'councillor') return 'ward_complaints';
      if (currentRole.id === 'collector') return 'critical_issues';
      if (currentRole.id === 'cm') return 'critical_issues';
      if (currentRole.id === 'minister') return 'critical_issues';
      return 'assigned_complaints';
    }
    if (path === '/authority/reports') {
      if (currentRole.id === 'collector' || currentRole.id === 'cm') return 'performance_reports';
      return 'reports';
    }
    if (path === '/authority/notifications') return 'notifications';
    return 'dashboard';
  }, [location.pathname, location.search, currentRole.id]);

  // Role switch handler
  const handleRoleSwitch = async (role: GovernmentRole) => {
    setCurrentRole(role);
    setRoleMenuOpen(false);
    // Silent context update for session memory
    try {
      await login(role.email, 'authority', role.name);
    } catch (e) {
      console.error(e);
    }
    navigate('/authority/dashboard');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Get dynamic menu items for mobile sidebar
  const menuItems = useMemo(() => {
    return getSidebarMenuItems(currentRole.id, kpis.critical);
  }, [currentRole.id, kpis.critical]);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans text-left" id="authority-root-layout">
      
      {/* 1. TOP NAVIGATION BAR */}
      <DynamicHeader
        currentRole={currentRole}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        roleMenuOpen={roleMenuOpen}
        setRoleMenuOpen={setRoleMenuOpen}
        notificationMenuOpen={notificationMenuOpen}
        setNotificationMenuOpen={setNotificationMenuOpen}
        profileMenuOpen={profileMenuOpen}
        setProfileMenuOpen={setProfileMenuOpen}
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        rolesList={rolesList}
        handleRoleSwitch={handleRoleSwitch}
        notifications={notifications}
        handleLogout={handleLogout}
      />

      <div className="flex-grow flex relative">
        
        {/* 2. SIDEBAR - COLLAPSIBLE */}
        <DynamicSidebar
          currentRole={currentRole}
          sidebarCollapsed={sidebarCollapsed}
          activeTab={activeTab}
          setActiveTab={handleTabClick}
          criticalBadgeCount={kpis.critical}
          handleLogout={handleLogout}
        />

        {/* Mobile Sidebar overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              className="relative w-60 bg-white border-r border-slate-200 h-full p-4 flex flex-col justify-between text-left"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-display text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Landmark className="h-4 w-4 text-gov-blue" /> SmartWard Console
                  </span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded hover:bg-slate-100">
                    &times;
                  </button>
                </div>
                
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          handleTabClick(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                          active
                            ? 'bg-gov-blue-light text-gov-blue font-bold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? 'text-gov-blue' : 'text-slate-400'}`} />
                        <span className="flex-grow text-left">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gov-blue text-white">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-150">
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-danger hover:bg-danger-light transition-all"
                >
                  <span>Log Out Console</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 3. DYNAMIC CONTENT AREA */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto text-left max-w-7xl mx-auto w-full">
          {children}
        </main>

      </div>
    </div>
  );
};

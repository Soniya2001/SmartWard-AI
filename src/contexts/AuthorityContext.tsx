import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { GovernmentRole } from '../components/AuthorityLayoutComponents';

interface AuthorityContextType {
  currentRole: GovernmentRole;
  setCurrentRole: (role: GovernmentRole) => void;
  rolesList: GovernmentRole[];
  kpis: {
    today: number;
    pending: number;
    resolved: number;
    critical: number;
    avgSla: string;
    satisfaction: string;
  };
  chartData: {
    categories: any[];
    status: any[];
    monthlyTrend: any[];
    resolutionRate: any[];
  };
  selectedDepartment: string;
  setSelectedDepartment: (dept: string) => void;
}

const rolesList: GovernmentRole[] = [
  { id: 'cm', roleName: 'Chief Minister', name: 'Thiru. C. Joseph Vijay', email: 'cm@smartward.in', department: 'State Executive Council', jurisdiction: 'State of Tamil Nadu', badge: 'Apex Command', avatarSeed: 'CM', avatarColor: 'bg-indigo-600' },
  { id: 'minister', roleName: 'Minister', name: 'Thiru. Bussy N. Anand', email: 'minister.municipal@smartward.in', department: 'Urban Development & Municipal Administration', jurisdiction: 'State-wide Infrastructure', badge: 'Cabinet Minister', avatarSeed: 'MIN', avatarColor: 'bg-blue-600' },
  { id: 'collector', roleName: 'District Collector', name: 'Dr. M.S. Sangeetha, IAS', email: 'collector.madurai@smartward.in', department: 'District Revenue & Public Safety', jurisdiction: 'Madurai District', badge: 'District Magistrate', avatarSeed: 'COL', avatarColor: 'bg-emerald-600' },
  { id: 'commissioner', roleName: 'Municipal Commissioner', name: 'Shri. L. Madhubalan, IAS', email: 'commissioner.madurai@smartward.in', department: 'Madurai Municipal Corporation Secretariat', jurisdiction: 'Madurai City Limit', badge: 'Corporation Head', avatarSeed: 'COM', avatarColor: 'bg-purple-600' },
  { id: 'mla', roleName: 'MLA', name: 'Shri. G. Thalapathi', email: 'mla.madurainorth@smartward.in', department: 'State Legislative Assembly constituency', jurisdiction: 'Madurai North Constituency', badge: 'State Representative', avatarSeed: 'MLA', avatarColor: 'bg-amber-600' },
  { id: 'councillor', roleName: 'Ward Councillor', name: 'Smt. S. Kavitha', email: 'councillor.ward42@smartward.in', department: 'Ward 42 Standing Committee', jurisdiction: 'Ward 42 (Madurai)', badge: 'Ward Representative', avatarSeed: 'WC', avatarColor: 'bg-teal-600' },
  { id: 'officer', roleName: 'Department Officer', name: 'Er. Rajesh Kumar', email: 'roads.ward42@smartward.in', department: 'PWD Highway & Infrastructure Division', jurisdiction: 'Ward 42 Engineering Sector', badge: 'Executive Engineer', avatarSeed: 'DO', avatarColor: 'bg-pink-600' },
];

const AuthorityContext = createContext<AuthorityContextType | undefined>(undefined);

export const AuthorityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login } = useAuth();
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Water Supply');

  const [activeRole, setActiveRole] = useState<GovernmentRole>(rolesList[2]); // Default to District Collector

  // Computed role to support dynamic department switcher context
  const currentRole = useMemo(() => {
    if (activeRole.id === 'officer') {
      const officerDetails: Record<string, { name: string; department: string; email: string; avatarSeed: string }> = {
        'Roads Department': {
          name: 'Er. Rajesh Kumar',
          department: 'Roads Department',
          email: 'roads.ward42@smartward.in',
          avatarSeed: 'DO_Roads'
        },
        'Water Supply': {
          name: 'Er. Suresh Kumar',
          department: 'Water Supply Department',
          email: 'water.ward42@smartward.in',
          avatarSeed: 'DO_Water'
        },
        'Electrical': {
          name: 'Er. Selvaraj',
          department: 'Electrical Division',
          email: 'electrical.ward42@smartward.in',
          avatarSeed: 'DO_Elec'
        },
        'Sanitation': {
          name: 'Er. Ramesh Krishnan',
          department: 'Sanitation Department',
          email: 'sanitation.ward42@smartward.in',
          avatarSeed: 'DO_San'
        },
        'Drainage & Storm Water': {
          name: 'Er. K. Venkatraman',
          department: 'Drainage & Storm Water Department',
          email: 'drainage.ward42@smartward.in',
          avatarSeed: 'DO_Drain'
        },
        'Solid Waste Management': {
          name: 'Er. S. Murugesan',
          department: 'Solid Waste Management Division',
          email: 'swm.ward42@smartward.in',
          avatarSeed: 'DO_Swm'
        },
        'Street Lighting': {
          name: 'Er. P. Subramanian',
          department: 'Street Lighting Division',
          email: 'lighting.ward42@smartward.in',
          avatarSeed: 'DO_Light'
        },
        'Parks & Public Spaces': {
          name: 'Er. M. Lakshmanan',
          department: 'Parks & Public Spaces Division',
          email: 'parks.ward42@smartward.in',
          avatarSeed: 'DO_Parks'
        },
      };

      const details = officerDetails[selectedDepartment] || officerDetails['Water Supply'];
      return {
        ...activeRole,
        name: details.name,
        department: details.department,
        email: details.email,
        avatarSeed: details.avatarSeed
      };
    }
    return activeRole;
  }, [activeRole, selectedDepartment]);

  // Sync state with auth context user if logged in as specific authority
  useEffect(() => {
    if (user && user.role === 'authority') {
      const matched = rolesList.find(r => r.email.toLowerCase() === user.email.toLowerCase());
      if (matched && matched.id !== activeRole.id) {
        setActiveRole(matched);
      }
    }
  }, [user, activeRole.id]);

  // KPI calculations scaled based on active role's jurisdiction scope
  const kpis = useMemo(() => {
    const scale = currentRole.id === 'cm' ? 12.5 : currentRole.id === 'minister' ? 8.2 : currentRole.id === 'collector' ? 3.4 : currentRole.id === 'commissioner' ? 2.1 : currentRole.id === 'mla' ? 1.5 : currentRole.id === 'councillor' ? 0.4 : 0.15;
    
    const today = Math.round(180 * scale) || 12;
    const pending = Math.round(840 * scale) || 34;
    const resolved = Math.round(5200 * scale) || 280;
    const critical = Math.round(32 * scale) || 3;
    const avgSla = (2.4 - (scale * 0.05)).toFixed(1);
    const satisfaction = (4.4 + (scale * 0.02) > 4.9 ? 4.9 : 4.4 + (scale * 0.02)).toFixed(1);

    return {
      today,
      pending,
      resolved,
      critical,
      avgSla: `${avgSla} Days`,
      satisfaction: `${satisfaction}/5.0`
    };
  }, [currentRole]);

  // Chart data setup
  const chartData = useMemo(() => {
    const scale = currentRole.id === 'cm' ? 10 : currentRole.id === 'minister' ? 7 : currentRole.id === 'collector' ? 4 : 2;
    return {
      categories: [
        { name: 'Roads', value: Math.round(450 * scale), color: '#2563EB' },
        { name: 'Garbage', value: Math.round(320 * scale), color: '#EF4444' },
        { name: 'Water Leakage', value: Math.round(280 * scale), color: '#0EA5E9' },
        { name: 'Streetlights', value: Math.round(190 * scale), color: '#F59E0B' },
        { name: 'Drainage', value: Math.round(240 * scale), color: '#10B981' },
        { name: 'Others', value: Math.round(120 * scale), color: '#64748B' },
      ],
      status: [
        { name: 'Pending Review', value: kpis.today, color: '#F59E0B' },
        { name: 'In Progress', value: kpis.pending, color: '#2563EB' },
        { name: 'Resolved', value: kpis.resolved, color: '#10B981' },
      ],
      monthlyTrend: [
        { name: 'Jan', filed: Math.round(1100 * scale), resolved: Math.round(950 * scale) },
        { name: 'Feb', filed: Math.round(1250 * scale), resolved: Math.round(1120 * scale) },
        { name: 'Mar', filed: Math.round(1400 * scale), resolved: Math.round(1350 * scale) },
        { name: 'Apr', filed: Math.round(1650 * scale), resolved: Math.round(1490 * scale) },
        { name: 'May', filed: Math.round(1900 * scale), resolved: Math.round(1820 * scale) },
        { name: 'Jun', filed: Math.round(2200 * scale), resolved: Math.round(2010 * scale) },
        { name: 'Jul', filed: Math.round(2600 * scale), resolved: Math.round(2350 * scale) },
      ],
      resolutionRate: [
        { name: 'Week 1', rate: 89 },
        { name: 'Week 2', rate: 91 },
        { name: 'Week 3', rate: 92 },
        { name: 'Week 4', rate: 94 },
      ]
    };
  }, [currentRole, kpis]);

  return (
    <AuthorityContext.Provider value={{ 
      currentRole, 
      setCurrentRole: setActiveRole, 
      rolesList, 
      kpis, 
      chartData,
      selectedDepartment,
      setSelectedDepartment
    }}>
      {children}
    </AuthorityContext.Provider>
  );
};

export const useAuthority = () => {
  const context = useContext(AuthorityContext);
  if (context === undefined) {
    throw new Error('useAuthority must be used within an AuthorityProvider');
  }
  return context;
};

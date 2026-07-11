import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthority } from '../contexts/AuthorityContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  FileText, Bell, Settings, LogOut, Menu, X, Search, Globe, ChevronDown, Sparkles, 
  TrendingUp, CheckCircle2, Clock, AlertCircle, ArrowRight, SlidersHorizontal,
  Landmark, Building2, Phone, Mail, User, Shield, Briefcase, Layers, MapPin, 
  Calendar, DollarSign, Truck, Heart, FileSpreadsheet, Cpu, BookmarkCheck
} from 'lucide-react';

import { 
  RoleWelcomeCard, 
  RoleKPICards, 
  RoleQuickActions,
  getHeaderDetails
} from '../components/AuthorityLayoutComponents';

// Import our 7 role-specific, highly-polished dashboards
import { OfficerDashboard } from '../components/authority/dashboards/OfficerDashboard';
import { CouncillorDashboard } from '../components/authority/dashboards/CouncillorDashboard';
import { MlaDashboard } from '../components/authority/dashboards/MlaDashboard';
import { CommissionerDashboard } from '../components/authority/dashboards/CommissionerDashboard';
import { CollectorDashboard } from '../components/authority/dashboards/CollectorDashboard';
import { MinisterDashboard } from '../components/authority/dashboards/MinisterDashboard';
import { CmDashboard } from '../components/authority/dashboards/CmDashboard';

export const AuthorityDashboard: React.FC = () => {
  const { currentRole, kpis, chartData } = useAuthority();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeSubTab = searchParams.get('tab') || 'overview';

  const details = getHeaderDetails(currentRole);

  const [activeActionModal, setActiveActionModal] = React.useState<string | null>(null);

  const handleActionTrigger = (actionName: string) => {
    if (actionName === "Assign Staff" || actionName === "Field Staff") {
      navigate('/authority/dashboard/department');
    } else if (actionName === "Update Complaint") {
      navigate('/authority/complaints');
    } else {
      setActiveActionModal(actionName);
    }
  };

  const randomTxId = React.useMemo(() => {
    return `TXN-827-${Math.floor(1000 + Math.random() * 9000)}`;
  }, [activeActionModal]);

  return (
    <div className="space-y-6 text-left animate-fade-in" id="authority-dashboard-content">
      {/* Dynamic Breadcrumbs & Page Header */}
      <div className="space-y-1.5 text-left border-b border-slate-200 pb-4">
        <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          <span>{details.breadcrumb}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              {details.title}
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              {details.subtitle}
            </p>
          </div>
          <div className="text-[10px] font-mono font-bold text-slate-400">
            UTC: 2026-07-10 16:30
          </div>
        </div>
      </div>

      {/* Conditionally Render Custom Dashboard based on Active Role ID */}
      {currentRole.id === 'officer' ? (
        <OfficerDashboard kpis={kpis} onActionTrigger={handleActionTrigger} />
      ) : currentRole.id === 'councillor' ? (
        <CouncillorDashboard kpis={kpis} onActionTrigger={handleActionTrigger} activeSubTab={activeSubTab} />
      ) : currentRole.id === 'mla' ? (
        <MlaDashboard kpis={kpis} onActionTrigger={handleActionTrigger} activeSubTab={activeSubTab} />
      ) : currentRole.id === 'commissioner' ? (
        <CommissionerDashboard kpis={kpis} onActionTrigger={handleActionTrigger} activeSubTab={activeSubTab} />
      ) : currentRole.id === 'collector' ? (
        <CollectorDashboard kpis={kpis} onActionTrigger={handleActionTrigger} activeSubTab={activeSubTab} />
      ) : currentRole.id === 'minister' ? (
        <MinisterDashboard kpis={kpis} onActionTrigger={handleActionTrigger} activeSubTab={activeSubTab} />
      ) : currentRole.id === 'cm' ? (
        <CmDashboard kpis={kpis} onActionTrigger={handleActionTrigger} activeSubTab={activeSubTab} />
      ) : (
        <>
          {/* Fallback to Generic Dashboard if no matching custom role is loaded */}
          <RoleWelcomeCard currentRole={currentRole} />

          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 font-mono uppercase tracking-wider">Role Quick Commands</h3>
            <RoleQuickActions 
              currentRole={currentRole} 
              onActionClick={handleActionTrigger} 
            />
          </div>

          <RoleKPICards currentRole={currentRole} kpis={kpis} />

          <div className="bg-slate-100/60 p-5 rounded-2xl border border-slate-200/80 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-gov-blue" />
                <div>
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Role-Aware Console Widgets</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Dynamically active modules rendering specific telemetry for the {currentRole.roleName} role.</p>
                </div>
              </div>
              <span className="text-[10px] font-bold font-mono text-ai-purple bg-ai-purple-light px-2.5 py-0.5 rounded border border-ai-purple/10">Dynamic Workspace</span>
            </div>
            <p className="text-xs text-slate-500">Workspace loaded successfully.</p>
          </div>
        </>
      )}

      {/* Sandbox Simulated Action Feedback Dialog */}
      <AnimatePresence>
        {activeActionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm shadow-xl"
              onClick={() => setActiveActionModal(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-sm rounded-2xl md3-shadow-lg p-6 border border-slate-200 text-center flex flex-col items-center justify-center gap-4 z-10 font-sans"
            >
              <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-emerald-600 animate-bounce-slow">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display text-sm font-black text-slate-900 tracking-tight leading-none">
                  Action Executed Successfully
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  The operation <strong className="text-slate-800">&ldquo;{activeActionModal}&rdquo;</strong> has been processed successfully by the municipal administration workspace.
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl w-full text-left space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold uppercase">
                  <span>Resource Status</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="text-xs font-mono font-black text-slate-800">
                  {randomTxId}
                </div>
              </div>
              <button
                onClick={() => setActiveActionModal(null)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all"
              >
                Dismiss Console
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

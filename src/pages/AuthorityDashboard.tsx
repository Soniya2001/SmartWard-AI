import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthority } from '../contexts/AuthorityContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  FileText, Bell, LogOut, Menu, X, Search, Globe, ChevronDown, Sparkles, 
  TrendingUp, CheckCircle2, Clock, AlertCircle, ArrowRight, SlidersHorizontal,
  Landmark, Building2, Phone, Mail, User, Shield, Briefcase, Layers, MapPin, 
  Calendar, DollarSign, Truck, Heart, FileSpreadsheet, Cpu, BookmarkCheck, Loader2, Check
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
  const [sopStatus, setSopStatus] = React.useState<'idle' | 'running' | 'completed'>('idle');
  const [sopStep, setSopStep] = React.useState<number>(0);

  React.useEffect(() => {
    let timer: any;
    if (sopStatus === 'running') {
      if (sopStep < 5) {
        timer = setTimeout(() => {
          setSopStep(prev => prev + 1);
        }, 1000);
      } else {
        setSopStatus('completed');
      }
    }
    return () => clearTimeout(timer);
  }, [sopStatus, sopStep]);

  const handleActionTrigger = (actionName: string) => {
    const normalizedAction = actionName.toLowerCase().trim();
    if (normalizedAction === "assign staff" || normalizedAction === "field staff") {
      navigate('/authority/dashboard/department');
    } else if (
      normalizedAction === "update complaint" || 
      normalizedAction === "view complaints" || 
      normalizedAction === "review critical issues" || 
      normalizedAction === "review ciritical issues"
    ) {
      navigate('/authority/complaints');
    } else if (
      normalizedAction === "compare wards" || 
      normalizedAction === "compare municipalities" ||
      normalizedAction === "view state analytics"
    ) {
      navigate('/authority/dashboard?tab=analytics');
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
              onClick={() => {
                setActiveActionModal(null);
                setSopStatus('idle');
                setSopStep(0);
              }}
            />
            {activeActionModal === "Enforce Precautionary SOP" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white w-full max-w-md rounded-3xl md3-shadow-lg p-6 border border-slate-200 text-left flex flex-col gap-5 z-10 font-sans"
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-black text-slate-900 tracking-tight leading-none">
                        Precautionary SOP Console
                      </h3>
                      <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mt-1">
                        Ward 42 • Flood Mitigation
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveActionModal(null);
                      setSopStatus('idle');
                      setSopStep(0);
                    }}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/60 text-xs text-slate-600 leading-relaxed font-semibold">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-teal-700 font-mono uppercase mb-1">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Predictive Telemetry Threat Vector
                  </div>
                  High probability of waterlogging near Melur Road bypass limits due to drainage flow constriction. Running this SOP initiates emergency preventative operations.
                </div>

                {/* Status meter & controls */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold font-mono">
                    <span className="text-slate-400">Current Status:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      sopStatus === 'idle' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      sopStatus === 'running' ? 'bg-blue-50 text-blue-600 border border-blue-100 animate-pulse' :
                      'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}>
                      {sopStatus === 'idle' ? '🟠 PENDING AUTHORIZATION' : 
                       sopStatus === 'running' ? '🔵 RUNNING DISPATCHES' : 
                       '🟢 ACTIVE & DEPLOYED'}
                    </span>
                  </div>

                  {sopStatus !== 'idle' && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono font-bold uppercase">
                        <span>Dispatch Progress</span>
                        <span>{Math.round((sopStep / 5) * 100)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-teal-650 rounded-full" 
                          style={{ width: `${(sopStep / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* SOP Steps list */}
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {[
                    { title: "Localized SMS Alert Broadcast", desc: "Sent cell-broadcast emergency alerts to 1,240 KK Nagar & Melur Road residents." },
                    { title: "Deploy De-Watering Rigs", desc: "Moved 2 heavy-duty diesel de-watering pump rigs to Melur Road Corridor." },
                    { title: "Stormwater Pipeline Desilting", desc: "Clearance crews initiated emergency desilting at bottleneck lines." },
                    { title: "Emergency Response Standby", desc: "Mobilized Ward 42 disaster-response squad leads on active standby." },
                    { title: "Activate Spatial Telemetry Feed", desc: "Connected Melur Road waterlevel and rate-flow sensors to Central Command." }
                  ].map((step, idx) => {
                    const isCompleted = idx < sopStep;
                    const isCurrent = idx === sopStep && sopStatus === 'running';
                    return (
                      <div key={idx} className={`flex gap-3 text-xs border-b border-slate-100 pb-2.5 last:border-0 last:pb-0 transition-opacity ${
                        isCompleted || isCurrent ? 'opacity-100' : 'opacity-40'
                      }`}>
                        <div className="shrink-0 pt-0.5">
                          {isCompleted ? (
                            <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shadow-sm animate-scale-in">
                              <Check className="h-3.5 w-3.5 stroke-[3]" />
                            </div>
                          ) : isCurrent ? (
                            <div className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center animate-spin">
                              <Loader2 className="h-3.5 w-3.5" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-slate-200 flex items-center justify-center text-[10px] text-slate-300 font-mono font-bold">
                              {idx + 1}
                            </div>
                          )}
                        </div>
                        <div className="space-y-0.5 text-left">
                          <h4 className={`text-xs font-bold leading-tight ${isCompleted ? 'text-slate-800' : isCurrent ? 'text-blue-700 font-black' : 'text-slate-500'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-medium leading-normal">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer buttons */}
                <div className="pt-2">
                  {sopStatus === 'idle' ? (
                    <button 
                      onClick={() => setSopStatus('running')}
                      className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      ⚡ Authorize &amp; Deploy SOP Protocols
                    </button>
                  ) : sopStatus === 'running' ? (
                    <button 
                      disabled
                      className="w-full py-2.5 bg-slate-100 text-slate-400 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-2 cursor-not-allowed animate-pulse"
                    >
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" /> Deploying Preventative Measures...
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1 text-[11px] text-slate-600 font-semibold leading-relaxed text-left">
                        <span className="font-bold text-emerald-800 block text-xs">🟢 All Systems Operational</span>
                        Emergency dispatch complete. All field components have confirmed receipt. Melur Road corridor stormwater clearance is actively in progress.
                      </div>
                      <button 
                        onClick={() => {
                          setActiveActionModal(null);
                          setSopStatus('idle');
                          setSopStep(0);
                        }}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer transition-all"
                      >
                        Dismiss Console
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
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
                  onClick={() => {
                    setActiveActionModal(null);
                    setSopStatus('idle');
                    setSopStep(0);
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all"
                >
                  Dismiss Console
                </button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

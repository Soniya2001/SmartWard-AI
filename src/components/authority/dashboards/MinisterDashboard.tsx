import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { 
  Building2, Landmark, DollarSign, Users, Award, FileText, 
  MapPin, CheckCircle2, AlertCircle, RefreshCw, Star, 
  ArrowUpRight, Sparkles, Download, Layers, Calendar,
  ShieldAlert, Sliders, Map, Shield, X, Check, Loader2, Plus
} from 'lucide-react';
import { useAuthority } from '../../../contexts/AuthorityContext';

interface MinisterDashboardProps {
  kpis: any;
  onActionTrigger: (actionName: string) => void;
  activeSubTab?: string;
}

export const MinisterDashboard: React.FC<MinisterDashboardProps> = ({ kpis, onActionTrigger, activeSubTab }) => {
  const { chartData } = useAuthority();
  // District-wise state rankings
  const [districts, setDistricts] = React.useState<any[]>(() => {
    const saved = localStorage.getItem('smartward_minister_districts');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { name: 'Madurai District', score: 94.8, satisfaction: 4.6, ranking: 1, tickets: 1647, trend: '+2.4%' },
      { name: 'Chennai Metropolitan', score: 91.2, satisfaction: 4.4, ranking: 2, tickets: 4851, trend: '+1.1%' },
      { name: 'Coimbatore District', score: 88.5, satisfaction: 4.2, ranking: 3, tickets: 2145, trend: '-0.8%' },
      { name: 'Salem District', score: 86.4, satisfaction: 4.0, ranking: 4, tickets: 1124, trend: '+0.5%' }
    ];
  });

  const [policyDirectives, setPolicyDirectives] = React.useState<any[]>(() => {
    const saved = localStorage.getItem('smartward_minister_policy_directives');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { code: 'DIR-2026-A1', name: 'Solid Waste Management (SWM) SOP Protocol v2.0', date: 'Jul 04, 2026', scope: 'State-wide Corporations', status: 'Deployed' },
      { code: 'DIR-2026-B4', name: 'Monsoon Infrastructure Pothole Recovery Grant', date: 'Jul 08, 2026', scope: 'Coastal Taluk Collectors', status: 'Pending Approval' }
    ];
  });

  // Action status/states
  const [coimbatoreSalemApproved, setCoimbatoreSalemApproved] = React.useState<boolean>(() => {
    return localStorage.getItem('smartward_coimbatore_salem_approved') === 'true';
  });
  const [isApprovingExpansion, setIsApprovingExpansion] = React.useState<boolean>(false);

  // Modals
  const [isDirectiveModalOpen, setIsDirectiveModalOpen] = React.useState<boolean>(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = React.useState<boolean>(false);
  const [isAuditorModalOpen, setIsAuditorModalOpen] = React.useState<boolean>(false);

  // Directive form state
  const [newDirectiveName, setNewDirectiveName] = React.useState('');
  const [newDirectiveScope, setNewDirectiveScope] = React.useState('State-wide Corporations');
  const [isSubmittingDirective, setIsSubmittingDirective] = React.useState(false);
  const [directiveSuccess, setDirectiveSuccess] = React.useState(false);

  // Budgets state
  const [budgets, setBudgets] = React.useState<any[]>(() => {
    const saved = localStorage.getItem('smartward_minister_budgets');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'BUD-01', agency: 'Madurai Corporation', amount: '4.2 Crores', purpose: 'Drainage Desilting & River Vaigai Restoration', status: 'Pending Ministerial Authorization' },
      { id: 'BUD-02', agency: 'Coimbatore Corporation', amount: '8.5 Crores', purpose: 'EV Garbage Fleet & Smart Waste Segregation Hubs', status: 'Pending Ministerial Authorization' },
      { id: 'BUD-03', agency: 'Salem District Collectorate', amount: '3.1 Crores', purpose: 'Monsoon Infrastructure Pothole Recovery', status: 'Approved' }
    ];
  });
  const [authorizingBudgetId, setAuthorizingBudgetId] = React.useState<string | null>(null);

  // Audit State
  const [isAuditing, setIsAuditing] = React.useState(false);
  const [auditScores, setAuditScores] = React.useState<Record<string, string>>({});
  const [alertMsg, setAlertMsg] = React.useState<string | null>(null);

  // Handlers
  const handleApproveExpansion = () => {
    setIsApprovingExpansion(true);
    onActionTrigger("Approve Coimbatore-Salem Expansion");
    setTimeout(() => {
      setIsApprovingExpansion(false);
      setCoimbatoreSalemApproved(true);
      localStorage.setItem('smartward_coimbatore_salem_approved', 'true');
      
      // Update Coimbatore and Salem rankings and satisfaction metrics slightly since they got the expansion approved!
      setDistricts(prev => {
        const next = prev.map(d => {
          if (d.name === 'Coimbatore District') {
            return { ...d, score: 92.4, satisfaction: 4.5, trend: '+3.9%' };
          }
          if (d.name === 'Salem District') {
            return { ...d, score: 89.1, satisfaction: 4.3, trend: '+2.7%' };
          }
          return d;
        });
        localStorage.setItem('smartward_minister_districts', JSON.stringify(next));
        return next;
      });

      setAlertMsg("Coimbatore-Salem SWM Expansion approved & fund grants dispatched to respective Municipal Corporations!");
      setTimeout(() => setAlertMsg(null), 5000);
    }, 1500);
  };

  const handleIssueDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDirectiveName.trim()) return;

    setIsSubmittingDirective(true);
    onActionTrigger("Issue Policy Directive");
    
    setTimeout(() => {
      setIsSubmittingDirective(false);
      const newDir = {
        code: `DIR-2026-N${Math.floor(10 + Math.random() * 90)}`,
        name: newDirectiveName,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        scope: newDirectiveScope,
        status: 'Deployed'
      };

      setPolicyDirectives(prev => {
        const next = [newDir, ...prev];
        localStorage.setItem('smartward_minister_policy_directives', JSON.stringify(next));
        return next;
      });

      setDirectiveSuccess(true);
      setNewDirectiveName('');
      setAlertMsg(`Policy directive ${newDir.code} issued and transmitted live to all collectors!`);
      setTimeout(() => {
        setDirectiveSuccess(false);
        setIsDirectiveModalOpen(false);
      }, 2000);
    }, 1200);
  };

  const handleApproveBudget = (id: string) => {
    setAuthorizingBudgetId(id);
    onActionTrigger("Review State Budgets");
    
    setTimeout(() => {
      setAuthorizingBudgetId(null);
      setBudgets(prev => {
        const next = prev.map(b => {
          if (b.id === id) {
            return { ...b, status: 'Approved' };
          }
          return b;
        });
        localStorage.setItem('smartward_minister_budgets', JSON.stringify(next));
        return next;
      });

      setAlertMsg(`State budget ${id} authorized and funds cleared under ministerial dispatch!`);
      setTimeout(() => setAlertMsg(null), 4000);
    }, 1200);
  };

  const handleRunAudit = () => {
    setIsAuditing(true);
    onActionTrigger("Audit Collectorates");
    
    setTimeout(() => {
      setIsAuditing(false);
      setAuditScores({
        'Madurai District': 'Grade: A+ (Outstanding)',
        'Chennai Metropolitan': 'Grade: A (Optimal)',
        'Coimbatore District': 'Grade: B+ (Needs Monitoring)',
        'Salem District': 'Grade: B (SLA Warning)'
      });

      setAlertMsg("State-wide collectorate performance audit complete. Compliance indices synced!");
      setTimeout(() => setAlertMsg(null), 5000);
    }, 1500);
  };

  if (activeSubTab === 'analytics') {
    return (
      <div className="space-y-6 text-left" id="minister-analytics-view">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>State Cabinet Performance Analytics</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              State Performance Analytics
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-xl">
              Compare district performance indexes, track policy deployment speeds, and monitor state-wide civic compliance rates.
            </p>
          </div>
        </div>

        {/* AI Intelligence Briefing Panel */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 z-10 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 font-mono tracking-wide uppercase">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              Cabinet AI Policy Advisor
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              State-wide SWM SOP compliance spike
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              The newly deployed Solid Waste Management SOP Protocol v2.0 has resulted in a state-wide grievance reduction of 22%. <strong className="text-blue-950 font-bold">Recommended action:</strong> Expand the SWM grant allocation program to municipal corporations in Coimbatore and Salem to sustain progress.
            </p>
          </div>
          {coimbatoreSalemApproved ? (
            <div className="shrink-0 z-10 px-4 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 shadow-sm flex items-center gap-1.5 animate-scale-in">
              <Check className="h-4 w-4 text-emerald-600" />
              Expansion Active
            </div>
          ) : (
            <button 
              onClick={handleApproveExpansion}
              disabled={isApprovingExpansion}
              className="shrink-0 z-10 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isApprovingExpansion ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Broadcasting Command...
                </>
              ) : (
                "Approve Coimbatore-Salem Expansion"
              )}
            </button>
          )}
        </div>

        {/* First Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">District SLA Leaderboard</h3>
                <p className="text-xs text-slate-400 mt-0.5">SLA fulfillment scorecard compared across primary districts.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-blue-600 px-2 py-0.5 bg-blue-50 rounded border border-blue-100/10">Bar Chart</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districts} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                  <Bar dataKey="score" name="SLA Score" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Cabinet Directive Compliance</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Ratio of active and fully deployed cabinet directives.</p>
                </div>
                <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100/10">Pie Chart</span>
              </div>

              <div className="flex items-center justify-around h-48">
                <div className="h-44 w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData.categories}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {chartData.categories.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1 text-[10px] font-bold text-slate-600">
                  {chartData.categories.slice(0, 4).map((entry: any) => (
                    <div key={entry.name} className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="truncate max-w-[90px]">{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[10px] leading-relaxed text-slate-500 font-medium mt-4">
              All districts maintain an average policy compliance score above 85%.
            </div>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">State-wide Registration Trend</h3>
                <p className="text-xs text-slate-400 mt-0.5">Monthly state-wide incoming vs resolved ticket patterns.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-blue-600 px-2 py-0.5 bg-blue-50 rounded border border-blue-100/10">Line Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="filed" name="Filed" stroke="#1D4ED8" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">State SLA Response speed Efficiency</h3>
                <p className="text-xs text-slate-400 mt-0.5">Average weekly state SLA compliance rating.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100/10">Area Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.resolutionRate} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRateMin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="rate" name="SLA Met Rate %" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRateMin)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" id="minister-dashboard-root">
      
      {alertMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center justify-between shadow-sm animate-scale-in">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-650 shrink-0" />
            {alertMsg}
          </span>
          <button onClick={() => setAlertMsg(null)} className="text-emerald-500 hover:text-emerald-700 font-black cursor-pointer px-1">✕</button>
        </div>
      )}

      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Landmark className="h-3.5 w-3.5" />
              <span>Cabinet Secretariat - Municipal Administration</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              State Governance Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-xl">
              Ministerial governance and public policy console. Review state district leaderboard, issue regulatory directives, authorize municipal budgets, and audit collectorate performance.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsDirectiveModalOpen(true)}
              className="px-4 py-2 bg-white text-blue-950 text-xs font-bold rounded-xl shadow hover:bg-blue-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="h-3.5 w-3.5" /> Issue Policy Directive
            </button>
            <button 
              onClick={() => setIsBudgetModalOpen(true)}
              className="px-4 py-2 bg-blue-800 text-white border border-blue-700 text-xs font-bold rounded-xl shadow hover:bg-blue-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <DollarSign className="h-3.5 w-3.5" /> Review State Budgets
            </button>
          </div>
        </div>
      </div>

      {/* KPI GRID FOR MINISTER */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "State Complaints Inflow", value: "9,767 Tickets", desc: "Consolidated state-wide", icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: "Active Directives", value: "14 Policy SOPs", desc: "Authorized under Cabinet", icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: "State Satisfaction Rating", value: "4.3 / 5.0", desc: "SMS verified voter feedback", icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: "AI Governance Score", value: "91.2% Compliance", desc: "Predictive policy resolution index", icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50' }
        ].map((k, idx) => {
          const Icon = k.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">{k.label}</span>
                <div className={`p-1.5 rounded-lg ${k.bg} ${k.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 mt-3 tracking-tight">
                {k.value}
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">{k.desc}</p>
            </div>
          );
        })}
      </div>

      {/* STATE REGIONS COMPARATIVE INDEX BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: State District Comparison Table */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <div className="flex items-center gap-1.5">
              <Layers className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">District SLA & Satisfaction Leaderboard</h3>
            </div>
            <span className="text-[9px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">State rankings</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5">District</th>
                  <th className="py-2.5">SLA Compliance</th>
                  <th className="py-2.5">Voter Satisfaction</th>
                  <th className="py-2.5">Active Grievances</th>
                  <th className="py-2.5 text-right">Ranking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {districts.map((dist) => (
                  <tr key={dist.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-blue-600" />
                      <span>{dist.name}</span>
                    </td>
                    <td className="py-3 font-mono text-slate-900">
                      {dist.score}% <span className="text-emerald-600 text-[10px] font-bold">({dist.trend})</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 font-mono">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                        <span>{dist.satisfaction}</span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-slate-500">{dist.tickets}</td>
                    <td className="py-3 text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        dist.ranking === 1 ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{dist.ranking}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: State Policy Directives */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <div className="flex items-center gap-1.5">
              <Shield className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent policy Directives & SOPs</h3>
            </div>
            <span className="text-[9px] font-mono font-bold text-slate-400">2 Active Records</span>
          </div>

          <div className="divide-y divide-slate-100">
            {policyDirectives.map((policy) => (
              <div key={policy.code} className="py-3 space-y-1 first:pt-0 last:pb-0">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100/50">{policy.code}</span>
                  <span className="text-slate-400">{policy.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 leading-snug">{policy.name}</h4>
                <div className="flex justify-between text-[10px] text-slate-500 font-medium pt-0.5">
                  <span>Scope: <strong className="text-slate-700">{policy.scope}</strong></span>
                  <span className={`font-bold ${policy.status === 'Deployed' ? 'text-emerald-600' : 'text-amber-600'}`}>{policy.status}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsAuditorModalOpen(true)}
            className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-all text-center cursor-pointer"
          >
            Open Collectorates Performance Auditor
          </button>
        </div>

      </div>

      {/* ISSUE POLICY DIRECTIVE MODAL */}
      {isDirectiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setIsDirectiveModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 text-left animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-black text-slate-900">
                    Issue State Policy Directive
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Cabinet Secretariat Regulatory Console
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsDirectiveModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {directiveSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-150 shadow-sm animate-bounce-slow">
                  <Check className="h-7 w-7 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Directive Issued Successfully!</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Broadcasting regulatory telemetry updates to all district collectors live.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleIssueDirective} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Directive Title / Policy Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Smart Drainage Desilting Mandate v3.1"
                    value={newDirectiveName}
                    onChange={(e) => setNewDirectiveName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Target Implementation Scope</label>
                  <select 
                    value={newDirectiveScope}
                    onChange={(e) => setNewDirectiveScope(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                  >
                    {['State-wide Corporations', 'Coastal Taluk Collectors', 'Primary Municipalities', 'Rural Taluk Panchayats'].map((sc) => (
                      <option key={sc} value={sc}>{sc}</option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[10px] text-blue-900 font-semibold leading-relaxed">
                  ℹ️ Policy directives published from this console are instantly deployed as legal operational templates. Respective District Collectors will receive automated alerts in their central commands.
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsDirectiveModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmittingDirective}
                    className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-black rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    {isSubmittingDirective ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      "Publish Directive"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* REVIEW STATE BUDGETS MODAL */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setIsBudgetModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 text-left flex flex-col max-h-[85vh] overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-black text-slate-900">
                    Review Municipal &amp; SWM Budgets
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Finance Ministry Allocation Hub
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsBudgetModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 flex-1 pr-1 pb-2">
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 font-semibold leading-relaxed">
                ℹ️ Review and authorize budget grants submitted by municipal corporations and district collectorates for infrastructure upgrades, flood resilience, and solid waste processing equipment.
              </div>

              <div className="space-y-3">
                {budgets.map((budget) => {
                  const isPending = budget.status.includes('Pending');
                  const isAuthorizing = authorizingBudgetId === budget.id;
                  return (
                    <div key={budget.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                      <div className="space-y-1 text-left flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100/50">{budget.id}</span>
                          <h4 className="text-xs font-bold text-slate-900">{budget.agency}</h4>
                        </div>
                        <p className="text-xs text-slate-700 font-semibold">{budget.purpose}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-slate-400 font-mono font-semibold">Requested:</span>
                          <strong className="text-xs text-slate-900 font-mono font-black">{budget.amount}</strong>
                        </div>
                      </div>

                      <div className="shrink-0 w-full sm:w-auto">
                        {isPending ? (
                          <button
                            onClick={() => handleApproveBudget(budget.id)}
                            disabled={authorizingBudgetId !== null}
                            className="w-full sm:w-auto px-4 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {isAuthorizing ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Clearing...
                              </>
                            ) : (
                              "Authorize Grant"
                            )}
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                            <Check className="h-3 w-3 text-emerald-600" />
                            Approved &amp; Dispatched
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end shrink-0">
              <button 
                onClick={() => setIsBudgetModalOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-colors"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OPEN COLLECTORATES PERFORMANCE AUDITOR MODAL */}
      {isAuditorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setIsAuditorModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 text-left flex flex-col max-h-[85vh] overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Sliders className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-black text-slate-900">
                    Collectorates Performance Auditor
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Ministry Smart-Governance Audit Desk
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAuditorModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 flex-1 pr-1 pb-2">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-900 font-semibold leading-relaxed">
                🛡️ Access real-time citizen-SLA logs, cross-agency deadlocks, and public rating metrics of districts to enforce state governance benchmarks.
              </div>

              {/* Action Button */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">State-wide Administrative Scan</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Run compliance audit matching live district data with SLA benchmarks.</p>
                </div>
                <button
                  onClick={handleRunAudit}
                  disabled={isAuditing}
                  className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-black rounded-xl transition-all shadow-sm flex items-center gap-2 mx-auto cursor-pointer"
                >
                  {isAuditing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Scanning District Databases...
                    </>
                  ) : (
                    "Run Real-time Audit Scan"
                  )}
                </button>
              </div>

              {/* Audit Results */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Collectorate Audit Standings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {districts.map((dist) => {
                    const hasScore = auditScores[dist.name];
                    return (
                      <div key={dist.name} className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between h-28">
                        <div>
                          <div className="flex justify-between items-start">
                            <span className="text-xs font-black text-slate-900">{dist.name}</span>
                            <span className="text-[10px] font-bold text-slate-400 font-mono">Rank #{dist.ranking}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold block mt-1">SLA Level: {dist.score}%</span>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          {hasScore ? (
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                              {hasScore}
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-slate-400 animate-pulse">Audit pending...</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end shrink-0">
              <button 
                onClick={() => setIsAuditorModalOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-colors"
              >
                Dismiss Auditor
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

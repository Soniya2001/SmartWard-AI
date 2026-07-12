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
  Activity, ShieldAlert, Sliders, Map, Clock, Loader2, Check
} from 'lucide-react';
import { useAuthority } from '../../../contexts/AuthorityContext';

interface CollectorDashboardProps {
  kpis: any;
  onActionTrigger: (actionName: string) => void;
  activeSubTab?: string;
}

export const CollectorDashboard: React.FC<CollectorDashboardProps> = ({ kpis, onActionTrigger, activeSubTab }) => {
  const { chartData } = useAuthority();
  // Municipalities comparisons
  const [municipalities, setMunicipalities] = React.useState<any[]>(() => {
    const saved = localStorage.getItem('smartward_collector_municipalities');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { name: 'Madurai Corporation', score: 92, status: 'Compliant', tickets: 1245, color: 'text-emerald-600', bg: 'bg-emerald-50' },
      { name: 'Usilampatti Municipality', score: 84, status: 'Warning', tickets: 218, color: 'text-amber-600', bg: 'bg-amber-50' },
      { name: 'Melur Town Panchayat', score: 79, status: 'Lagging', tickets: 184, color: 'text-rose-600', bg: 'bg-rose-50' }
    ];
  });

  // Critical cross-agency deadlock list
  const [criticalIssues, setCriticalIssues] = React.useState<any[]>(() => {
    const saved = localStorage.getItem('smartward_collector_critical_issues');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'CRIT-101', title: 'PWD Highway Debris backlog', agency: 'National Highways vs Corporation PWD', impact: 'Melur Road Gridlock', duration: '18 hrs delay', priority: 'Severe' },
      { id: 'CRIT-104', title: 'Pollution Control Board Clearance', agency: 'TNPCB vs Water Supply Board', impact: 'Vaigai Filter Bed operational halt', duration: '36 hrs delay', priority: 'High' }
    ];
  });

  const [reRouteApproved, setReRouteApproved] = React.useState<boolean>(() => {
    return localStorage.getItem('smartward_collector_reroute_approved') === 'true';
  });
  const [isReRouting, setIsReRouting] = React.useState<boolean>(false);
  const [clearingIssueId, setClearingIssueId] = React.useState<string | null>(null);
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);

  // Force Dispatch state
  const [forceDispatchApproved, setForceDispatchApproved] = React.useState<boolean>(() => {
    return localStorage.getItem('smartward_collector_force_dispatch_approved') === 'true';
  });
  const [isForceDispatching, setIsForceDispatching] = React.useState<boolean>(false);

  // Map segments showing collectorate jurisdiction sectors
  const districtSectors = [
    { id: 'sec-a', name: 'Madurai North Taluk', level: 'High', color: 'bg-rose-500', pct: 88 },
    { 
      id: 'sec-b', 
      name: 'Melur Taluk Block', 
      level: forceDispatchApproved ? 'Stable' : 'High', 
      color: forceDispatchApproved ? 'bg-emerald-500' : 'bg-rose-500', 
      pct: forceDispatchApproved ? 94 : 79 
    },
    { id: 'sec-c', name: 'Usilampatti Sector', level: 'Moderate', color: 'bg-amber-500', pct: 84 },
    { id: 'sec-d', name: 'Vadipatti Block', level: 'Stable', color: 'bg-emerald-500', pct: 93 },
    { id: 'sec-e', name: 'Thirumangalam Block', level: 'Stable', color: 'bg-emerald-500', pct: 95 }
  ];

  if (activeSubTab === 'analytics') {
    return (
      <div className="space-y-6 text-left" id="collector-analytics-view">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>District Magistrate Analytics &amp; SWM</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              District Performance Analytics
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl">
              Cross-taluk comparative index tracking district-wide SLA efficiency and departmental response velocities.
            </p>
          </div>
        </div>

        {alertMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center justify-between shadow-sm animate-scale-in">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-650 shrink-0" />
              {alertMessage}
            </span>
            <button onClick={() => setAlertMessage(null)} className="text-emerald-500 hover:text-emerald-700 font-black cursor-pointer px-1">✕</button>
          </div>
        )}

        {/* AI Intelligence Briefing Panel */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 z-10 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 font-mono tracking-wide uppercase">
              <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" />
              District Administrative AI Audit
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              Melur Block Revenue &amp; Water Conflict
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              {forceDispatchApproved ? (
                <>
                  <span className="text-emerald-800 font-bold">Force Dispatch Order Active!</span> Melur Town Panchayat clean water supply pipeline bottleneck has been successfully bypassed and resolved under direct magistrate override.
                </>
              ) : (
                <>
                  Melur Town Panchayat reports a 19-hour bottleneck in resolving inter-departmental clean water pipelines. <strong className="text-emerald-950 font-bold">Recommended action:</strong> Authorize a District Magistracy Force Dispatch order to override municipal boundaries and resolve the clean water supply bottleneck.
                </>
              )}
            </p>
          </div>
          {forceDispatchApproved ? (
            <div className="shrink-0 px-4 py-2 bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm">
              <Check className="h-4 w-4 text-emerald-600" /> Force Dispatch Active
            </div>
          ) : (
            <button 
              onClick={() => {
                setIsForceDispatching(true);
                onActionTrigger("Authorize Force Dispatch");
                setTimeout(() => {
                  setIsForceDispatching(false);
                  setForceDispatchApproved(true);
                  localStorage.setItem('smartward_collector_force_dispatch_approved', 'true');
                  setAlertMessage("Magistracy Force Dispatch order successfully authorized! Melur clean water supply bottleneck has been bypassed.");
                  setTimeout(() => setAlertMessage(null), 4000);
                }, 1500);
              }}
              disabled={isForceDispatching}
              className="shrink-0 z-10 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isForceDispatching ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                  Dispatching...
                </>
              ) : (
                "Authorize Force Dispatch"
              )}
            </button>
          )}
        </div>

        {/* First Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Taluk-wise Compliance Index</h3>
                <p className="text-xs text-slate-400 mt-0.5">SLA fulfillment rating per district administrative sector.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100/10">Bar Chart</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={districtSectors} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                  <Bar dataKey="pct" name="SLA Met %" fill="#059669" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">District Category Share</h3>
                  <p className="text-xs text-slate-400 mt-0.5">District-wide grievance category distribution.</p>
                </div>
                <span className="text-[10px] font-bold font-mono text-teal-600 px-2 py-0.5 bg-teal-50 rounded border border-teal-100/10">Pie Chart</span>
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
              Infrastructure highway restoration and sewer clearing maintain the largest district shares.
            </div>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">District Registration Trends</h3>
                <p className="text-xs text-slate-400 mt-0.5">Historical incoming vs resolved ticket patterns.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100/10">Line Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="filed" name="Filed" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">District SLA Met Rate Efficiency</h3>
                <p className="text-xs text-slate-400 mt-0.5">Average weekly compliance rating across all blocks.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-teal-600 px-2 py-0.5 bg-teal-50 rounded border border-teal-100/10">Area Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.resolutionRate} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRateColl" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="rate" name="SLA Met Rate %" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRateColl)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" id="collector-dashboard-root">
      
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Landmark className="h-3.5 w-3.5" />
              <span>District Magistrate Console</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              District Collector Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl">
              District administration and grievance audit terminal. Monitor sub-collector reports, compare rural panchayats, track cross-agency gridlocks, and execute AI budget routing.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onActionTrigger("Compare Municipalities")}
              className="px-4 py-2 bg-white text-emerald-950 text-xs font-bold rounded-xl shadow hover:bg-emerald-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5" /> Compare Municipalities
            </button>
            <button 
              onClick={() => onActionTrigger("Review Critical Issues")}
              className="px-4 py-2 bg-emerald-800 text-white border border-emerald-700 text-xs font-bold rounded-xl shadow hover:bg-emerald-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldAlert className="h-3.5 w-3.5" /> Review Critical Issues
            </button>
          </div>
        </div>
      </div>

      {alertMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold flex items-center justify-between shadow-sm animate-scale-in">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-emerald-650 shrink-0" />
            {alertMessage}
          </span>
          <button onClick={() => setAlertMessage(null)} className="text-emerald-500 hover:text-emerald-700 font-black cursor-pointer px-1">✕</button>
        </div>
      )}

      {/* KPI GRID FOR COLLECTOR */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "District Aggregate", value: "1,647 Tickets", desc: "Across 3 municipalities", icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: "SLA Resolution Speed", value: kpis.avgSla || "2.1 Days", desc: "District average SLA", icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: "Sovereign Compliance Rate", value: "94.8% SLA MET", desc: "Rank #3 in State board", icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "Critical Cross-Desk Alerts", value: "2 Severe Bottlenecks", desc: "Inter-agency gridlocks", icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' }
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

      {/* CORE WORKSPACE: Municipal Comparison & AI Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Municipal Comparisons */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <div className="flex items-center gap-1.5">
              <Layers className="h-4.5 w-4.5 text-emerald-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Sub-Collectorate SLA Audit</h3>
            </div>
            <span className="text-[9px] font-mono font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-200">Municipal Index</span>
          </div>

          <div className="space-y-4">
            {municipalities.map((muni) => (
              <div key={muni.name} className="p-3.5 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-all border border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">{muni.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Live tickets queue: <strong className="text-slate-600 font-mono">{muni.tickets} active</strong>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${muni.bg} ${muni.color}`}>
                    {muni.status}
                  </span>
                  <span className="text-sm font-black text-slate-800 font-display">{muni.score}% Resolved</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: AI Strategic Recommendation Panel */}
        <div className="lg:col-span-6 bg-gradient-to-r from-teal-50 to-emerald-50 border border-emerald-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-200/50">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-emerald-600 animate-pulse" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Sovereign Strategic Recommendations</h3>
              </div>
              <span className="text-[9px] font-bold font-mono text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-200/20">Active Policy Directive</span>
            </div>

            <h4 className="text-sm font-bold text-slate-800">Melur Panchayat Machine Allocation Backlog</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Solid waste disposal fleet in <strong className="text-emerald-900">Melur Town Panchayat</strong> is experiencing an 18-hour delay on core shifts due to an mechanical backlog on compactors.
            </p>
            
            <div className="p-3.5 bg-white/75 border border-emerald-200/50 rounded-xl space-y-1.5 text-[11px] text-slate-500 font-medium">
              <span className="font-bold text-emerald-900 block">Sovereign Model Recommended Mitigation:</span>
              <span>Re-route <strong className="text-emerald-900">2 standby compactor vehicles</strong> from Madurai Corporation (Anna Nagar Depo) to Melur limits for a 36-hour interim shift to restore local compliance levels.</span>
            </div>
          </div>

          {reRouteApproved ? (
            <div className="w-full mt-4 p-3 bg-emerald-700 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-scale-in">
              <Check className="h-4 w-4 text-white" /> COMPACTORS RE-ROUTED TO MELUR (ACTIVE)
            </div>
          ) : (
            <button 
              onClick={() => {
                setIsReRouting(true);
                onActionTrigger("Approve Compactor Re-route to Melur");
                setTimeout(() => {
                  setIsReRouting(false);
                  setReRouteApproved(true);
                  localStorage.setItem('smartward_collector_reroute_approved', 'true');
                  
                  // Update Melur's stats
                  setMunicipalities(prev => {
                    const next = prev.map(m => {
                      if (m.name === 'Melur Town Panchayat') {
                        return {
                          ...m,
                          score: 88,
                          status: 'Compliant',
                          tickets: 124,
                          color: 'text-emerald-600',
                          bg: 'bg-emerald-50'
                        };
                      }
                      return m;
                    });
                    localStorage.setItem('smartward_collector_municipalities', JSON.stringify(next));
                    return next;
                  });

                  setAlertMessage("Interim fleet re-routing successfully deployed to Melur Town Panchayat limits!");
                  setTimeout(() => setAlertMessage(null), 4000);
                }, 1500);
              }}
              disabled={isReRouting}
              className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:scale-[1.01] transition-all text-center uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isReRouting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Broadcasting GPS Dispatch...
                </>
              ) : (
                "Approve & Execute Vehicle Re-Route"
              )}
            </button>
          )}
        </div>

      </div>

      {/* LOWER ROW: District Heatmap and Critical inter-agency issues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* District Taluk List Heatmap */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <div className="flex items-center gap-1.5">
              <Map className="h-4.5 w-4.5 text-emerald-600" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Taluk-Level Severity Map</h3>
            </div>
            <span className="text-[9px] font-mono font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded">GIS Coordinates</span>
          </div>

          <div className="space-y-3">
            {districtSectors.map((sector) => (
              <div key={sector.id} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${sector.color}`} />
                  <span className="text-slate-700">{sector.name}</span>
                </div>
                <div className="flex items-center gap-2.5 font-mono">
                  <span className="text-slate-400">{sector.pct}% SLA compliant</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    sector.level === 'High' ? 'bg-rose-50 text-rose-700' : sector.level === 'Moderate' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {sector.level} load
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Inter-agency issues */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Inter-Agency Boundary Grievances</h3>
            </div>
            <span className="text-[9px] font-bold font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">Collector Resolution Required</span>
          </div>

          <div className="divide-y divide-slate-100">
            {criticalIssues.length === 0 ? (
              <div className="py-8 text-center text-slate-400 font-bold text-xs space-y-2">
                <div className="h-10 w-10 bg-emerald-50 text-emerald-650 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                  <Check className="h-5 w-5" />
                </div>
                <p>All active inter-agency deadlocks have been successfully cleared!</p>
              </div>
            ) : (
              criticalIssues.map((issue) => (
                <div key={issue.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/50">{issue.id}</span>
                      <h4 className="text-xs font-bold text-slate-800">{issue.title}</h4>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Conflict desk: <strong className="text-slate-600">{issue.agency}</strong> • Impact: <strong className="text-slate-600">{issue.impact}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-semibold sm:self-center">
                    <span className="text-[10px] text-slate-400 font-mono">{issue.duration}</span>
                    <button 
                      onClick={() => {
                        setClearingIssueId(issue.id);
                        onActionTrigger(`Inter-agency arbitrator dispatch: ${issue.id}`);
                        setTimeout(() => {
                          setCriticalIssues(prev => {
                            const next = prev.filter(i => i.id !== issue.id);
                            localStorage.setItem('smartward_collector_critical_issues', JSON.stringify(next));
                            return next;
                          });
                          setClearingIssueId(null);
                          setAlertMessage(`Inter-agency roadblock ${issue.id} has been force cleared under magistrate authorization!`);
                          setTimeout(() => setAlertMessage(null), 4000);
                        }, 1200);
                      }}
                      disabled={clearingIssueId !== null}
                      className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {clearingIssueId === issue.id ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin text-rose-650" />
                          Clearing...
                        </>
                      ) : (
                        "Force Clear"
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

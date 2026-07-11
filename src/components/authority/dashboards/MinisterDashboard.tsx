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
  ShieldAlert, Sliders, Map, Shield
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
  const districts = [
    { name: 'Madurai District', score: 94.8, satisfaction: 4.6, ranking: 1, tickets: 1647, trend: '+2.4%' },
    { name: 'Chennai Metropolitan', score: 91.2, satisfaction: 4.4, ranking: 2, tickets: 4851, trend: '+1.1%' },
    { name: 'Coimbatore District', score: 88.5, satisfaction: 4.2, ranking: 3, tickets: 2145, trend: '-0.8%' },
    { name: 'Salem District', score: 86.4, satisfaction: 4.0, ranking: 4, tickets: 1124, trend: '+0.5%' }
  ];

  const policyDirectives = [
    { code: 'DIR-2026-A1', name: 'Solid Waste Management (SWM) SOP Protocol v2.0', date: 'Jul 04, 2026', scope: 'State-wide Corporations', status: 'Deployed' },
    { code: 'DIR-2026-B4', name: 'Monsoon Infrastructure Pothole Recovery Grant', date: 'Jul 08, 2026', scope: 'Coastal Taluk Collectors', status: 'Pending Approval' }
  ];

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
          <button 
            onClick={() => onActionTrigger("Approve Coimbatore-Salem Expansion")}
            className="shrink-0 z-10 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            Approve Coimbatore-Salem Expansion
          </button>
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
              Ministerial governance and public policy console. Review state district leaderboards, issue regulatory directives, authorize municipal budgets, and audit collectorate performance.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onActionTrigger("Issue Policy Directive")}
              className="px-4 py-2 bg-white text-blue-950 text-xs font-bold rounded-xl shadow hover:bg-blue-50 transition-all flex items-center gap-1.5"
            >
              <Shield className="h-3.5 w-3.5" /> Issue Policy Directive
            </button>
            <button 
              onClick={() => onActionTrigger("Review State Budgets")}
              className="px-4 py-2 bg-blue-800 text-white border border-blue-700 text-xs font-bold rounded-xl shadow hover:bg-blue-700 transition-all flex items-center gap-1.5"
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
            onClick={() => onActionTrigger("Audit Collectorates")}
            className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 transition-colors text-center"
          >
            Open Collectorates Performance Auditor
          </button>
        </div>

      </div>

    </div>
  );
};

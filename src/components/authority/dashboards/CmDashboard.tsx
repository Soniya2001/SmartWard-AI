import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { 
  Building2, Landmark, DollarSign, Users, Award, FileText, 
  MapPin, CheckCircle2, AlertCircle, RefreshCw, Star, 
  ArrowUpRight, Sparkles, Download, Layers, Calendar,
  ShieldAlert, Sliders, Map, Activity
} from 'lucide-react';
import { useAuthority } from '../../../contexts/AuthorityContext';

interface CmDashboardProps {
  kpis: any;
  onActionTrigger: (actionName: string) => void;
  activeSubTab?: string;
}

export const CmDashboard: React.FC<CmDashboardProps> = ({ kpis, onActionTrigger, activeSubTab }) => {
  const { chartData } = useAuthority();
  const [selectedMapDistrict, setSelectedMapDistrict] = useState<string>('Madurai Collectorate');

  // SVG representation of Tamil Nadu districts mockup
  const stateDistricts = [
    { id: 'dist-1', name: 'Chennai Metropolitan', path: 'M 140 10 L 220 10 L 190 70 L 120 60 Z', compliance: 91.2, rank: '#2', satisfaction: 4.4, color: '#3B82F6' },
    { id: 'dist-2', name: 'Madurai Collectorate', path: 'M 60 110 L 140 100 L 110 180 L 40 160 Z', compliance: 94.8, rank: '#1', satisfaction: 4.6, color: '#10B981' },
    { id: 'dist-3', name: 'Coimbatore Division', path: 'M 10 50 L 90 40 L 70 120 L 10 110 Z', compliance: 88.5, rank: '#3', satisfaction: 4.2, color: '#3B82F6' },
    { id: 'dist-4', name: 'Salem Regional Node', path: 'M 90 40 L 160 30 L 140 100 L 70 120 Z', compliance: 86.4, rank: '#4', satisfaction: 4.0, color: '#F59E0B' }
  ];

  const districtRankings = [
    { rank: '#1', name: 'Madurai District', score: 94.8, satisfaction: 4.6, color: 'text-emerald-600' },
    { rank: '#2', name: 'Chennai Metropolitan', score: 91.2, satisfaction: 4.4, color: 'text-blue-600' },
    { rank: '#3', name: 'Coimbatore District', score: 88.5, satisfaction: 4.2, color: 'text-slate-600' },
    { rank: '#4', name: 'Salem District', score: 86.4, satisfaction: 4.0, color: 'text-slate-500' }
  ];

  const currentDistrictData = stateDistricts.find(d => d.name === selectedMapDistrict);

  if (activeSubTab === 'analytics') {
    return (
      <div className="space-y-6 text-left" id="cm-analytics-view">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sovereign Executive Command Room</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              State-wide District Rankings
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium max-w-xl">
              Real-time monitoring console ranking Tamil Nadu district compliance metrics, citizen satisfaction ratios, and sovereign SLA indexes.
            </p>
          </div>
        </div>

        {/* AI Intelligence Briefing Panel */}
        <div className="bg-gradient-to-r from-indigo-50 to-slate-100 p-5 rounded-2xl border border-indigo-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 z-10 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 font-mono tracking-wide uppercase">
              <Sparkles className="h-4 w-4 text-indigo-600 animate-pulse" />
              Apex AI Command Intelligence
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              State Executive Governance Directive
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              The Vaigai Filter Bed restoration in Madurai is 95% complete, raising Madurai District to the #1 ranking. <strong className="text-indigo-950 font-bold">Recommended action:</strong> Convene the State Executive Council to formally ratify the vaigai clean water project and allocate the state bonus development grant to the Madurai Municipal Corporation.
            </p>
          </div>
          <button 
            onClick={() => onActionTrigger("Convene Council & Ratify")}
            className="shrink-0 z-10 px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            Convene Council &amp; Ratify
          </button>
        </div>

        {/* First Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">District SLA Rankings</h3>
                <p className="text-xs text-slate-400 mt-0.5">District-wide compliance ranking indexes compared state-wide.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded border border-indigo-100/10">Bar Chart</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stateDistricts} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                  <Bar dataKey="compliance" name="Compliance Rate %" fill="#4338CA" radius={[4, 4, 0, 0]}>
                    {stateDistricts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">State-wide SLA Distribution</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Sovereign category breakdown across all districts.</p>
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
              All metrics compile end-to-end with the Chief Minister's State Governance Directives.
            </div>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Historical Command Registry</h3>
                <p className="text-xs text-slate-400 mt-0.5">Monthly state-wide registry volume trends.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded border border-indigo-100/10">Line Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="filed" name="Filed" stroke="#4F46E5" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Sovereign Performance Index</h3>
                <p className="text-xs text-slate-400 mt-0.5">Average weekly state SLA compliance index rating.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100/10">Area Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.resolutionRate} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRateCm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="rate" name="SLA Met Rate %" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRateCm)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" id="cm-dashboard-root">
      
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Award className="h-3.5 w-3.5" />
              <span>Apex Command • Executive Governance</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Executive Command Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium max-w-xl">
              Tamil Nadu state-wide administrative terminal. Monitor district ranking rosters, audit citizen rating satisfaction indexes, inspect high-priority alerts, and export executive reports.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onActionTrigger("View State Analytics")}
              className="px-4 py-2 bg-white text-indigo-950 text-xs font-bold rounded-xl shadow hover:bg-indigo-50 transition-all flex items-center gap-1.5"
            >
              <Activity className="h-3.5 w-3.5" /> View State Analytics
            </button>
            <button 
              onClick={() => onActionTrigger("Export Executive Report")}
              className="px-4 py-2 bg-indigo-800 text-white border border-indigo-700 text-xs font-bold rounded-xl shadow hover:bg-indigo-700 transition-all flex items-center gap-1.5"
            >
              <Download className="h-3.5 w-3.5" /> Export Executive Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI GRID FOR CM */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "State Complaints", value: "14,842 Tickets", desc: "Consolidated state queue", icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: "State Resolution", value: "91.8% Solved", desc: "Audit compliant response", icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "Citizen Satisfaction", value: "4.3 / 5.0", desc: "SMS verified feedback rate", icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: "District Rankings", value: "Madurai #1", desc: "Compliance Leaderboard", icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: "AI Governance Index", value: "98.2%", desc: "Apex command audit score", icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50', pulse: true }
        ].map((k, idx) => {
          const Icon = k.icon;
          return (
            <div key={idx} className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">{k.label}</span>
                <div className={`p-1.5 rounded-lg ${k.bg} ${k.color}`}>
                  <Icon className={`h-4.5 w-4.5 ${k.pulse ? 'animate-pulse' : ''}`} />
                </div>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 mt-3 tracking-tight">
                {k.value}
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">{k.desc}</p>
            </div>
          );
        })}
      </div>

      {/* APEX WORKSPACE: Interactive Map & District Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Tamil Nadu Districts Map Mockup */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-4">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4 text-indigo-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Tamil Nadu District GIS Map</h3>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-100 font-mono">STATE COMMAND</span>
            </div>
            
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-4">
              Click on different geographical nodes of Tamil Nadu to audit active regional compliance metrics and satisfaction scores directly.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 240 200" className="w-full max-h-[170px] drop-shadow-md">
                {stateDistricts.map((dist) => {
                  const isSelected = selectedMapDistrict === dist.name;
                  return (
                    <path
                      key={dist.id}
                      d={dist.path}
                      fill={dist.color}
                      fillOpacity={isSelected ? 0.75 : 0.3}
                      stroke={isSelected ? '#312E81' : dist.color}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all duration-300 cursor-pointer hover:fill-opacity-50"
                      onClick={() => setSelectedMapDistrict(dist.name)}
                    />
                  );
                })}
              </svg>

              <div className="absolute top-2 right-2 bg-indigo-950 text-white text-[9px] font-mono font-bold px-2 py-1 rounded shadow-md">
                📍 CHENNAI-SECRETARIAT
              </div>
            </div>
          </div>

          {currentDistrictData && (
            <div className="mt-4 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>District Jurisdiction:</span>
                <span className="text-indigo-900">{currentDistrictData.name}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Compliance Level:</span>
                <strong className="font-mono text-indigo-900">{currentDistrictData.compliance}% SLA Met</strong>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>SMS Voter Polls:</span>
                <span className="font-mono font-bold text-indigo-900">
                  ★ {currentDistrictData.satisfaction} / 5.0
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Sovereign Leaderboard:</span>
                <span className="font-mono font-bold text-emerald-600">Ranked {currentDistrictData.rank} State-wide</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: District Rankings & AI Strategic Insights */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          
          {/* District Rankings Leaderboard */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <div className="flex items-center gap-1.5">
                <Layers className="h-4.5 w-4.5 text-indigo-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Top Performing Districts</h3>
              </div>
              <span className="text-[9px] font-mono font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-200">State SLA Ranking</span>
            </div>

            <div className="space-y-2.5">
              {districtRankings.map((dist) => (
                <div key={dist.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/50 transition-all border border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/40">{dist.rank}</span>
                    <span className="font-display text-xs font-bold text-slate-800">{dist.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-semibold text-xs">
                    <span className={`font-bold ${dist.color}`}>{dist.score}% Compliant</span>
                    <span className="text-slate-400">•</span>
                    <div className="flex items-center gap-1 text-amber-500 font-mono">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <span>{dist.satisfaction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic AI Insights */}
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-200/50">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold font-mono text-indigo-600 uppercase tracking-widest block">AI Executive Command Recommendation</span>
              <h4 className="text-xs font-bold text-slate-900">Coimbatore District SLA Warning</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Coimbatore District exhibits a <strong className="text-indigo-900">0.8% decrease</strong> in weekly solid waste collection speeds. Recommended: Instruct Minister of Urban Development to release state reserve contingency credits for Coimbatore.
              </p>
              <div className="pt-1.5 flex gap-3">
                <button 
                  onClick={() => onActionTrigger("Issue Ministerial Warning")}
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  Send Cabinet Directive <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

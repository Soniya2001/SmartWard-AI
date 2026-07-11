import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { 
  Building2, Landmark, DollarSign, Users, Award, FileText, 
  MapPin, CheckCircle2, AlertCircle, RefreshCw, Star, 
  ArrowUpRight, Sparkles, Download, Layers, Calendar
} from 'lucide-react';

import { useAuthority } from '../../../contexts/AuthorityContext';

interface MlaDashboardProps {
  kpis: any;
  onActionTrigger: (actionName: string) => void;
  activeSubTab?: string;
}

export const MlaDashboard: React.FC<MlaDashboardProps> = ({ kpis, onActionTrigger, activeSubTab }) => {
  const { chartData } = useAuthority();
  const [selectedWardFilter, setSelectedWardFilter] = useState<string>('All Wards');

  // MLA Constituency Data: Wards comparisons in Madurai North
  const wardComparisonData = [
    { name: 'Ward 38', complaints: 85, resolution: 92, satisfaction: 4.4, color: '#3B82F6' },
    { name: 'Ward 39', complaints: 110, resolution: 88, satisfaction: 4.1, color: '#3B82F6' },
    { name: 'Ward 40', complaints: 95, resolution: 91, satisfaction: 4.2, color: '#3B82F6' },
    { name: 'Ward 41', complaints: 140, resolution: 81, satisfaction: 3.8, color: '#EF4444' },
    { name: 'Ward 42', complaints: 64, resolution: 96, satisfaction: 4.6, color: '#10B981' },
    { name: 'Ward 43', complaints: 125, resolution: 86, satisfaction: 4.0, color: '#3B82F6' },
    { name: 'Ward 44', complaints: 75, resolution: 94, satisfaction: 4.5, color: '#10B981' }
  ];

  const categoryBreakdown = [
    { name: 'Road Repairs', value: 245, color: '#3B82F6' },
    { name: 'Water Grid', value: 180, color: '#0EA5E9' },
    { name: 'Solid Waste SWM', value: 155, color: '#F59E0B' },
    { name: 'Electricity/Streetlights', value: 120, color: '#EF4444' },
    { name: 'Sewage/Drainage', value: 94, color: '#10B981' }
  ];

  const monthlyTrendData = [
    { month: 'Jan', complaints: 480, resolved: 410 },
    { month: 'Feb', complaints: 520, resolved: 460 },
    { month: 'Mar', complaints: 590, resolved: 510 },
    { month: 'Apr', complaints: 630, resolved: 540 },
    { month: 'May', complaints: 510, resolved: 470 },
    { month: 'Jun', complaints: 690, resolved: 610 },
    { month: 'Jul', complaints: 742, resolved: 654 }
  ];

  const activeCdfProjects = [
    { id: 'CDF-2026-09', title: 'Mini-Water Purifier Bed installation', ward: 'Ward 42', allocation: '₹45,000,000', status: 'In Progress (80%)', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'CDF-2026-11', title: 'Road Widening Corridor & Drainage Overlay', ward: 'Ward 41', allocation: '₹12,000,000', status: 'Approved (PWD review)', color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'CDF-2026-14', title: 'Transformer Hub Upgrade and Streetlight poles', ward: 'Ward 39', allocation: '₹8,500,000', status: 'Completed', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  if (activeSubTab === 'analytics') {
    return (
      <div className="space-y-6 text-left" id="mla-analytics-view">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Constituency Analytics &amp; Performance</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Constituency Analytics
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-xl">
              Compare ward metrics, track SLA performance indices, and allocate constituency funds with precision.
            </p>
          </div>
        </div>

        {/* AI Intelligence Briefing Panel */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 z-10 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 font-mono tracking-wide uppercase">
              <Sparkles className="h-4 w-4 text-amber-600 animate-pulse" />
              AI Constituency audit
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              Ward 41 Performance Alert
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Ward 41 exhibits an SLA compliance dip of 12% in water logistics and road restoration. <strong className="text-amber-950 font-bold">Recommended action:</strong> Reallocate ₹2.5M from the unassigned CDF reserve to support immediate pipeline repairs and drainage clearance in Ward 41.
            </p>
          </div>
          <button 
            onClick={() => onActionTrigger("Reallocate CDF Reserve")}
            className="shrink-0 z-10 px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            Reallocate CDF Reserve
          </button>
        </div>

        {/* First Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ward-wise Grievance Volume</h3>
                <p className="text-xs text-slate-400 mt-0.5">Comparing total complaint volumes across Madurai North wards.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-amber-600 px-2 py-0.5 bg-amber-50 rounded border border-amber-100/10">Bar Chart</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wardComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                  <Bar dataKey="complaints" name="Complaints" fill="#D97706" radius={[4, 4, 0, 0]}>
                    {wardComparisonData.map((entry, index) => (
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
                  <h3 className="text-sm font-bold text-slate-900">Grievance Breakdown by Sector</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Constituency-level volume distribution.</p>
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
              Water board pipeline maintenance continues to represent the largest category share.
            </div>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Historical Registration Trend</h3>
                <p className="text-xs text-slate-400 mt-0.5">Monthly incoming vs resolved ticket patterns.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-amber-600 px-2 py-0.5 bg-amber-50 rounded border border-amber-100/10">Line Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="filed" name="Filed" stroke="#D97706" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">SLA Response Speed Efficiency</h3>
                <p className="text-xs text-slate-400 mt-0.5">Average compliance speed on closed issues.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100/10">Area Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.resolutionRate} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRateMla" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="rate" name="SLA Met Rate %" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRateMla)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" id="mla-dashboard-root">
      
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-amber-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Landmark className="h-3.5 w-3.5" />
              <span>Legislative Assembly Representative</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Madurai North Constituency Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-xl">
              Constituency analytics & development grants portal. Review ward performance benchmarks, allocate CDF budgets, and audit citizen satisfaction indices.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onActionTrigger("Allocate CDF Funds")}
              className="px-4 py-2 bg-white text-amber-950 text-xs font-bold rounded-xl shadow hover:bg-amber-50 transition-all flex items-center gap-1.5"
            >
              <DollarSign className="h-3.5 w-3.5" /> Allocate CDF Funds
            </button>
            <button 
              onClick={() => onActionTrigger("Compare Wards")}
              className="px-4 py-2 bg-amber-800 text-white border border-amber-700 text-xs font-bold rounded-xl shadow hover:bg-amber-700 transition-all flex items-center gap-1.5"
            >
              <Layers className="h-3.5 w-3.5" /> Compare Wards
            </button>
          </div>
        </div>
      </div>

      {/* KPI GRID FOR MLA */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Active Complaints", value: "742 Tickets", desc: "Constituency-wide inflow", icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: "SLA Resolution Rate", value: "88.7% Met", desc: "Average across 15 wards", icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "Citizen Satisfaction", value: "4.2 / 5.0", desc: "SMS verified feedback rating", icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: "Wards Monitored", value: "15 Wards", desc: "Madurai Corporation North limits", icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' }
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

      {/* ANALYTICS CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CHART 1: Ward-by-Ward Comparison */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Ward-by-Ward Resolution Compliance</h3>
              </div>
              <span className="text-[9px] font-bold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">High resolution: Ward 42</span>
            </div>

            <p className="text-[11px] text-slate-400 font-medium mb-4">
              This chart highlights active grievance volumes versus average resolution SLA compliance across municipal wards in Madurai North.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wardComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                  <Bar dataKey="complaints" name="Active Tickets" fill="#F59E0B" radius={[4, 4, 0, 0]}>
                    {wardComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200/50 rounded-xl text-[10px] text-slate-500 font-semibold leading-relaxed">
            💡 <strong className="text-slate-700">Audit Insight:</strong> Ward 41 exhibits a lagging SLA (81% resolved). Recommended to dispatch a dedicated taskforce using the &ldquo;Compare Wards&rdquo; action sheet.
          </div>
        </div>

        {/* CHART 2: Category Analysis */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Constituency Category Load</h3>
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-400">Total: 794 Issues</span>
            </div>

            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              {categoryBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-mono text-slate-400">{item.value} issues</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* LOWER ROW: Monthly Trends & CDF Grants */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Monthly Trend line graph */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Monthly Grievance Filing Trends</h3>
            <span className="text-[9px] font-bold font-mono text-amber-600 bg-amber-50 px-2 py-0.5 rounded">6 Month Index</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="complaints" name="Filed Grievances" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="resolved" name="SLA Resolved" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CDF Projects Allocations */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">CDF (Constituency Development Fund) Allocations</h3>
            <span className="text-[9px] font-bold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active Grants</span>
          </div>

          <div className="divide-y divide-slate-100">
            {activeCdfProjects.map((proj) => (
              <div key={proj.id} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
                <div className={`p-2 rounded-xl ${proj.bg} ${proj.color} shrink-0 mt-0.5`}>
                  <DollarSign className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-0.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-bold text-slate-400">{proj.id} • {proj.ward}</span>
                    <strong className="text-slate-900 font-bold">{proj.allocation}</strong>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">{proj.title}</h4>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Release Status:</span>
                    <span className="font-bold text-teal-600 font-mono">{proj.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => onActionTrigger("CDF Budget Planner")}
            className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-bold rounded-xl border border-amber-200 transition-colors text-center"
          >
            Open CDF Budget Planner Workspace
          </button>
        </div>

      </div>

    </div>
  );
};

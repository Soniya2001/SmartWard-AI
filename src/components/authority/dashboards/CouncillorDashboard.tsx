import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, LineChart, Line, AreaChart, Area, Legend
} from 'recharts';
import { 
  MapPin, AlertCircle, Sparkles, CheckCircle2, Clock, ThumbsUp, 
  Map as MapIcon, Send, Eye, ShieldAlert, Award, ArrowUpRight,
  TrendingUp, RefreshCw, Star, Info, ListFilter, Download
} from 'lucide-react';
import { EscalationDialog } from '../EscalationDialog';
import { useAuthority } from '../../../contexts/AuthorityContext';

interface CouncillorDashboardProps {
  kpis: any;
  onActionTrigger: (actionName: string) => void;
  activeSubTab?: string;
}

export const CouncillorDashboard: React.FC<CouncillorDashboardProps> = ({ kpis, onActionTrigger, activeSubTab }) => {
  const { chartData } = useAuthority();
  const [selectedMapSector, setSelectedMapSector] = useState<string>('Anna Nagar Central');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [isEscalateOpen, setIsEscalateOpen] = useState(false);

  // SVG representation of Ward 42 sectors
  const wardSectors = [
    { id: 'sec-1', name: 'Anna Nagar Central', path: 'M 20 20 L 120 20 L 100 120 L 20 100 Z', complaints: 8, severity: 'critical', color: '#EF4444' },
    { id: 'sec-2', name: 'Gomathipuram Extension', path: 'M 120 20 L 220 30 L 200 130 L 100 120 Z', complaints: 3, severity: 'stable', color: '#10B981' },
    { id: 'sec-3', name: 'Melur Road Corridor', path: 'M 20 100 L 100 120 L 80 220 L 10 200 Z', complaints: 12, severity: 'warning', color: '#F59E0B' },
    { id: 'sec-4', name: 'KK Nagar Enclave', path: 'M 100 120 L 200 130 L 180 230 L 80 220 Z', complaints: 5, severity: 'stable', color: '#10B981' }
  ];

  const complaintsGrouped = [
    { category: 'Roads', total: 14, pending: 3, resolved: 11, pct: 78, icon: '🛣️' },
    { category: 'Water', total: 18, pending: 2, resolved: 16, pct: 88, icon: '🚰' },
    { category: 'Garbage', total: 24, pending: 8, resolved: 16, pct: 66, icon: '🗑️' },
    { category: 'Streetlight', total: 11, pending: 3, resolved: 8, pct: 72, icon: '💡' },
    { category: 'Drainage', total: 15, pending: 4, resolved: 11, pct: 73, icon: ' Sewer' }
  ];

  const departmentStatus = [
    { name: 'Road Department', resolvedPct: 85, color: '#3B82F6', tickets: 24 },
    { name: 'Water Board', resolvedPct: 90, color: '#0EA5E9', tickets: 30 },
    { name: 'Electrical Division', resolvedPct: 72, color: '#F59E0B', tickets: 18 }
  ];

  const escalations = [
    { id: 'ESC-402', title: 'Major Sewer overflow on KK Nagar Road', sector: 'KK Nagar Enclave', duration: 'Overdue by 4.5 hrs', priority: 'Critical', reporter: 'Ward 42 Association' },
    { id: 'ESC-408', title: 'Drinking water pipeline contamination', sector: 'Melur Road Corridor', duration: 'Overdue by 2 hrs', priority: 'High', reporter: 'Resident Senthil' }
  ];

  const ratingDistribution = [
    { stars: 5, count: 72, pct: 65, color: 'bg-emerald-500' },
    { stars: 4, count: 24, pct: 21, color: 'bg-teal-500' },
    { stars: 3, count: 9, pct: 8, color: 'bg-amber-400' },
    { stars: 2, count: 4, pct: 4, color: 'bg-orange-400' },
    { stars: 1, count: 2, pct: 2, color: 'bg-rose-500' }
  ];

  const currentSectorData = wardSectors.find(s => s.name === selectedMapSector);

  if (activeSubTab === 'analytics') {
    return (
      <div className="space-y-6 text-left" id="councillor-analytics-view">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Spatial Analytics &amp; GIS</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Ward 42 Spatial Analytics
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 font-medium max-w-xl">
              Live spatial correlation indexing showing Ward 42 regional grievance densities and predictive AI hazard maps.
            </p>
          </div>
        </div>

        {/* AI Intelligence Briefing Panel */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-2xl border border-teal-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 z-10 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 font-mono tracking-wide uppercase">
              <Sparkles className="h-4 w-4 text-teal-600 animate-pulse" />
              Predictive Intelligence Engine Active
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              Weekly Ward 42 Risk Assessment
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Predictive telemetry scans local drainage pipelines and road friction metrics to forecast stormwater risks. High likelihood of stormwater congestion detected near Melur Road bypass limits.
            </p>
          </div>
          <button 
            onClick={() => onActionTrigger("Enforce Precautionary SOP")}
            className="shrink-0 z-10 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
          >
            Enforce Precautionary SOP
          </button>
        </div>

        {/* First Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Complaint Categories Distribution</h3>
                <p className="text-xs text-slate-400 mt-0.5">Frequency of incoming Ward 42 civic complaints.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-teal-600 px-2 py-0.5 bg-teal-50 rounded border border-teal-100/10">Bar Chart</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.categories} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                  <Bar dataKey="value" name="Volume" fill="#0D9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Resolution Proportions</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Ratio of active and closed Ward 42 actions.</p>
                </div>
                <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100/10">Pie Chart</span>
              </div>

              <div className="flex items-center justify-around h-48">
                <div className="h-44 w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData.status}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {chartData.status.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 text-[11px] font-bold text-slate-600">
                  {chartData.status.map((entry: any) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span>{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[10px] leading-relaxed text-slate-500 font-medium mt-4">
              Auditing records comply end-to-end with Ward 42 SLA standards.
            </div>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Monthly Registration Trend</h3>
                <p className="text-xs text-slate-400 mt-0.5">Historical overview of registered vs resolved tickets.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-teal-600 px-2 py-0.5 bg-teal-50 rounded border border-teal-100/10">Line Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="filed" name="Filed" stroke="#0D9488" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">SLA Response Speed Efficiency</h3>
                <p className="text-xs text-slate-400 mt-0.5">Average weekly rating of speed and quality closures.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-emerald-100/10">Area Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.resolutionRate} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRateWard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="rate" name="SLA Met Rate %" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRateWard)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" id="councillor-dashboard-root">
      
      {/* SECTION HEADER: Ward Councillor Dashboard */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Award className="h-3.5 w-3.5" />
              <span>Ward Councillor Console</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Ward 42 • Madurai Corporation
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 font-medium max-w-xl">
              Local representative console for Ward 42. Monitor ward complaints, direct departments, escalations and manage citizen ratings.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onActionTrigger("View Complaints")}
              className="px-4 py-2 bg-white text-teal-950 text-xs font-bold rounded-xl shadow hover:bg-teal-50 transition-all flex items-center gap-1.5"
            >
              <Eye className="h-3.5 w-3.5" /> View Complaints
            </button>
            <button 
              onClick={() => setIsEscalateOpen(true)}
              className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl shadow hover:bg-rose-700 transition-all flex items-center gap-1.5"
            >
              <ShieldAlert className="h-3.5 w-3.5" /> Escalate Issue
            </button>
            <button 
              onClick={() => onActionTrigger("Download Report")}
              className="px-3 py-2 bg-teal-800 text-teal-100 border border-teal-700 hover:bg-teal-700 text-xs font-bold rounded-xl transition-all"
              title="Download Report"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI GRID FOR COUNCILLOR */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Today's Complaints", value: kpis.today, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: "Pending Issues", value: kpis.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: "Resolved", value: kpis.resolved, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "Critical Priority", value: kpis.critical, icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50', pulse: true },
          { label: "Resolution SLA", value: kpis.avgSla || "1.8 Days", icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: "Citizen Rating", value: kpis.satisfaction || "4.6/5.0", icon: Star, color: 'text-amber-500', bg: 'bg-amber-50/50' }
        ].map((k, idx) => {
          const Icon = k.icon;
          return (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">{k.label}</span>
                <div className={`p-1.5 rounded-lg ${k.bg} ${k.color}`}>
                  <Icon className={`h-4 w-4 ${k.pulse ? 'animate-pulse' : ''}`} />
                </div>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 mt-2 tracking-tight">
                {k.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* CORE COUNCILLOR WORKSPACE: Map & Grouped Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Interactive Ward 42 Map (SVG) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-4">
              <div className="flex items-center gap-2">
                <MapIcon className="h-4 w-4 text-teal-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Interactive Ward 42 GIS Map</h3>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-teal-50 text-teal-700 rounded border border-teal-100">Live Telemetry</span>
            </div>
            
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-4">
              Click on different geographical sectors of Ward 42 to drill down into active maintenance requests and regional severity metrics.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 240 250" className="w-full max-h-[180px] drop-shadow-md">
                {wardSectors.map((sector) => {
                  const isSelected = selectedMapSector === sector.name;
                  return (
                    <path
                      key={sector.id}
                      d={sector.path}
                      fill={sector.color}
                      fillOpacity={isSelected ? 0.75 : 0.3}
                      stroke={isSelected ? '#0F766E' : sector.color}
                      strokeWidth={isSelected ? 3 : 1.5}
                      className="transition-all duration-300 cursor-pointer hover:fill-opacity-50"
                      onClick={() => setSelectedMapSector(sector.name)}
                    />
                  );
                })}
              </svg>

              {/* District locator pin */}
              <div className="absolute top-2 right-2 bg-teal-900 text-white text-[9px] font-mono font-bold px-2 py-1 rounded shadow-md">
                📍 MADURAI-CORP-42
              </div>
            </div>
          </div>

          {currentSectorData && (
            <div className="mt-4 p-3 bg-teal-50/50 border border-teal-100 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Selected Sector:</span>
                <span className="text-teal-900">{currentSectorData.name}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Active Grievances:</span>
                <strong className="font-mono text-teal-900">{currentSectorData.complaints} Tickets</strong>
              </div>
              <div className="flex justify-between text-[11px] text-slate-600">
                <span>Status Outlook:</span>
                <span className={`font-mono font-bold capitalize ${
                  currentSectorData.severity === 'critical' ? 'text-rose-600' : currentSectorData.severity === 'warning' ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  ● {currentSectorData.severity} load
                </span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Grouped Complaints Metrics */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-4">
              <div className="flex items-center gap-2">
                <ListFilter className="h-4 w-4 text-teal-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Complaints Breakdown by Core Sector</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-slate-400">5 Active Categories</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {complaintsGrouped.map((item) => (
                <div 
                  key={item.category}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-teal-100 hover:bg-teal-50/20 transition-all space-y-2 text-left"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="text-base">{item.icon}</span>
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                      {item.pct}% SLA
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 font-mono text-[10px] text-center">
                    <div className="bg-slate-50 p-1.5 rounded">
                      <span className="text-slate-400 block">Total</span>
                      <strong className="text-slate-800 text-xs">{item.total}</strong>
                    </div>
                    <div className="bg-amber-50 p-1.5 rounded">
                      <span className="text-amber-500 block">Pending</span>
                      <strong className="text-amber-600 text-xs">{item.pending}</strong>
                    </div>
                    <div className="bg-emerald-50 p-1.5 rounded">
                      <span className="text-emerald-500 block">Solved</span>
                      <strong className="text-emerald-600 text-xs">{item.resolved}</strong>
                    </div>
                  </div>

                  {/* Visual Progress bar */}
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-3 text-xs">
            <Info className="h-4.5 w-4.5 text-teal-600 shrink-0" />
            <p className="text-[11px] text-slate-500 font-medium">
              Click on &ldquo;View Complaints&rdquo; in the top bar to inspect individual tickets, assign squad leads, or write citizen updates.
            </p>
          </div>
        </div>

      </div>

      {/* LOWER GRID: Department Status, AI Insights, Escalations, ratings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Middle: Department Status & AI Card */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Department Status Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Department SLA Index</h3>
              <span className="text-[9px] font-bold font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">Ward 42 Supervisors</span>
            </div>

            <div className="space-y-4">
              {departmentStatus.map((dept) => (
                <div key={dept.name} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">{dept.name}</span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-slate-400">({dept.tickets} active tickets)</span>
                      <strong className="text-slate-900 font-bold">{dept.resolvedPct}% Resolved</strong>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ backgroundColor: dept.color, width: `${dept.resolvedPct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-200/50">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-bold font-mono text-indigo-600 uppercase tracking-widest block">AI Sovereign Governance Insight</span>
              <h4 className="text-xs font-bold text-slate-900">Ward 42 Debris Accumulation Spike Detected</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Ward 42 has increasing garbage complaints (up 18% weekly) centering around Melur Road Corridor. <strong className="text-indigo-900 font-bold">Recommend additional cleaning dispatch and positioning an extra 1.5-ton compactor truck</strong> on secondary shifts.
              </p>
              <div className="pt-1">
                <button 
                  onClick={() => onActionTrigger("Allocate extra cleaning")} 
                  className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  Approve Cleaning Recommendation <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Escalations Feed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <div className="flex items-center gap-1.5">
                <AlertCircle className="h-4.5 w-4.5 text-rose-500 animate-pulse" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Unresolved Critical Escalations</h3>
              </div>
              <span className="text-[9px] font-bold font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">SLA Breached</span>
            </div>

            <div className="divide-y divide-slate-100">
              {escalations.map((esc) => (
                <div key={esc.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 first:pt-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200/50">{esc.id}</span>
                      <h4 className="text-xs font-bold text-slate-800">{esc.title}</h4>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Sector: <strong className="text-slate-700">{esc.sector}</strong> • Filed by: <strong className="text-slate-700">{esc.reporter}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:self-center font-semibold">
                    <span className="text-[10px] text-slate-400 font-mono">{esc.duration}</span>
                    <button 
                      onClick={() => onActionTrigger(`SLA Force Dispatch: ${esc.id}`)}
                      className="px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      Force Dispatch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Citizen Ratings Distribution */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-150 mb-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Citizen Service Ratings</h3>
              <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded">Score: 4.6/5.0</span>
            </div>

            <div className="flex items-center gap-3 py-2">
              <div className="text-center bg-amber-50 border border-amber-200/40 p-4 rounded-2xl w-24">
                <strong className="text-3xl font-black text-amber-600 font-display">4.6</strong>
                <div className="flex items-center justify-center gap-0.5 mt-1">
                  {[1, 2, 3, 4].map(n => <Star key={n} className="h-3 w-3 fill-amber-500 text-amber-500" />)}
                  <Star className="h-3 w-3 text-amber-500" />
                </div>
                <span className="text-[9px] text-slate-400 font-mono block mt-1.5">111 Voters</span>
              </div>

              <div className="flex-1 space-y-1.5">
                {ratingDistribution.map((row) => (
                  <div key={row.stars} className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
                    <span className="w-3 text-right">{row.stars}</span>
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <div className="flex-grow h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="w-8 text-right text-slate-400 font-mono">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal font-medium mt-4 pt-4 border-t border-slate-100">
              Ward 42 holds the highest resident score in Madurai North due to garbage truck punctuality. Clean water leaks remain the largest negative scoring factor.
            </p>
          </div>

          <button 
            onClick={() => onActionTrigger("Publish Feedback Analytics")}
            className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors text-center"
          >
            Review Citizen Comments Inbox
          </button>
        </div>

      </div>

      <EscalationDialog isOpen={isEscalateOpen} onClose={() => setIsEscalateOpen(false)} />

    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { 
  Building2, Landmark, DollarSign, Users, Award, FileText, 
  MapPin, CheckCircle2, AlertCircle, RefreshCw, Star, 
  ArrowUpRight, Sparkles, Download, Layers, Calendar,
  Truck, ShieldAlert, Sliders, Map, X, Check, Loader2, Plus, Navigation
} from 'lucide-react';
import { useAuthority } from '../../../contexts/AuthorityContext';

interface CommissionerDashboardProps {
  kpis: any;
  onActionTrigger: (actionName: string) => void;
  activeSubTab?: string;
}

export const CommissionerDashboard: React.FC<CommissionerDashboardProps> = ({ kpis, onActionTrigger, activeSubTab }) => {
  const { chartData } = useAuthority();
  const [selectedDept, setSelectedDept] = useState<string>('Sanitation & SWM');
  const [allocatedTrucks, setAllocatedTrucks] = useState<{ [key: string]: number }>(() => {
    const saved = localStorage.getItem('smartward_allocated_trucks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      'Ward 1': 6,
      'Ward 2': 4,
      'Ward 3': 3,
      'Ward 42': 8,
      'Ward 12': 5
    };
  });

  const handleAdjustResource = (ward: string, delta: number) => {
    setAllocatedTrucks(prev => {
      const current = prev[ward] || 0;
      const next = Math.max(1, current + delta);
      const updated = { ...prev, [ward]: next };
      localStorage.setItem('smartward_allocated_trucks', JSON.stringify(updated));
      return updated;
    });
  };

  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);

  // Allocate Resource Form State
  const [allocWard, setAllocWard] = useState<string>('Ward 3');
  const [allocType, setAllocType] = useState<string>('Compactor Truck');
  const [allocQty, setAllocQty] = useState<number>(1);
  const [allocSuccess, setAllocSuccess] = useState<boolean>(false);
  const [allocError, setAllocError] = useState<string>('');

  // GPS Fleet State
  const [gpsTrucks, setGpsTrucks] = useState<any[]>(() => {
    const saved = localStorage.getItem('smartward_gps_trucks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'TN-58-Y-2810', ward: 'Ward 42', driver: 'M. Saravanan', status: 'En Route', load: 85, speed: 32, type: 'Compactor Truck' },
      { id: 'TN-58-W-9812', ward: 'Ward 3', driver: 'K. Ganesan', status: 'Collecting', load: 45, speed: 12, type: 'Compactor Truck' },
      { id: 'TN-58-Q-4156', ward: 'Ward 1', driver: 'S. Maruthu', status: 'Stationary', load: 92, speed: 0, type: 'Dewatering Rig' },
      { id: 'TN-58-Z-0034', ward: 'Ward 12', driver: 'R. Rajesh', status: 'En Route', load: 15, speed: 40, type: 'Sewer Desilting' },
      { id: 'TN-58-A-1122', ward: 'Ward 2', driver: 'P. Kumar', status: 'Collecting', load: 60, speed: 15, type: 'Vacuum Sweeper' }
    ];
  });

  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null);
  const [rerouteWard, setRerouteWard] = useState<string>('Ward 42');
  const [gpsSuccess, setGpsSuccess] = useState<boolean>(false);

  const handleDeployResources = (e: React.FormEvent) => {
    e.preventDefault();
    if (allocQty <= 0) {
      setAllocError('Please enter a valid quantity');
      return;
    }
    
    setAllocatedTrucks(prev => {
      const current = prev[allocWard] || 0;
      const updated = {
        ...prev,
        [allocWard]: current + allocQty
      };
      localStorage.setItem('smartward_allocated_trucks', JSON.stringify(updated));
      return updated;
    });

    setAllocSuccess(true);
    setAllocError('');

    setTimeout(() => {
      setAllocSuccess(false);
      setIsAllocateModalOpen(false);
    }, 1500);
  };

  const handleRerouteTruck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTruckId) return;

    const truck = gpsTrucks.find(t => t.id === selectedTruckId);
    if (!truck) return;

    const oldWard = truck.ward;
    const updatedTrucks = gpsTrucks.map(t => {
      if (t.id === selectedTruckId) {
        return { ...t, ward: rerouteWard, status: 'Re-routing' };
      }
      return t;
    });

    setGpsTrucks(updatedTrucks);
    localStorage.setItem('smartward_gps_trucks', JSON.stringify(updatedTrucks));

    // Update allocatedTrucks state
    setAllocatedTrucks(prev => {
      const next = { ...prev };
      if (oldWard && next[oldWard]) {
        next[oldWard] = Math.max(0, next[oldWard] - 1);
      }
      next[rerouteWard] = (next[rerouteWard] || 0) + 1;
      localStorage.setItem('smartward_allocated_trucks', JSON.stringify(next));
      return next;
    });

    setGpsSuccess(true);
    setTimeout(() => {
      setGpsSuccess(false);
      setSelectedTruckId(null);
    }, 1500);
  };

  // Ward rankings across the Corporation
  const wardRankings = [
    { name: 'Ward 42', rating: 96, count: 64, color: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { name: 'Ward 1', rating: 95, count: 85, color: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { name: 'Ward 12', rating: 91, count: 54, color: 'text-blue-600', badge: 'bg-blue-50 text-blue-800 border-blue-200' },
    { name: 'Ward 2', rating: 88, count: 110, color: 'text-amber-600', badge: 'bg-amber-50 text-amber-800 border-amber-200' },
    { name: 'Ward 3', rating: 78, count: 95, color: 'text-rose-600', badge: 'bg-rose-50 text-rose-800 border-rose-200' }
  ];

  const departmentPerformance = [
    { name: 'Solid Waste SWM', score: 94, color: '#10B981', trucks: 14, staff: 240 },
    { name: 'Water & Sewerage', score: 91, color: '#3B82F6', trucks: 8, staff: 180 },
    { name: 'Electrical Division', score: 85, color: '#F59E0B', trucks: 4, staff: 110 },
    { name: 'PWD Engineering Roads', score: 72, color: '#EF4444', trucks: 12, staff: 320 }
  ];

  // Map spots (Heatmap grid coordinates representing hot areas of Madurai)
  const heatmapSpots = [
    { zone: 'North Central Market', severity: 'Critical', activeIssues: 42, color: 'bg-rose-500' },
    { zone: 'Bypass Highway Transit', severity: 'Warning', activeIssues: 28, color: 'bg-amber-500' },
    { zone: 'Gomathipuram Sewage Node', severity: 'Warning', activeIssues: 24, color: 'bg-amber-500' },
    { zone: 'Anna Nagar Institutional Area', severity: 'Stable', activeIssues: 11, color: 'bg-emerald-500' },
    { zone: 'KK Nagar Residential', severity: 'Stable', activeIssues: 8, color: 'bg-emerald-500' }
  ];

  if (activeSubTab === 'analytics') {
    return (
      <div className="space-y-6 text-left" id="commissioner-analytics-view">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Corporation Spatial GIS &amp; Analytics</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Corporation Analytics
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-xl">
              Cross-departmental spatial KPI audit, resource optimization tracking, and SLA resolution velocity indices.
            </p>
          </div>
        </div>

        {/* AI Intelligence Briefing Panel */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-2xl border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 z-10 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 font-mono tracking-wide uppercase">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              AI Corporation Optimizer
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              Solid Waste SWM Resource Bottleneck
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              North Central Market exhibits a 34% trash piling spike over the weekend. <strong className="text-blue-950 font-bold">Recommended action:</strong> Shift 2 compaction trucks from Anna Nagar (stable) to North Central Market for immediate weekend clearance.
            </p>
          </div>
          <button 
            onClick={() => {
              setAllocWard('Ward 3');
              setAllocType('Compactor Truck');
              setAllocQty(2);
              setIsAllocateModalOpen(true);
            }}
            className="shrink-0 z-10 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
          >
            Optimize Truck Allocation
          </button>
        </div>

        {/* First Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Department Performance Scores</h3>
                <p className="text-xs text-slate-400 mt-0.5">SLA achievement score per corporate division.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-blue-600 px-2 py-0.5 bg-blue-50 rounded border border-blue-100/10">Bar Chart</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                  <Bar dataKey="score" name="Performance Score" fill="#2563EB" radius={[4, 4, 0, 0]}>
                    {departmentPerformance.map((entry, index) => (
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
                  <h3 className="text-sm font-bold text-slate-900">Grievance Distribution</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Ratio of incoming grievances categorized by sector.</p>
                </div>
                <span className="text-[10px] font-bold font-mono text-cyan-600 px-2 py-0.5 bg-cyan-50 rounded border border-cyan-100/10">Pie Chart</span>
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
              All data compiles dynamically with regional supervisor logs and dispatch metrics.
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
                  <Line type="monotone" dataKey="filed" name="Filed" stroke="#2563EB" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">SLA Response Speed Efficiency</h3>
                <p className="text-xs text-slate-400 mt-0.5">Average weekly compliance rating across all wards.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-cyan-600 px-2 py-0.5 bg-cyan-50 rounded border border-cyan-100/10">Area Chart</span>
            </div>

            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData.resolutionRate} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRateComm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
                  <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="rate" name="SLA Met Rate %" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRateComm)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" id="commissioner-dashboard-root">
      
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-purple-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Building2 className="h-3.5 w-3.5" />
              <span>Corporation Chief Secretariat</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Madurai Municipal Corporation Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 font-medium max-w-xl">
              Entire Corporation administration terminal. Compare ward response indices, distribute vehicle fleets, track solid waste GPS trucks, and audit department heads.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsAllocateModalOpen(true)}
              className="px-4 py-2 bg-white text-purple-950 text-xs font-bold rounded-xl shadow hover:bg-purple-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sliders className="h-3.5 w-3.5" /> Allocate Resources
            </button>
            <button 
              onClick={() => setIsGpsModalOpen(true)}
              className="px-4 py-2 bg-purple-800 text-white border border-purple-700 text-xs font-bold rounded-xl shadow hover:bg-purple-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Truck className="h-3.5 w-3.5" /> GPS Truck Dispatch
            </button>
          </div>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Corporation Inflow", value: "1,245 Tickets", desc: "Consolidated city-wide active", icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: "SWM Dispatch Fleet", value: "14/14 Trucks", desc: "GPS confirmed on roads", icon: Truck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "SLA Speed Rating", value: "92.5% Compliant", desc: "Sovereign Target: 95.0%", icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: "Critical Heat Spots", value: "8 Active Areas", desc: "Requires immediate squad", icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' }
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

      {/* CORE WORKSPACE: Ward Comparison & Resource Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Ward Rankings & Heatmap */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Ward Comparison Table */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <div className="flex items-center gap-1.5">
                <Layers className="h-4.5 w-4.5 text-purple-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Ward Resolution Leadboard</h3>
              </div>
              <span className="text-[9px] font-mono font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-200">Comparative SLA</span>
            </div>

            <div className="space-y-3">
              {wardRankings.map((ward) => (
                <div key={ward.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/50 transition-all border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-sm font-bold text-slate-900">{ward.name}</span>
                    <span className="text-[10px] text-slate-400">({ward.count} active)</span>
                  </div>
                  <div className="flex items-center gap-3 font-semibold">
                    <span className={`text-xs font-bold ${ward.color}`}>{ward.rating}% SLA</span>
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${ward.rating}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GIS Corporation Heatmap */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <div className="flex items-center gap-1.5">
                <Map className="h-4.5 w-4.5 text-purple-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Active Infrastructure Heatmap</h3>
              </div>
              <span className="text-[9px] font-mono font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Sector GPS Feed</span>
            </div>

            <div className="space-y-3.5">
              {heatmapSpots.map((spot, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-2.5 w-2.5 rounded-full ${spot.color}`} />
                    <span className="font-bold text-slate-700">{spot.zone}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-400">{spot.activeIssues} active</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      spot.severity === 'Critical' ? 'bg-rose-50 text-rose-700' : spot.severity === 'Warning' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {spot.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Resource Allocation Panel */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <div className="flex items-center gap-1.5">
                <Sliders className="h-4.5 w-4.5 text-purple-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Dynamic Fleet & Resource Allocation</h3>
              </div>
              <span className="text-[9px] font-bold font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">Active routing: 26 Vehicles</span>
            </div>

            <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
              Commissioner Oversight Panel: Re-route solid waste compactors, water tankers, or vacuum road sweepers across wards dynamically to meet rising complaints.
            </p>

            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-xs font-semibold text-indigo-800">
              🚨 <strong className="text-indigo-900 font-bold">Alert:</strong> Ward 3 is currently at 78% SLA with 95 complaints. Consider shifting compactor trucks from high-performing Ward 42.
            </div>

            <div className="space-y-4 pt-2">
              {Object.keys(allocatedTrucks).map((ward) => (
                <div key={ward} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800">{ward}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">SLA Rank: #{wardRankings.find(w => w.name === ward)?.rating || 85}% Resolved</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleAdjustResource(ward, -1)}
                      className="h-8 w-8 bg-white border border-slate-300 rounded-lg flex items-center justify-center font-bold hover:bg-slate-100 text-slate-600"
                    >
                      -
                    </button>
                    <div className="w-14 text-center font-mono text-xs">
                      <strong className="text-slate-900 text-sm block">{allocatedTrucks[ward]}</strong>
                      <span className="text-[9px] text-slate-400 block font-semibold">Trucks</span>
                    </div>
                    <button 
                      onClick={() => handleAdjustResource(ward, 1)}
                      className="h-8 w-8 bg-white border border-slate-300 rounded-lg flex items-center justify-center font-bold hover:bg-slate-100 text-slate-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              onActionTrigger(`Commit Fleet Redistribution: ${JSON.stringify(allocatedTrucks)}`);
            }}
            className="w-full mt-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md hover:scale-[1.01] transition-all text-center uppercase tracking-wider"
          >
            Deploy Updated Fleet Redistribution
          </button>
        </div>

      </div>

      {/* LOWER GRID: Department Performance Metrics */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-150">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4.5 w-4.5 text-purple-600" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Department Compliance Scorecard</h3>
          </div>
          <span className="text-[9px] font-mono font-bold bg-slate-50 text-slate-400 px-2 py-0.5 rounded border border-slate-200">4 Divisions Audited</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {departmentPerformance.map((dept) => (
            <div key={dept.name} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                  <span className="truncate pr-1">{dept.name}</span>
                  <span className="font-mono text-emerald-600">{dept.score}% Met</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                  <div className="h-full rounded-full" style={{ backgroundColor: dept.color, width: `${dept.score}%` }} />
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-100">
                <span>Vehicles: <strong>{dept.trucks}</strong></span>
                <span>Active Staff: <strong>{dept.staff}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALLOCATE RESOURCES MODAL */}
      {isAllocateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setIsAllocateModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 text-left animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Sliders className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-black text-slate-900">
                    Allocate SWM & Municipal Resources
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Commissioner Administrative Command
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAllocateModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {allocSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-150 shadow-sm animate-bounce-slow">
                  <Check className="h-7 w-7 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Resources Deployed Successfully!</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Deployed {allocQty}x {allocType} to {allocWard}. Operational registries updated.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDeployResources} className="space-y-4">
                {allocError && (
                  <div className="p-3 bg-red-50 border border-red-150 rounded-xl text-xs text-red-600 font-bold">
                    ⚠️ {allocError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Target Ward</label>
                    <select 
                      value={allocWard}
                      onChange={(e) => setAllocWard(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-bold text-slate-800"
                    >
                      {['Ward 1', 'Ward 2', 'Ward 3', 'Ward 12', 'Ward 38', 'Ward 39', 'Ward 40', 'Ward 41', 'Ward 42', 'Ward 43', 'Ward 44'].map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Resource / Equipment Type</label>
                    <select 
                      value={allocType}
                      onChange={(e) => setAllocType(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-bold text-slate-800"
                    >
                      {['Compactor Truck', 'Water Tanker', 'Sewer Desilting Machine', 'Vacuum Road Sweeper'].map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Deployment Quantity</label>
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    value={allocQty}
                    onChange={(e) => setAllocQty(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-mono font-black text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">
                    Note: Compactor Truck allocations will immediately affect the live fleet count on your central dashboard panel.
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAllocateModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-black rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Deploy Resources
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* GPS TRUCK DISPATCH & LIVE ROUTING MODAL */}
      {isGpsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setIsGpsModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 text-left flex flex-col max-h-[90vh] overflow-hidden animate-scale-in">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-black text-slate-900">
                    SWM GPS Fleet Command &amp; Re-routing
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Live Dispatch Terminal
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsGpsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Container */}
            <div className="overflow-y-auto space-y-4 flex-1 pr-1">
              
              <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-[11px] text-purple-900 font-semibold leading-relaxed">
                ℹ️ Select any active heavy vehicle compactor from the fleet below to broadcast emergency re-routing GPS coordinates. Re-routing will dynamically balance ward SWM resources.
              </div>

              {/* Trucks Grid */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Active Heavy Fleet Registry</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {gpsTrucks.map((truck) => {
                    const isSelected = selectedTruckId === truck.id;
                    return (
                      <div 
                        key={truck.id}
                        onClick={() => {
                          setSelectedTruckId(truck.id);
                          setRerouteWard(truck.ward);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all text-left cursor-pointer flex flex-col justify-between h-32 ${
                          isSelected 
                            ? 'border-purple-600 bg-purple-50/40 shadow-sm' 
                            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-black font-mono text-slate-900">{truck.id}</span>
                            <span className="text-[10px] text-slate-400 font-bold font-mono block mt-0.5">{truck.type}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full font-mono font-bold text-[9px] ${
                            truck.status === 'Stationary' ? 'bg-amber-50 text-amber-600' :
                            truck.status === 'Re-routing' ? 'bg-indigo-50 text-indigo-600' :
                            'bg-emerald-50 text-emerald-600'
                          }`}>
                            ● {truck.status}
                          </span>
                        </div>

                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                            <span>Assigned: <strong className="text-slate-800 font-bold">{truck.ward}</strong></span>
                            <span>Driver: <strong className="text-slate-800 font-bold">{truck.driver}</strong></span>
                          </div>

                          {/* Progress capacity */}
                          <div className="space-y-0.5">
                            <div className="flex justify-between text-[9px] font-mono text-slate-400">
                              <span>Load Factor</span>
                              <span>{truck.load}%</span>
                            </div>
                            <div className="w-full h-1 bg-slate-250 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-600 rounded-full" style={{ width: `${truck.load}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reroute Sub-Form if selected */}
              {selectedTruckId && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-800 uppercase font-mono">
                    <Navigation className="h-4 w-4 animate-pulse" /> Dispatch Re-routing Instructions for {selectedTruckId}
                  </div>

                  {gpsSuccess ? (
                    <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" /> Reroute Command Dispatched Live over Telemetry! Fleet updated.
                    </div>
                  ) : (
                    <form onSubmit={handleRerouteTruck} className="flex flex-col sm:flex-row items-end gap-3">
                      <div className="flex-1 space-y-1 w-full text-left">
                        <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Select Target Ward Target</label>
                        <select 
                          value={rerouteWard}
                          onChange={(e) => setRerouteWard(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-slate-250 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-bold text-slate-800"
                        >
                          {['Ward 1', 'Ward 2', 'Ward 3', 'Ward 12', 'Ward 38', 'Ward 39', 'Ward 40', 'Ward 41', 'Ward 42', 'Ward 43', 'Ward 44'].map((w) => (
                            <option key={w} value={w}>{w}</option>
                          ))}
                        </select>
                      </div>
                      <button 
                        type="submit"
                        className="py-2 px-5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm"
                      >
                        Transmit Route Command
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
              <button 
                onClick={() => setIsGpsModalOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all"
              >
                Close Fleet Console
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

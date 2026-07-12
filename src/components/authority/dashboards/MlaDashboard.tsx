import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { 
  Building2, Landmark, DollarSign, Users, Award, FileText, 
  MapPin, CheckCircle2, AlertCircle, RefreshCw, Star, 
  ArrowUpRight, Sparkles, Download, Layers, Calendar,
  X, Check, Plus, SlidersHorizontal, Percent
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

  const defaultCdfProjects = [
    { id: 'CDF-2026-09', title: 'Mini-Water Purifier Bed installation', ward: 'Ward 42', allocation: 45000000, status: 'In Progress (80%)', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'CDF-2026-11', title: 'Road Widening Corridor & Drainage Overlay', ward: 'Ward 41', allocation: 12000000, status: 'Approved (PWD review)', color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'CDF-2026-14', title: 'Transformer Hub Upgrade and Streetlight poles', ward: 'Ward 39', allocation: 8500000, status: 'Completed', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  const totalCdfBudget = 150000000; // ₹15,000,000 (15 Crore)

  const [cdfProjects, setCdfProjects] = useState<any[]>(() => {
    const saved = localStorage.getItem('smartward_cdf_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return defaultCdfProjects;
  });

  const [isBudgetPlannerOpen, setIsBudgetPlannerOpen] = useState(false);
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);

  // Form states for Allocate CDF Funds
  const [formWard, setFormWard] = useState('Ward 42');
  const [formSector, setFormSector] = useState('Water Grid & Sanitation');
  const [formAmount, setFormAmount] = useState('5000000');
  const [formTitle, setFormTitle] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Sector budget planner allocations state
  const [plannedSectorAllocations, setPlannedSectorAllocations] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('smartward_planned_sectors');
    return saved ? JSON.parse(saved) : {
      'Water Grid & Sanitation': 40000000,
      'Road Overhaul & Corridors': 30000000,
      'Solid Waste SWM Equipment': 20000000,
      'Renewable Streetlighting': 15000000,
      'Unallocated Reserve': 45000000
    };
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val).replace('INR', '₹');
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Please enter a project title');
      return;
    }
    const amt = parseFloat(formAmount);
    if (isNaN(amt) || amt <= 0) {
      setFormError('Please enter a valid allocation amount');
      return;
    }

    const currentAllocated = cdfProjects.reduce((acc, p) => acc + p.allocation, 0);
    const remaining = totalCdfBudget - currentAllocated;
    if (amt > remaining) {
      setFormError(`Insufficient CDF Reserve. Remaining is only ${formatCurrency(remaining)}`);
      return;
    }

    const newId = `CDF-2026-${Math.floor(15 + Math.random() * 85)}`;
    const newProj = {
      id: newId,
      title: formTitle,
      ward: formWard,
      allocation: amt,
      status: 'Approved (Planning Stage)',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    };

    const updated = [newProj, ...cdfProjects];
    setCdfProjects(updated);
    localStorage.setItem('smartward_cdf_projects', JSON.stringify(updated));

    setFormSuccess(true);
    setFormTitle('');
    setFormError('');
    
    setTimeout(() => {
      setFormSuccess(false);
      setIsAllocationModalOpen(false);
    }, 1500);
  };

  const handlePlannerSliderChange = (sector: string, val: number) => {
    const otherSectorsSum = Object.entries(plannedSectorAllocations)
      .filter(([name]) => name !== sector && name !== 'Unallocated Reserve')
      .reduce((acc, [_, value]) => acc + (value as number), 0);

    const remainingForReserve = totalCdfBudget - otherSectorsSum - val;
    if (remainingForReserve >= 0) {
      const updated = {
        ...plannedSectorAllocations,
        [sector]: val,
        'Unallocated Reserve': remainingForReserve
      };
      setPlannedSectorAllocations(updated);
      localStorage.setItem('smartward_planned_sectors', JSON.stringify(updated));
    }
  };

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

  const getWardAllocation = (wardName: string) => {
    return cdfProjects
      .filter((p) => p.ward === wardName)
      .reduce((acc, p) => acc + p.allocation, 0);
  };

  const totalAllocated = cdfProjects.reduce((acc, p) => acc + p.allocation, 0);
  const remainingReserve = totalCdfBudget - totalAllocated;
  const utilizationRate = (totalAllocated / totalCdfBudget) * 100;

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
              Constituency development grants, local ward operations & citizen SLA response tracking terminal.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => setIsAllocationModalOpen(true)}
              className="px-4 py-2 bg-white text-amber-950 text-xs font-bold rounded-xl shadow hover:bg-amber-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <DollarSign className="h-3.5 w-3.5" /> Allocate CDF Funds
            </button>
            <button 
              onClick={() => onActionTrigger("Compare Wards")}
              className="px-4 py-2 bg-amber-800 text-white border border-amber-700 text-xs font-bold rounded-xl shadow hover:bg-amber-700 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5" /> Compare Wards
            </button>
          </div>
        </div>
      </div>
      
      {/* AI ALERT BAR */}
      <div className="bg-gradient-to-r from-amber-500/10 to-transparent p-4 rounded-2xl border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm text-xs">
        <div className="flex gap-2 items-start">
          <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <span className="font-bold text-slate-800">SLA Discrepancy Actionable Intelligence:</span>
            <span className="text-slate-600 ml-1">Ward 41 requires stormwater pipeline reinforcements. Use the CDF budget planner workspace below or allocate a grant directly to address the lagging 81% SLA rating.</span>
          </div>
        </div>
      </div>

      {/* KPI GRID FOR MLA */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Active Complaints", value: "742 Tickets", desc: "Constituency-wide inflow", icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: "SLA Resolution Rate", value: "88.7% Met", desc: "Average across 15 wards", icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: "Citizen Satisfaction", value: "4.2 / 5.0", desc: "SMS verified feedback rating", icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: "Remaining CDF Reserve", value: formatCurrency(remainingReserve), desc: "Available for deployment", icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' }
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
              <h3 className="font-display text-base sm:text-lg font-black text-slate-900 mt-3 tracking-tight">
                {k.value}
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-1">{k.desc}</p>
            </div>
          );
        })}
      </div>

      {/* COMPARATIVE WARD OPERATION DIRECTORY */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Ward Performance & SLA Leaderboard</h3>
            <p className="text-xs text-slate-400 mt-0.5">Comparative operations directory of representing wards in Madurai North constituency.</p>
          </div>
          <span className="text-[10px] font-bold font-mono text-amber-700 bg-amber-50 border border-amber-100 px-2 py-1 rounded">
            SLA Threshold: 85% Compliance
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-mono font-bold uppercase border-b border-slate-100">
                <th className="py-3 px-1">Ward</th>
                <th className="py-3">Councillor</th>
                <th className="py-3 text-center">Active Tickets</th>
                <th className="py-3 text-center">SLA Compliance</th>
                <th className="py-3 text-center">Satisfaction</th>
                <th className="py-3 text-right">Allocated CDF</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {[
                { number: 'Ward 38', councillor: 'Thiru. M. Saravanan', complaints: 85, resolution: '92%', satisfaction: '4.4 / 5', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { number: 'Ward 39', councillor: 'Smt. P. Meenakshi', complaints: 110, resolution: '88%', satisfaction: '4.1 / 5', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { number: 'Ward 40', councillor: 'Thiru. R. Alagarsamy', complaints: 95, resolution: '91%', satisfaction: '4.2 / 5', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { number: 'Ward 41', councillor: 'Smt. K. Rajeshwari', complaints: 140, resolution: '81%', satisfaction: '3.8 / 5', color: 'text-red-600', bg: 'bg-red-50' },
                { number: 'Ward 42', councillor: 'Smt. S. Kavitha', complaints: 64, resolution: '96%', satisfaction: '4.6 / 5', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { number: 'Ward 43', councillor: 'Thiru. V. Ganesan', complaints: 125, resolution: '86%', satisfaction: '4.0 / 5', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { number: 'Ward 44', councillor: 'Smt. M. Chitra', complaints: 75, resolution: '94%', satisfaction: '4.5 / 5', color: 'text-emerald-600', bg: 'bg-emerald-50' }
              ].map((wd) => {
                const liveAllocation = getWardAllocation(wd.number);
                return (
                  <tr key={wd.number} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-1 font-mono text-slate-950 font-black">{wd.number}</td>
                    <td className="py-3.5">
                      <div className="flex flex-col">
                        <span>{wd.councillor}</span>
                        <span className="text-[10px] text-slate-400">Madurai Corporation</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-center font-mono text-slate-900">{wd.complaints}</td>
                    <td className="py-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${wd.color} ${wd.bg}`}>
                        {wd.resolution}
                      </span>
                    </td>
                    <td className="py-3.5 text-center font-mono text-slate-600">{wd.satisfaction}</td>
                    <td className="py-3.5 text-right font-mono font-black text-slate-900">
                      {liveAllocation > 0 ? formatCurrency(liveAllocation) : '—'}
                    </td>
                    <td className="py-3.5 text-right">
                      <button 
                        onClick={() => {
                          setFormWard(wd.number);
                          setIsAllocationModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-750 text-[10px] font-bold rounded-lg border border-amber-200 transition-colors cursor-pointer"
                      >
                        Grant CDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CDF ALLOCATIONS & ACTIVE GRANTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Active CDF Projects tracker */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-amber-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Active CDF Project Allocations</h3>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {cdfProjects.length} Approved Grants
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Track infrastructure development operations funded by the Constituency Development Fund reserve.
            </p>
          </div>

          <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-1">
            {cdfProjects.map((proj) => (
              <div key={proj.id} className="py-3.5 flex items-start gap-3 first:pt-0 last:pb-0">
                <div className={`p-2.5 rounded-xl ${proj.bg} ${proj.color} shrink-0 mt-0.5`}>
                  <DollarSign className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] font-bold text-slate-400">{proj.id} • {proj.ward}</span>
                    <strong className="text-slate-900 font-bold font-mono text-sm">{formatCurrency(proj.allocation)}</strong>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">{proj.title}</h4>
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Release Status:</span>
                    <span className="font-bold text-teal-600 font-mono">{proj.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button 
              onClick={() => setIsAllocationModalOpen(true)}
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-colors text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Issue A New Development Grant
            </button>
          </div>
        </div>

        {/* CDF Budget utilization scorecard */}
        <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4.5 w-4.5 text-amber-600" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">CDF Budget Quota Summary</h3>
              </div>
            </div>

            <div className="space-y-3.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Annual CDF Allocation Quota:</span>
                <span className="font-black text-slate-900 font-mono">{formatCurrency(totalCdfBudget)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Deployed Funds:</span>
                <span className="font-black text-slate-900 font-mono">{formatCurrency(totalAllocated)}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Remaining Reserve:</span>
                <span className="font-black text-amber-700 font-mono">{formatCurrency(remainingReserve)}</span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 uppercase">
                  <span>Quota Utilization Rate</span>
                  <span>{utilizationRate.toFixed(1)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-550"
                    style={{ width: `${utilizationRate}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/50 text-[11px] text-slate-500 font-semibold leading-relaxed">
              💡 <strong className="text-slate-700">Budget Constraint Checklist:</strong> Sector distribution plans must be approved locally before being routed to the State Planning Commission.
            </div>
          </div>

          <button 
            onClick={() => setIsBudgetPlannerOpen(true)}
            className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-black rounded-xl border border-amber-200 transition-colors text-center cursor-pointer shadow-sm"
          >
            Open CDF Budget Planner Workspace
          </button>
        </div>

      </div>

      {/* ALLOCATE CDF FUNDS MODAL */}
      {isAllocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setIsAllocationModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 text-left animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-black text-slate-900">
                    Allocate CDF Infrastructure Funds
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Madurai North MLA Workspace
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsAllocationModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {formSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-150 shadow-sm animate-bounce-slow">
                  <Check className="h-7 w-7 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Grant Allocated Successfully!</h4>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    The fund transfer of {formatCurrency(parseFloat(formAmount))} is logged. Remaining reserve is updated.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddProject} className="space-y-4">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-150 rounded-xl text-xs text-red-600 font-bold">
                    ⚠️ {formError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Target Ward</label>
                    <select 
                      value={formWard}
                      onChange={(e) => setFormWard(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-bold text-slate-800"
                    >
                      {['Ward 38', 'Ward 39', 'Ward 40', 'Ward 41', 'Ward 42', 'Ward 43', 'Ward 44'].map((w) => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Development Sector</label>
                    <select 
                      value={formSector}
                      onChange={(e) => setFormSector(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-bold text-slate-800"
                    >
                      {['Water Grid & Sanitation', 'Road Overhaul & Corridors', 'Solid Waste SWM Equipment', 'Renewable Streetlighting'].map((sec) => (
                        <option key={sec} value={sec}>{sec}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Project Title / Purpose</label>
                  <input 
                    type="text"
                    placeholder="e.g. Mini-Water Purifier Bed installation at bypass junction"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-bold text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Grant Allocation Amount (INR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
                    <input 
                      type="number"
                      placeholder="5000000"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all font-mono font-black text-slate-800"
                    />
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold mt-1">
                    Remaining CDF Reserve: <span className="font-mono text-amber-700 font-black">{formatCurrency(remainingReserve)}</span>
                  </p>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsAllocationModalOpen(false)}
                    className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-black rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Deploy Grant Funds
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CDF BUDGET PLANNER MODAL */}
      {isBudgetPlannerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
            onClick={() => setIsBudgetPlannerOpen(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 border border-slate-100 z-10 text-left animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-black text-slate-900">
                    Annual CDF Strategic Budget Planner
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Distribute Sector caps dynamically
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsBudgetPlannerOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[11px] text-slate-600 font-semibold leading-relaxed">
                Configure your preferred regional expenditure limits across major developmental vectors. The remaining <strong>Unallocated Reserve</strong> adapts automatically in real time.
              </div>

              {/* Sliders loop */}
              <div className="space-y-4">
                {[
                  { name: 'Water Grid & Sanitation', key: 'Water Grid & Sanitation', max: 80000000, color: 'accent-blue-600' },
                  { name: 'Road Overhaul & Corridors', key: 'Road Overhaul & Corridors', max: 70000000, color: 'accent-amber-600' },
                  { name: 'Solid Waste SWM Equipment', key: 'Solid Waste SWM Equipment', max: 50000000, color: 'accent-yellow-500' },
                  { name: 'Renewable Streetlighting', key: 'Renewable Streetlighting', max: 30000000, color: 'accent-emerald-600' }
                ].map((sec) => {
                  const val = plannedSectorAllocations[sec.key] || 0;
                  return (
                    <div key={sec.key} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">{sec.name}</span>
                        <span className="font-mono text-slate-950">{formatCurrency(val)}</span>
                      </div>
                      <div className="flex gap-4 items-center">
                        <input 
                          type="range"
                          min="0"
                          max={sec.max}
                          step="1000000"
                          value={val}
                          onChange={(e) => handlePlannerSliderChange(sec.key, parseInt(e.target.value))}
                          className={`flex-1 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer ${sec.color}`}
                        />
                        <span className="text-[10px] text-slate-400 font-mono w-10 text-right">
                          {((val / totalCdfBudget) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic reserve calculation */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="text-slate-500 font-semibold">Automatic Unallocated Reserve:</span>
                  <p className="text-[10px] text-slate-400 leading-none">Unassigned development budget cap</p>
                </div>
                <strong className="text-sm font-black font-mono text-indigo-600">
                  {formatCurrency(plannedSectorAllocations['Unallocated Reserve'] || 0)}
                </strong>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  onClick={() => {
                    // Reset to default
                    setPlannedSectorAllocations({
                      'Water Grid & Sanitation': 40000000,
                      'Road Overhaul & Corridors': 30000000,
                      'Solid Waste SWM Equipment': 20000000,
                      'Renewable Streetlighting': 15000000,
                      'Unallocated Reserve': 45000000
                    });
                    localStorage.removeItem('smartward_planned_sectors');
                  }}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
                >
                  Reset Defaults
                </button>
                <button 
                  onClick={() => setIsBudgetPlannerOpen(false)}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl transition-all shadow-sm cursor-pointer text-center"
                >
                  Save Strategy Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

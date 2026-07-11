import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  ShieldAlert, Sparkles, TrendingUp, CheckCircle2, Clock, Filter, Search,
  ThumbsUp, Share2, CornerRightDown, Map, Compass, Calendar, ArrowRight,
  Info, MessageSquareCode, BadgeAlert
} from 'lucide-react';
import { motion } from 'motion/react';
import { Complaint, ComplaintStatus, ComplaintPriority, ComplaintCategory } from '../types';

export const PublicDashboard: React.FC = () => {
  // Filter states
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [selectedYear, setSelectedYear] = useState('2026');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  // Category Quick Filter
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Available options
  const states = ['All States', 'Metropolitan Capital Region', 'Coastal Southern Province', 'Western Frontier State'];
  
  const districtsMap: Record<string, string[]> = {
    'All States': ['All Districts', 'Central Ward', 'Metro Zone 2', 'South Beach Area', 'Western Bypass'],
    'Metropolitan Capital Region': ['All Districts', 'Central Ward', 'Metro Zone 2'],
    'Coastal Southern Province': ['All Districts', 'South Beach Area', 'Port Division'],
    'Western Frontier State': ['All Districts', 'Western Bypass', 'Valley Sector']
  };

  const districts = districtsMap[selectedState] || ['All Districts'];

  const months = ['All Months', 'January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const years = ['2026', '2025'];

  // Base Recent complaints mock database
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 'SW-9821', issue: 'Main sewage backflow on bypass highway intersection', district: 'Central Ward', category: 'Drainage', status: 'Pending', priority: 'Critical', date: '2026-07-10', upvotes: 142 },
    { id: 'SW-9742', issue: 'Severe pothole crater posing high risk to motorcyclists', district: 'Western Bypass', category: 'Road', status: 'In Progress', priority: 'High', date: '2026-07-09', upvotes: 98 },
    { id: 'SW-9612', issue: 'Industrial garbage piles uncollected for over 6 consecutive days', district: 'Metro Zone 2', category: 'Garbage', status: 'Pending', priority: 'Medium', date: '2026-07-08', upvotes: 56 },
    { id: 'SW-9504', issue: 'Three phase transformer failure causing streetlight blackout', district: 'South Beach Area', category: 'Streetlight', status: 'Resolved', priority: 'High', date: '2026-07-07', upvotes: 112 },
    { id: 'SW-9481', issue: 'Municipal water pipe leakage with massive fresh water wasting', district: 'Valley Sector', category: 'Water', status: 'Resolved', priority: 'Medium', date: '2026-07-05', upvotes: 41 },
    { id: 'SW-9344', issue: 'Broken public sidewalk blocks causing elderly injuries', district: 'Central Ward', category: 'Road', status: 'In Progress', priority: 'Low', date: '2026-07-04', upvotes: 24 },
    { id: 'SW-9211', issue: 'Unregulated commercial construction noise during late hours', district: 'Metro Zone 2', category: 'Others', status: 'Closed', priority: 'Low', date: '2026-07-02', upvotes: 15 },
    { id: 'SW-9040', issue: 'Hazardous chemical runoff in public storm drain channels', district: 'Port Division', category: 'Drainage', status: 'Pending', priority: 'Critical', date: '2026-06-28', upvotes: 189 },
  ]);

  // Handle upvoting
  const handleUpvote = (id: string) => {
    setComplaints(prev => prev.map(comp => {
      if (comp.id === id) {
        return { ...comp, upvotes: comp.upvotes + 1 };
      }
      return comp;
    }));
  };

  // Dynamically compute KPIs based on selections
  const kpis = useMemo(() => {
    // Basic dynamic multipliers based on selection to make UI alive
    const stateMult = selectedState === 'All States' ? 1.0 : selectedState.length * 0.08;
    const districtMult = selectedDistrict === 'All Districts' ? 1.0 : selectedDistrict.length * 0.07;
    const yearMult = selectedYear === '2026' ? 1.0 : 0.85;

    const baseComplaints = Math.round(14250 * stateMult * districtMult * yearMult);
    const baseResolved = Math.round(baseComplaints * 0.84);
    const basePending = baseComplaints - baseResolved;
    const baseCritical = Math.round(basePending * 0.06);
    const baseSatisfaction = (4.65 - (basePending / baseComplaints) * 0.5).toFixed(1);

    return {
      total: baseComplaints.toLocaleString(),
      resolved: baseResolved.toLocaleString(),
      pending: basePending.toLocaleString(),
      critical: baseCritical.toLocaleString(),
      satisfaction: `${baseSatisfaction}/5.0`
    };
  }, [selectedState, selectedDistrict, selectedMonth, selectedYear]);

  // Dynamically compute charts based on selections
  const chartData = useMemo(() => {
    const mult = selectedState.length + selectedDistrict.length + selectedMonth.length;
    return {
      // 1. District Comparison (Bar Chart)
      districts: [
        { name: 'Central Ward', complaints: Math.round(140 * mult * 0.15), resolved: Math.round(120 * mult * 0.15) },
        { name: 'Metro Zone 2', complaints: Math.round(230 * mult * 0.15), resolved: Math.round(195 * mult * 0.15) },
        { name: 'South Beach', complaints: Math.round(180 * mult * 0.15), resolved: Math.round(162 * mult * 0.15) },
        { name: 'Western Bypass', complaints: Math.round(290 * mult * 0.15), resolved: Math.round(240 * mult * 0.15) },
        { name: 'Valley Sector', complaints: Math.round(110 * mult * 0.15), resolved: Math.round(98 * mult * 0.15) },
      ],
      // 2. Complaint Categories (Pie Chart)
      categories: [
        { name: 'Road', value: Math.round(340 * mult * 0.2), color: '#2563EB' },
        { name: 'Garbage', value: Math.round(280 * mult * 0.2), color: '#EF4444' },
        { name: 'Water', value: Math.round(210 * mult * 0.2), color: '#0EA5E9' },
        { name: 'Streetlight', value: Math.round(150 * mult * 0.2), color: '#F59E0B' },
        { name: 'Drainage', value: Math.round(190 * mult * 0.2), color: '#10B981' },
        { name: 'Others', value: Math.round(90 * mult * 0.2), color: '#64748B' },
      ],
      // 3. Monthly Complaints (Line Chart)
      monthly: [
        { month: 'Jan', complaints: Math.round(1200 * (selectedYear === '2026' ? 1 : 0.8)) },
        { month: 'Feb', complaints: Math.round(1450 * (selectedYear === '2026' ? 1 : 0.85)) },
        { month: 'Mar', complaints: Math.round(1800 * (selectedYear === '2026' ? 1 : 0.9)) },
        { month: 'Apr', complaints: Math.round(2100 * (selectedYear === '2026' ? 1.05 : 0.95)) },
        { month: 'May', complaints: Math.round(2400 * (selectedYear === '2026' ? 1.1 : 0.92)) },
        { month: 'Jun', complaints: Math.round(3100 * (selectedYear === '2026' ? 1.2 : 0.96)) },
        { month: 'Jul', complaints: Math.round(3650 * (selectedYear === '2026' ? 1.3 : 1.0)) },
      ],
      // 4. Resolution Trend (Area Chart)
      resolution: [
        { month: 'Jan', slaMet: 88, avgTime: 4.2 },
        { month: 'Feb', slaMet: 90, avgTime: 3.8 },
        { month: 'Mar', slaMet: 91, avgTime: 3.5 },
        { month: 'Apr', slaMet: 89, avgTime: 3.6 },
        { month: 'May', slaMet: 93, avgTime: 2.8 },
        { month: 'Jun', slaMet: 92, avgTime: 2.4 },
        { month: 'Jul', slaMet: 94, avgTime: 1.8 },
      ]
    };
  }, [selectedState, selectedDistrict, selectedMonth, selectedYear]);

  // Filtered recent complaints list
  const filteredComplaints = useMemo(() => {
    return complaints.filter(comp => {
      // Text Search matches issue description, ID or district
      const matchesSearch = 
        comp.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.district.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter matches
      const matchesCategory = categoryFilter === 'All' || comp.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [complaints, searchQuery, categoryFilter]);

  // Color mappings
  const priorityColors = {
    Low: 'bg-slate-100 text-slate-700 border-slate-200',
    Medium: 'bg-warning-light text-warning border-warning/10',
    High: 'bg-orange-50 text-orange-600 border-orange-200',
    Critical: 'bg-danger-light text-danger border-danger/10 animate-pulse',
  };

  const statusColors = {
    Pending: 'bg-slate-100 text-slate-700',
    'In Progress': 'bg-blue-50 text-blue-700 border border-blue-200',
    Resolved: 'bg-success-light text-success border border-success/15',
    Closed: 'bg-slate-100 text-slate-500',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8" id="public-dashboard-container">
      
      {/* Page Title Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="text-left space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold font-mono tracking-wider uppercase bg-gov-blue-light text-gov-blue border border-gov-blue/20">
            <Compass className="h-3.5 w-3.5" />
            <span>Federal Geographic Hub</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            National Civic Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Real-time public transparency overview. Authenticated division telemetry showing administrative response audits.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm shadow-slate-50">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 font-mono uppercase px-1">
            <Filter className="h-4 w-4 text-slate-400" />
            <span>Filters:</span>
          </div>

          {/* State */}
          <div className="flex flex-col">
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('All Districts');
              }}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 hover:bg-slate-100/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue transition-all"
              id="dashboard-filter-state"
            >
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* District */}
          <div className="flex flex-col">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 hover:bg-slate-100/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue transition-all"
              id="dashboard-filter-district"
            >
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Month */}
          <div className="flex flex-col">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 hover:bg-slate-100/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue transition-all"
              id="dashboard-filter-month"
            >
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Year */}
          <div className="flex flex-col">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 hover:bg-slate-100/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue transition-all"
              id="dashboard-filter-year"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Total Complaints */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wide uppercase">Total Complaints</span>
          <div className="mt-3 space-y-1">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{kpis.total}</h3>
            <p className="text-[11px] font-semibold text-slate-500">Staged & Cataloged</p>
          </div>
        </div>

        {/* Card 2: Resolved */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-bold text-success font-mono tracking-wide uppercase">Resolved Compliance</span>
          <div className="mt-3 space-y-1">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-success tracking-tight flex items-center gap-1.5">
              <CheckCircle2 className="h-6 w-6 text-success shrink-0" />
              {kpis.resolved}
            </h3>
            <p className="text-[11px] font-semibold text-slate-500">Verification complete</p>
          </div>
        </div>

        {/* Card 3: Pending */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wide uppercase">Pending Review</span>
          <div className="mt-3 space-y-1">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-700 tracking-tight">{kpis.pending}</h3>
            <p className="text-[11px] font-semibold text-slate-500">Active ward routing</p>
          </div>
        </div>

        {/* Card 4: Critical */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-bold text-danger font-mono tracking-wide uppercase">Critical Hazards</span>
          <div className="mt-3 space-y-1">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-danger tracking-tight flex items-center gap-1.5">
              <ShieldAlert className="h-6 w-6 text-danger shrink-0" />
              {kpis.critical}
            </h3>
            <p className="text-[11px] font-semibold text-danger/80">SLA priority escalation</p>
          </div>
        </div>

        {/* Card 5: Satisfaction */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors">
          <span className="text-[10px] font-bold text-warning font-mono tracking-wide uppercase">Citizen Approval</span>
          <div className="mt-3 space-y-1">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-warning tracking-tight">{kpis.satisfaction}</h3>
            <p className="text-[11px] font-semibold text-slate-500">Post-resolution polls</p>
          </div>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart A: District Comparison (Bar Chart) - span 7 */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 md3-shadow-sm text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Regional Compliance Index</h3>
              <p className="text-xs text-slate-400 mt-0.5">Complaints filed versus resolved across active districts.</p>
            </div>
            <span className="text-[10px] font-bold font-mono text-gov-blue px-2 py-0.5 bg-gov-blue-light rounded border border-gov-blue/10">Bar Chart</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.districts} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="complaints" name="Filed Grievances" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved Actions" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Category Breakdown (Pie Chart) - span 5 */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 md3-shadow-sm text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Grievance Categories</h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribution of municipal division complaints.</p>
            </div>
            <span className="text-[10px] font-bold font-mono text-orange-500 px-2 py-0.5 bg-amber-50 rounded border border-warning/10">Pie Chart</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="h-56 w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} issues`, 'Volume']} contentStyle={{ borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom elegant list legend */}
            <div className="space-y-2 text-xs font-semibold text-slate-600">
              {chartData.categories.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span>{entry.name}</span>
                  </div>
                  <span className="font-mono text-slate-400 font-bold">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart C: Monthly Complaints (Line Chart) - span 6 */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 md3-shadow-sm text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Registration Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Complaints filed timeline audit.</p>
            </div>
            <span className="text-[10px] font-bold font-mono text-ai-purple px-2 py-0.5 bg-ai-purple-light rounded border border-ai-purple/10">Line Chart</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.monthly} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="complaints" name="Active Complaints" stroke="#7C3AED" strokeWidth={3} dot={{ r: 4, strokeWidth: 1 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart D: Resolution Speed & Area SLA - span 6 */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 md3-shadow-sm text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">SLA Resolution Performance</h3>
              <p className="text-xs text-slate-400 mt-0.5">Percentage of complaints meeting 24hr legal resolution guidelines.</p>
            </div>
            <span className="text-[10px] font-bold font-mono text-teal-600 px-2 py-0.5 bg-emerald-50 rounded border border-success/10">Area Chart</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.resolution} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorSla" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="slaMet" name="SLA Met %" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSla)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recharts Custom Horizontal Bar & AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Rating Distribution (Horizontal Bar) - span 5 */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 md3-shadow-sm text-left flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Citizen Satisfaction Audits</h3>
                <p className="text-xs text-slate-400 mt-0.5">Distribution of over 48,000 public survey returns.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-amber-500 px-2 py-0.5 bg-amber-50 rounded border border-warning/10">Ratings</span>
            </div>

            {/* Custom responsive rating distribution tracks */}
            <div className="space-y-4">
              {[
                { stars: '★★★★★', pct: 68, count: '32,640', color: 'bg-success' },
                { stars: '★★★★☆', pct: 18, count: '8,640', color: 'bg-blue-500' },
                { stars: '★★★☆☆', pct: 8, count: '3,840', color: 'bg-warning' },
                { stars: '★★☆☆☆', pct: 4, count: '1,920', color: 'bg-orange-500' },
                { stars: '★☆☆☆☆', pct: 2, count: '960', color: 'bg-danger' },
              ].map((item) => (
                <div key={item.stars} className="space-y-1.5 text-xs font-semibold text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-warning tracking-wider">{item.stars}</span>
                    <span className="text-slate-500 font-medium">{item.pct}% ({item.count})</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[11px] leading-relaxed text-slate-500 font-medium flex items-center gap-2">
            <Info className="h-4.5 w-4.5 text-gov-blue shrink-0" />
            <span>Satisfactions are audited via SMS tokens issued on ticket resolution.</span>
          </div>
        </div>

        {/* 2. AI Insights Card (Purple themed) - span 7 */}
        <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 md3-shadow-sm text-left relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-bl from-ai-purple/5 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none"></div>
          
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-ai-purple-light flex items-center justify-center text-ai-purple border border-ai-purple/10">
                  <Sparkles className="h-4.5 w-4.5 text-ai-purple" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">AI Predictive Insights</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Sovereign model evaluation of regional division trends.</p>
                </div>
              </div>
              <span className="text-[10px] font-bold font-mono text-ai-purple px-2 py-0.5 bg-ai-purple-light rounded border border-ai-purple/10">Intel</span>
            </div>

            {/* AI recommendation cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">Alert Profile</span>
                  <h4 className="text-xs font-bold text-slate-800 mt-1">Road complaints increased by 18%</h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">Monsoon precipitation vectors indicate potholes forming at key structural bypass highways.</p>
                </div>
                <div className="mt-3 text-[11px] font-bold text-ai-purple flex items-center gap-1">
                  <span>View Mitigation Plans</span> <ArrowRight className="h-3 w-3" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold font-mono text-success uppercase tracking-widest">Efficiency index</span>
                  <h4 className="text-xs font-bold text-slate-800 mt-1">Garbage complaints decreased by 12%</h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">Deployment of real-time GIS truck route schedules has reduced local division debris dumps.</p>
                </div>
                <div className="mt-3 text-[11px] font-bold text-success flex items-center gap-1">
                  <span>Routing Optimized</span> <CheckCircle2 className="h-3 w-3" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">division high</span>
                  <h4 className="text-xs font-bold text-slate-800 mt-1">Ward 14 has highest satisfaction</h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">Central ward divisions successfully deployed unified checklists, maintaining a 98% resolution SLA.</p>
                </div>
                <div className="mt-3 text-[11px] font-bold text-slate-600 flex items-center gap-1">
                  <span>Analyze Strategy</span> <ArrowRight className="h-3 w-3" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold font-mono text-ai-purple uppercase tracking-widest">Operation SLA</span>
                  <h4 className="text-xs font-bold text-slate-800 mt-1">Resolution time reduced by 1.4 days</h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">Dispatch multi-agent pipelines decreased initial response dispatch latency down from 4.8 hrs to 12 mins.</p>
                </div>
                <div className="mt-3 text-[11px] font-bold text-ai-purple flex items-center gap-1">
                  <span>View Telemetry Audit</span> <ArrowRight className="h-3 w-3" />
                </div>
              </div>

            </div>
          </div>

          <div className="mt-4 p-2.5 bg-ai-purple-light/50 border border-ai-purple/10 rounded-xl text-[10px] leading-relaxed text-ai-purple-dark font-medium text-center">
            ✨ SmartWard AI processes over 120 indicators hourly to suggest preemptive public works dispatch lists.
          </div>
        </div>

      </div>

      {/* Recent Complaints Section */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 md3-shadow-sm text-left">
        
        {/* Feed Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-4 border-b border-slate-100 mb-6 gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">National Live Grievance Feed</h3>
            <p className="text-xs text-slate-400 mt-0.5">Secured public view. Personal citizen identity variables are fully isolated.</p>
          </div>
          
          {/* Controls: Search + Categories */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search index..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-blue transition-all font-medium"
                id="complaints-search-input"
              />
            </div>

            {/* Quick Category Filters */}
            {['All', 'Road', 'Garbage', 'Water', 'Streetlight', 'Drainage'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  categoryFilter === cat
                    ? 'bg-gov-blue text-white shadow-sm'
                    : 'bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200'
                }`}
                id={`cat-filter-${cat}`}
              >
                {cat}
              </button>
            ))}

          </div>
        </div>

        {/* Complaints Grid/List */}
        <div className="space-y-3">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((comp) => (
              <div
                key={comp.id}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      {comp.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityColors[comp.priority]}`}>
                      {comp.priority} Priority
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      {comp.date}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-bold text-slate-800 leading-snug">
                    {comp.issue}
                  </h4>

                  <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Map className="h-3.5 w-3.5 text-slate-300" /> {comp.district}
                    </span>
                    <span className="text-slate-200">•</span>
                    <span className="bg-slate-50 px-2 py-0.5 rounded font-mono border border-slate-100 text-slate-500 uppercase tracking-wide">
                      {comp.category}
                    </span>
                  </div>
                </div>

                {/* Right side interactions & status */}
                <div className="flex items-center sm:justify-end gap-3 shrink-0 self-start sm:self-center">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleUpvote(comp.id)}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-gov-blue-light text-slate-400 hover:text-gov-blue border border-slate-200/60 transition-colors flex items-center gap-1 text-xs font-bold"
                      title="Upvote Issue"
                      id={`upvote-btn-${comp.id}`}
                    >
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{comp.upvotes}</span>
                    </button>
                    
                    <button
                      onClick={() => alert(`Copied share link for Grievance ID: ${comp.id}`)}
                      className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 border border-slate-200/60 transition-colors"
                      title="Share link"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <span className={`text-xs font-extrabold px-3 py-1.5 rounded-xl uppercase tracking-wider font-mono shrink-0 text-center ${statusColors[comp.status]}`}>
                    {comp.status}
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <span className="text-sm font-bold text-slate-500">No active complaints found matching criteria</span>
              <p className="text-xs text-slate-400 mt-1">Adjust search strings or quick categories filters.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

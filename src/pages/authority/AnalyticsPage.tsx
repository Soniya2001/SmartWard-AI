import React from 'react';
import { useAuthority } from '../../contexts/AuthorityContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  BarChart3, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, HelpCircle,
  Shield, X, Loader2, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AnalyticsPage: React.FC = () => {
  const { currentRole, chartData, kpis } = useAuthority();
  const [isSopOpen, setIsSopOpen] = React.useState(false);
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

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="space-y-1.5 border-b border-slate-200 pb-4">
        <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">
          {currentRole.roleName} Console &gt; Spatial Analytics &amp; GIS
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              Spatial Analytics &amp; Heatmaps
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              Live spatial correlation indexing showing regional grievance densities and predictive AI hazards.
            </p>
          </div>
          <div className="text-[10px] font-mono font-bold text-slate-400">
            Jurisdiction Benchmark: 24h SLA target
          </div>
        </div>
      </div>

      {/* AI Intelligence Briefing Panel */}
      <div className="bg-gradient-to-r from-gov-blue-light/50 via-white to-ai-purple-light/50 p-5 rounded-2xl border border-gov-blue/10 relative overflow-hidden text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-gov-blue/5 to-transparent rounded-full -mr-4 -mt-4 pointer-events-none" />
        <div className="space-y-1.5 z-10 max-w-2xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gov-blue font-mono tracking-wide uppercase">
            <Sparkles className="h-4 w-4 text-ai-purple" />
            Predictive Intelligence Engine Active
          </div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Weekly Municipal Risk Assessment
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
            Predictive telemetry scans municipal pipelines and road friction metrics to forecast Ward 42 infrastructural risk points. High likelihood of regional stormwater congestion detected near Madurai bypass limits.
          </p>
        </div>
        <button 
          onClick={() => setIsSopOpen(true)}
          className="shrink-0 z-10 px-4 py-2 bg-gov-blue hover:bg-gov-blue-dark text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
        >
          Enforce Precautionary SOP
        </button>
      </div>

      {/* First Grid: 2 Core Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Category Bar Chart */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Complaint Categories Distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">Frequency of incoming civic complaints.</p>
            </div>
            <span className="text-[10px] font-bold font-mono text-gov-blue px-2 py-0.5 bg-gov-blue-light rounded border border-gov-blue/10">Bar Chart</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.categories} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '11px' }} />
                <Bar dataKey="value" name="Volume" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Resolution Pie Chart */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm text-left flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Resolution Proportions</h3>
                <p className="text-xs text-slate-400 mt-0.5">Ratio of active and closed administrative actions.</p>
              </div>
              <span className="text-[10px] font-bold font-mono text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded border border-success/10">Pie Chart</span>
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
                      {chartData.status.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-[11px] font-bold text-slate-600">
                {chartData.status.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}: {entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[10px] leading-relaxed text-slate-500 font-medium mt-4">
            Auditing records comply end-to-end with active state SLA standards.
          </div>
        </div>

      </div>

      {/* Second Grid: Monthly and SLA Speed Area Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 3: Monthly Timelines */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Monthly Registration Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Historical overview of registered vs resolved tickets.</p>
            </div>
            <span className="text-[10px] font-bold font-mono text-ai-purple px-2 py-0.5 bg-ai-purple-light rounded border border-ai-purple/10">Line Chart</span>
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

        {/* Chart 4: Resolution Speed Index Area */}
        <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">SLA Response Speed Efficiency</h3>
              <p className="text-xs text-slate-400 mt-0.5">Average weekly rating of speed and quality closures.</p>
            </div>
            <span className="text-[10px] font-bold font-mono text-teal-600 px-2 py-0.5 bg-emerald-50 rounded border border-success/10">Area Chart</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.resolutionRate} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ background: '#FFF', borderRadius: '12px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="rate" name="SLA Met Rate %" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Sandbox Simulated Action Feedback Dialog */}
      <AnimatePresence>
        {isSopOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm shadow-xl"
              onClick={() => {
                setIsSopOpen(false);
                setSopStatus('idle');
                setSopStep(0);
              }}
            />
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
                    setIsSopOpen(false);
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
                        setIsSopOpen(false);
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
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

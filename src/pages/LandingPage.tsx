import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, Sparkles, Image, Mic, Route, ShieldAlert, Languages, 
  Eye, BarChart3, Upload, Brain, MapPin, CheckCircle2, TrendingUp,
  FileSpreadsheet, ShieldCheck, Users, Activity, MessageSquareDot, Clock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock Live statistics matching user requests
  const liveStats = [
    { label: 'Total Complaints Filed', value: '142,850', sub: '+12% from last month', icon: FileSpreadsheet, color: 'text-gov-blue bg-gov-blue-light' },
    { label: "Today's Complaints", value: '241', sub: 'Updated 2 mins ago', icon: Activity, color: 'text-ai-purple bg-ai-purple-light' },
    { label: 'Resolved (Last 30 Days)', value: '94.2%', sub: 'Target: 95.0%', icon: ShieldCheck, color: 'text-success bg-success-light' },
    { label: 'Pending Critical Actions', value: '18', sub: 'Avg response < 4 hrs', icon: ShieldAlert, color: 'text-danger bg-danger-light' },
    { label: 'Citizen Satisfaction', value: '4.8/5.0', sub: 'Based on 48,000+ ratings', icon: Users, color: 'text-warning bg-warning-light' },
  ];

  // Mock Feature Cards
  const features = [
    {
      title: 'AI Complaint Generation',
      desc: 'Converts simple images, audio descriptions, or short notes into detailed, professionally formatted, and categorized legal complaints automatically.',
      icon: Sparkles,
      color: 'from-ai-purple/10 to-indigo-500/5',
      iconColor: 'text-ai-purple'
    },
    {
      title: 'Image-based Reporting',
      desc: 'Users snap a photo of damaged roads, debris, or potholes. Smart computer vision auto-detects issue category, severity index, and exact geographic details.',
      icon: Image,
      color: 'from-gov-blue/10 to-blue-500/5',
      iconColor: 'text-gov-blue'
    },
    {
      title: 'Voice Reporting Support',
      desc: 'Empowering diverse populations through voice reporting. Citizen voice inputs are transcribed, translated, and structured into formal ward issues.',
      icon: Mic,
      color: 'from-emerald-500/10 to-teal-500/5',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'AI Smart Routing',
      desc: 'No manual categorization. Grievances are routed directly to the exact department (Public Works, Health, Sewage, Utilities) and assigned ward executive.',
      icon: Route,
      color: 'from-blue-500/10 to-indigo-500/5',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Priority & Risk Detection',
      desc: 'Identifies hazards and high-risk conditions like open manholes, active water mains, or blocked disaster exits, auto-escalating priority levels.',
      icon: ShieldAlert,
      color: 'from-red-500/10 to-orange-500/5',
      iconColor: 'text-danger'
    },
    {
      title: 'Multi-language Support',
      desc: 'Fully supports national and regional languages. AI handles internal translation, translation sanitization, and seamless regional dialect processing.',
      icon: Languages,
      color: 'from-orange-500/10 to-amber-500/5',
      iconColor: 'text-warning'
    },
    {
      title: 'Public Transparency',
      desc: 'Provides full timeline tracking on complaints, open ward mappings, and administrative decision trees, creating absolute integrity and trust.',
      icon: Eye,
      color: 'from-teal-500/10 to-cyan-500/5',
      iconColor: 'text-teal-600'
    },
    {
      title: 'Government Analytics',
      desc: 'Provides ward directors and state commissioners with real-time dashboards tracking problem zones, category heatmaps, and staff response times.',
      icon: BarChart3,
      color: 'from-indigo-500/10 to-purple-500/5',
      iconColor: 'text-indigo-600'
    }
  ];

  // Workflow Timeline data
  const workflowSteps = [
    { id: '1', role: 'Citizen', action: 'Upload Image', desc: 'Citizen snaps a photo of a broken streetlight or trash dump using the mobile or web portal.', icon: Upload, bg: 'bg-gov-blue' },
    { id: '2', role: 'AI Agent System', action: 'AI Deep Analysis', desc: 'Neural networks identify category, extract geo-coordinates from EXIF/IP, and draft summary text.', icon: Brain, bg: 'bg-ai-purple' },
    { id: '3', role: 'GIS Engine', action: 'Ward Mapping', desc: 'Issue is matched with municipal boundary GIS vectors to pinpoint the exact local administrative jurisdiction.', icon: MapPin, bg: 'bg-teal-600' },
    { id: '4', role: 'Dispatcher agent', action: 'Department Routing', desc: 'AI routes the complaint directly to the Sanitation or Electricity Department with priority metrics.', icon: Route, bg: 'bg-indigo-600' },
    { id: '5', role: 'Ward Executive', action: 'Authority Assigned', desc: 'Ward officer receives instant SMS notification with precise location coordinates and action plan checklist.', icon: Users, bg: 'bg-amber-600' },
    { id: '6', role: 'Resolution', action: 'Issue Resolved', desc: 'Officer uploads post-resolution image. AI verifies repair, citizen receives feedback poll, task closes.', icon: CheckCircle2, bg: 'bg-success' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50" id="landing-page-container">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-200/60 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
              <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-gov-blue-light text-gov-blue border border-gov-blue/20">
                <Sparkles className="h-3.5 w-3.5 text-gov-blue animate-pulse" />
                <span>Next-Gen Governance Portal</span>
              </div>
              
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-none">
                SmartWard <span className="text-gov-blue">AI</span>
                <span className="block mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-normal text-slate-500 font-sans">
                  AI-Powered Civic Governance Platform
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Helping citizens report civic issues effortlessly while enabling governments to prioritize, manage, and resolve public grievances using AI-powered multi-agent intelligence.
              </p>

              <div className="flex flex-wrap gap-3.5 pt-2">
                <button
                  onClick={() => navigate('/login/citizen')}
                  className="px-6 py-3 text-base font-semibold text-white bg-gov-blue hover:bg-gov-blue-dark rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
                  id="hero-report-btn"
                >
                  <Upload className="h-5 w-5" />
                  Report an Issue
                </button>
                <button
                  onClick={() => navigate('/public-dashboard')}
                  className="px-6 py-3 text-base font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors inline-flex items-center gap-2"
                  id="hero-dashboard-btn"
                >
                  <BarChart3 className="h-5 w-5 text-slate-500" />
                  Explore Public Dashboard
                </button>
              </div>

              {/* Status indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-slate-500 text-xs font-semibold font-mono uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-success animate-ping"></div>
                  <span>94.2% SLA Met</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>&lt; 24hr Resolution</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-ai-purple" />
                  <span>Agent-Driven</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Modern Custom SVG Workflow Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-6 bg-slate-50 rounded-2xl border border-slate-200/80 md3-shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-6">
                  <span className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest">Multi-Agent Processing Flow</span>
                  <span className="text-[10px] font-bold font-mono text-gov-blue px-2 py-0.5 bg-gov-blue-light rounded-md">Live</span>
                </div>
                
                {/* SVG Graph Graphic */}
                <svg viewBox="0 0 400 450" className="w-full h-auto drop-shadow-sm">
                  {/* Grid Lines */}
                  <line x1="200" y1="50" x2="200" y2="390" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
                  
                  {/* Connection paths */}
                  <path d="M 200,90 C 200,120 200,120 200,150" stroke="#2563EB" strokeWidth="2.5" fill="none" />
                  <path d="M 200,190 C 200,220 200,220 200,250" stroke="#7C3AED" strokeWidth="2.5" fill="none" />
                  <path d="M 200,290 C 200,320 200,320 200,350" stroke="#10B981" strokeWidth="2.5" fill="none" />

                  {/* Node 1: Citizen */}
                  <g transform="translate(140, 30)">
                    <rect width="120" height="60" rx="10" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.5" />
                    <text x="60" y="25" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="sans-serif">1. Citizen Report</text>
                    <text x="60" y="42" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="medium" fontFamily="sans-serif">Upload Pothole Image</text>
                    <circle cx="-5" cy="30" r="14" fill="#2563EB" />
                    <path d="M -9,34 C -9,31 -7,29 -5,29 C -3,29 -1,31 -1,34 M -5,25 C -7,25 -7,23 -5,23 C -3,23 -3,25 -5,25" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
                  </g>

                  {/* Node 2: AI Agents */}
                  <g transform="translate(140, 130)">
                    <rect width="120" height="60" rx="10" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="1.5" />
                    <text x="60" y="25" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="sans-serif">2. AI Multi-Agent</text>
                    <text x="60" y="42" textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Classification & Risk</text>
                    <circle cx="-5" cy="30" r="14" fill="#7C3AED" />
                    {/* Stars sparkle */}
                    <path d="M -8,27 L -5,30 L -2,27 L -5,24 Z" fill="#FFFFFF" />
                    <path d="M -4,33 L -3,34 L -2,33 L -3,32 Z" fill="#FFFFFF" />
                  </g>

                  {/* Node 3: Government Dispatch */}
                  <g transform="translate(140, 230)">
                    <rect width="120" height="60" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
                    <text x="60" y="25" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="sans-serif">3. Gov Dispatch</text>
                    <text x="60" y="42" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="medium" fontFamily="sans-serif">Ward Routing Vector</text>
                    <circle cx="-5" cy="30" r="14" fill="#0284C7" />
                    <path d="M -9,32 L -5,24 L -1,32 Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>

                  {/* Node 4: Resolution */}
                  <g transform="translate(140, 330)">
                    <rect width="120" height="60" rx="10" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
                    <text x="60" y="25" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="sans-serif">4. Resolution</text>
                    <text x="60" y="42" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Verified & Closed</text>
                    <circle cx="-5" cy="30" r="14" fill="#10B981" />
                    <path d="M -9,30 L -6,33 L -1,27" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </g>
                </svg>

                <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/60 text-[11px] leading-relaxed text-slate-500 font-medium">
                  <span className="font-bold text-slate-700">Autonomous Edge Routing:</span> Geolocation data and optical models map public works issues to the precise engineering desk in under 3.8 seconds.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Live Statistics Section */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="text-left">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                National Ward Live Operations
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Consolidated real-time operational metrics across all municipality regions tracking citizen grievance compliance.
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 self-start text-[11px] font-bold font-mono text-slate-500 bg-white border border-slate-200/80 px-3.5 py-2 rounded-xl md3-shadow-sm shadow-slate-100">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
              <span>LIVE SYSTEM FEEDS CONNECTED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {liveStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 md3-shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-400 font-mono tracking-wide uppercase leading-tight">{stat.label}</span>
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      {stat.sub}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-ai-purple uppercase tracking-widest font-mono bg-ai-purple-light px-3 py-1 rounded-full border border-ai-purple/10">
              Platform Features
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Next-Gen Municipal AI Capabilities
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              A comprehensive toolkit of sovereign AI agents, computer vision pipelines, and public dashboards designed for municipal-scale grievance operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -6, boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.04)' }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 transition-shadow text-left flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} border border-slate-100 transition-transform group-hover:scale-105`}>
                      <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {feature.desc}
                    </p>
                  </div>
                  
                  <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-gov-blue transition-colors">
                    <span>Active Protocol</span>
                    <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Workflow Section */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-gov-blue uppercase tracking-widest font-mono bg-gov-blue-light px-3 py-1 rounded-full border border-gov-blue/10">
              The Journey
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
              From Capture to Complete Resolution
            </h2>
            <p className="text-slate-500 text-sm">
              How the multi-agent AI framework routes and assists city operations transparently step-by-step.
            </p>
          </div>

          {/* Workflow Timeline Layout */}
          <div className="relative mt-8">
            {/* Background connecting line (Desktop only) */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.15 }}
                    className="bg-white p-5 rounded-2xl border border-slate-200 text-left flex flex-col justify-between md3-shadow-sm hover:border-slate-300 transition-colors"
                  >
                    <div>
                      {/* Step index circle and role badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`h-10 w-10 rounded-xl ${step.bg} text-white flex items-center justify-center shadow-md`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-500 uppercase tracking-wider">
                          Step {step.id}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono block">
                          {step.role}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {step.action}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed pt-1.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/login/citizen"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gov-blue hover:bg-gov-blue-dark text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
              id="workflow-get-started"
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

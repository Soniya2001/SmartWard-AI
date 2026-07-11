import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Building2, 
  Activity, 
  User, 
  Users, 
  LockKeyhole, 
  Award,
  ArrowRight,
  HelpCircle,
  FileText,
  BadgeCheck,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DemoAccount {
  role: string;
  email: string;
  department: string;
  avatarSeed: string;
  badge: string;
}

export const AuthorityLogin: React.FC = () => {
  const { login, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Custom interaction states
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autofillPulse, setAutofillPulse] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotDialog, setShowForgotDialog] = useState(false);

  // Feature card configurations for Left Side
  const features = [
    {
      title: 'Smart Governance',
      desc: 'Real-time routing of civic hazards and cross-departmental administrative collaboration.',
      icon: Building2,
      color: 'text-gov-blue bg-blue-50 border-blue-100',
    },
    {
      title: 'AI-Assisted Operations',
      desc: 'Sovereign computer vision models classify grievances and draft public service orders in under 4 seconds.',
      icon: Sparkles,
      color: 'text-ai-purple bg-purple-50 border-purple-100',
    },
    {
      title: 'Secure Administration',
      desc: 'End-to-end encrypted audit ledger logging SLA performance indices and official approvals.',
      icon: LockKeyhole,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
  ];

  // List of Demo Government Accounts requested
  const demoAccounts: DemoAccount[] = [
    { role: 'Chief Minister', email: 'cm@smartward.in', department: 'State Executive Council', avatarSeed: 'CM', badge: 'Apex Executive' },
    { role: 'Minister', email: 'minister.municipal@smartward.in', department: 'Urban Development & Municipal Affairs', avatarSeed: 'MIN', badge: 'Cabinet Minister' },
    { role: 'Collector', email: 'collector.madurai@smartward.in', department: 'District Revenue & General Administration', avatarSeed: 'COL', badge: 'District Head' },
    { role: 'Commissioner', email: 'commissioner.madurai@smartward.in', department: 'Municipal Corporation Secretariat', avatarSeed: 'COM', badge: 'Corporation Lead' },
    { role: 'MLA', email: 'mla.madurainorth@smartward.in', department: 'Legislative Assembly constituency', avatarSeed: 'MLA', badge: 'Legislator' },
    { role: 'Ward Councillor', email: 'councillor.ward42@smartward.in', department: 'Ward 42 Standing Committee', avatarSeed: 'WC', badge: 'Ward Representative' },
    { role: 'Department Officer', email: 'roads.ward42@smartward.in', department: 'PWD Highway & Infrastructure Division', avatarSeed: 'DO', badge: 'Executive Engineer' },
  ];

  // Handle mock login submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!email) {
      setFormError('Please enter your official government email address.');
      return;
    }
    if (!password) {
      setFormError('Please enter your security access key or password.');
      return;
    }

    // Standard institutional format check for demonstration safety
    if (!email.includes('@')) {
      setFormError('Please enter a valid official email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate Material Design 3 secure SSL handshake and authentication check
      await new Promise((resolve) => setTimeout(resolve, 1400));
      
      // Perform client state update in AuthContext
      await login(email, 'authority');
      
      setFormSuccess('Credentials verified. Safe SSL Tunnel Established.');
      
      // Navigate to the public dashboard or administrative workspace
      setTimeout(() => {
        navigate('/authority/dashboard');
      }, 600);
    } catch (err: any) {
      setFormError(err?.message || 'Access Denied. Check your security access keys.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to autofill a demo email
  const handleAutofill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('••••••••••••');
    setFormError(null);
    setAutofillPulse(true);
    setTimeout(() => setAutofillPulse(false), 800);
  };

  // Handle forgot password mock
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail || !forgotPasswordEmail.includes('@')) {
      alert('Please enter a valid official email.');
      return;
    }
    alert(`Reset link dispatched successfully. An encrypted OTP verification code has been transmitted to ${forgotPasswordEmail}. Please check your secure NIC mail client.`);
    setShowForgotDialog(false);
    setForgotPasswordEmail('');
  };

  return (
    <div className="min-h-[90vh] bg-brand-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans" id="authority-login-container">
      <div className="mx-auto max-w-7xl w-full">
        
        {/* Dynamic two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT SIDE (40%): Portal Welcome and Features */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 md3-shadow-sm">
            
            {/* Header Content */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase bg-gov-blue-light text-gov-blue border border-gov-blue/20">
                <Award className="h-3.5 w-3.5" />
                <span>SmartWard AI Enterprise</span>
              </div>
              
              <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Government Authority Portal
              </h1>
              
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                Secure access for authorized government officials to manage civic services, coordinate rapid response teams, and enforce SLA metrics through SmartWard AI.
              </p>
            </div>

            {/* Subtle Government-Themed Vector Illustration */}
            <div className="py-6 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100">
              <svg viewBox="0 0 500 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[280px] opacity-90 text-gov-blue" id="gov-portal-vector">
                {/* Subtle Gridlines */}
                <g opacity="0.1" stroke="#2563EB" strokeWidth="1">
                  <path d="M 0,40 L 500,40 M 0,80 L 500,80 M 0,120 L 500,120 M 0,160 L 500,160 M 0,200 L 500,200 M 0,240 L 500,240 M 0,280 L 500,280" />
                  <path d="M 50,0 L 50,320 M 100,0 L 100,320 M 150,0 L 150,320 M 200,0 L 200,320 M 250,0 L 250,320 M 300,0 L 300,320 M 350,0 L 350,320 M 400,0 L 400,320 M 450,0 L 450,320" />
                </g>
                
                {/* Glowing Nodes in Background */}
                <g opacity="0.12">
                  <circle cx="120" cy="70" r="15" fill="#7C3AED" filter="blur(4px)" />
                  <circle cx="380" cy="110" r="22" fill="#2563EB" filter="blur(6px)" />
                  <circle cx="250" cy="250" r="28" fill="#10B981" filter="blur(8px)" />
                </g>

                {/* Digital Connections / Traces */}
                <path d="M 120,70 L 210,70 L 250,110" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
                <path d="M 380,110 L 290,110 L 250,150" stroke="#2563EB" strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
                
                {/* Modern Capitol Dome / Government Hall Silhouette */}
                <path d="M 140,240 L 360,240" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
                <path d="M 150,240 L 150,150 L 350,150 L 350,240" stroke="#1E293B" strokeWidth="3" fill="#FFFFFF" />
                
                {/* Colonnade Columns */}
                <path d="M 180,150 L 180,240 M 215,150 L 215,240 M 250,150 L 250,240 M 285,150 L 285,240 M 320,150 L 320,240" stroke="#2563EB" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
                
                {/* Triangle Pediment */}
                <polygon points="140,150 250,90 360,150" fill="#2563EB" stroke="#1E293B" strokeWidth="3.5" />
                
                {/* Municipal Seal placeholder in pediment */}
                <circle cx="250" cy="122" r="8" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1.5" />
                
                {/* Ground Steps */}
                <path d="M 120,252 L 380,252" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
                <path d="M 90,266 L 410,266" stroke="#64748B" strokeWidth="8" strokeLinecap="round" />

                {/* Security Shield Overlay */}
                <path d="M 235,170 C 235,170 250,165 250,165 C 250,165 265,170 265,170 C 265,185 250,195 250,195 C 250,195 235,185 235,170 Z" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="2" />
                <path d="M 250,172 L 250,188 M 242,180 L 258,180" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />

                {/* Digital Flow indicators */}
                <path d="M 120,252 C 90,252 70,220 70,180 C 70,140 110,110 140,110" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />
                <circle cx="70" cy="180" r="4.5" fill="#10B981" />
                <circle cx="140" cy="110" r="4.5" fill="#10B981" />
              </svg>
            </div>

            {/* Feature Cards Grid */}
            <div className="space-y-3.5">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div 
                    key={feat.title} 
                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors"
                  >
                    <div className={`p-2 rounded-lg border shrink-0 ${feat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-950 flex items-center gap-1.5">
                        <span>{feat.title}</span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-success fill-success/10" />
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Verified seal notice */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold">
              <span>SECURITY CERTIFICATE</span>
              <span className="text-gov-blue">SHA-256 ENCRYPTED</span>
            </div>

          </div>

          {/* RIGHT SIDE (60%): Secure Login Card & Demo Accordion */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Login Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 md3-shadow-lg max-w-[500px] w-full mx-auto relative overflow-hidden text-left">
              
              {/* Premium top aesthetic accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gov-blue via-ai-purple to-emerald-500"></div>

              {/* Card Header */}
              <div className="space-y-1 pb-6 border-b border-slate-100">
                <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Authority Login
                </h2>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Enter your official SmartWard administrative credentials.
                </p>
              </div>

              {/* Interactivity Alerts */}
              <AnimatePresence mode="wait">
                {formError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-danger-light border border-danger/15 text-xs text-danger font-medium"
                  >
                    <ShieldAlert className="h-4.5 w-4.5 text-danger shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Credential Verification Block:</span>
                      <p className="mt-0.5">{formError}</p>
                    </div>
                  </motion.div>
                )}

                {formSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-success-light border border-success/15 text-xs text-success font-medium"
                  >
                    <ShieldCheck className="h-4.5 w-4.5 text-success shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Access Confirmed:</span>
                      <p className="mt-0.5">{formSuccess}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4">
                
                {/* Field 1: Official Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">
                    Official Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="collector.madurai@smartward.in"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border rounded-xl focus:outline-none focus:ring-1 focus:bg-white focus:ring-gov-blue transition-all font-semibold text-slate-800 placeholder:text-slate-400 ${
                        autofillPulse ? 'animate-pulse ring-2 ring-gov-blue/20 bg-blue-50/50' : 'border-slate-200'
                      }`}
                      id="authority-login-email"
                      required
                    />
                  </div>
                </div>

                {/* Field 2: Password */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="Enter Password"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:bg-white focus:ring-gov-blue transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                      id="authority-login-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password Container */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-gov-blue focus:ring-gov-blue/30 focus:ring-offset-0"
                    />
                    <span className="text-xs text-slate-500 font-bold hover:text-slate-700 transition-colors">
                      Remember Me
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setForgotPasswordEmail(email);
                      setShowForgotDialog(true);
                    }}
                    className="text-xs font-bold text-gov-blue hover:text-gov-blue-dark hover:underline focus:outline-none"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Primary Button: Login */}
                <button
                  type="submit"
                  disabled={isSubmitting || authLoading}
                  className="w-full mt-4 bg-gov-blue hover:bg-gov-blue-dark text-white text-xs font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 cursor-pointer"
                  id="authority-login-submit"
                >
                  {isSubmitting || authLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying Administrative SSL Signature...
                    </span>
                  ) : (
                    <>
                      <span>Log in to Secure Console</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Below Button: Subtle Security Notice */}
              <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-[11px] leading-relaxed text-slate-500 font-medium">
                <span className="text-sm shrink-0">🛡️</span>
                <p>
                  <strong>Secured Access:</strong> Only authorized government officials are permitted to access this portal. All operational events and IP vectors are continuously cataloged.
                </p>
              </div>

            </div>

            {/* DEMO ACCOUNTS ACCORDION SECTION */}
            <div className="max-w-[500px] w-full mx-auto bg-white rounded-2xl border border-slate-200 md3-shadow-sm text-left overflow-hidden">
              
              {/* Accordion Toggle Header */}
              <button
                type="button"
                onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                className="w-full px-5 py-4 flex items-center justify-between bg-slate-50/50 hover:bg-slate-50 transition-colors focus:outline-none"
                id="demo-accounts-accordion-toggle"
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-gov-blue-light text-gov-blue border border-gov-blue/10 flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                      Demo Government Accounts
                    </h3>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Select official profile credentials for visual system trials.
                    </p>
                  </div>
                </div>
                
                {isAccordionOpen ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {isAccordionOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="border-t border-slate-150 overflow-hidden"
                  >
                    <div className="p-4 space-y-2 bg-white max-h-[360px] overflow-y-auto">
                      
                      {demoAccounts.map((acc) => (
                        <button
                          key={acc.email}
                          type="button"
                          onClick={() => handleAutofill(acc.email)}
                          className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            {/* Dummy initials avatar */}
                            <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 font-bold font-mono text-[10px] flex items-center justify-center group-hover:bg-gov-blue-light group-hover:text-gov-blue transition-colors border border-slate-200">
                              {acc.avatarSeed}
                            </div>
                            
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-extrabold text-slate-800">
                                  {acc.role}
                                </span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold">
                                  {acc.badge}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-mono font-bold leading-none">
                                {acc.email}
                              </p>
                              <p className="text-[10px] text-slate-500 font-sans leading-none pt-0.5 font-semibold">
                                {acc.department}
                              </p>
                            </div>
                          </div>

                          <div className="text-[10px] font-bold text-gov-blue opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                            <span>Use Account</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>

                        </button>
                      ))}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

      {/* Forgot Password Dialog Modal */}
      <AnimatePresence>
        {showForgotDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-200 md3-shadow-lg max-w-md w-full p-6 text-left space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <ShieldCheck className="h-5 w-5 text-gov-blue" />
                  <span>Administrative Security Reset</span>
                </h3>
                <button
                  onClick={() => setShowForgotDialog(false)}
                  className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Administrative security keys can be reset by issuing a digital token OTP request. A secure verification link will be dispatched to your registered agency inbox.
              </p>

              <form onSubmit={handleForgotPassword} className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-mono block">
                    Registered Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    placeholder="collector.madurai@smartward.in"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-gov-blue focus:bg-white font-semibold text-slate-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotDialog(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 border border-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gov-blue hover:bg-gov-blue-dark transition-colors"
                  >
                    Transmit Reset Token
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

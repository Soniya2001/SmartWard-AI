import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Sparkles, Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const CitizenLogin: React.FC = () => {
  const { user, login, register, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'authority') {
        navigate('/authority/dashboard', { replace: true });
      } else {
        navigate('/citizen/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  // Mode state: 'login' or 'register'
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validations
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (mode === 'register' && !name) {
      setError('Please provide your legal name.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      if (mode === 'login') {
        await login(email, 'citizen', name);
      } else {
        await register(email, name, 'citizen');
      }
      navigate('/citizen/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      setLoading(true);
      // Simulate Google Login popup flow
      await login('citizen.demo@gmail.com', 'citizen', 'Citizen Demo User');
      navigate('/citizen/dashboard');
    } catch (err) {
      setError('Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50" id="citizen-login-page">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl border border-slate-200 md3-shadow-lg">
        
        {/* Portal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gov-blue text-white shadow-md mb-2">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            {mode === 'login' ? 'Citizen Login Portal' : 'Create Citizen Account'}
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
            Access secure ward reporting, track submitted grievances, and view local community statistics.
          </p>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-danger-light border border-danger/10 text-xs text-danger font-medium">
            <AlertCircle className="h-4.5 w-4.5 text-danger shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Full Legal Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-medium"
                  id="citizen-register-name"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="citizen@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-medium"
                id="citizen-login-email"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono block">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions have been dispatched to your email (Demo Mock).")}
                  className="text-[11px] font-bold text-gov-blue hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/50 focus:bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gov-blue/20 focus:border-gov-blue transition-all font-medium"
                id="citizen-login-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="flex items-center justify-between text-left text-xs text-slate-500 font-semibold pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded text-gov-blue focus:ring-gov-blue/30 border-slate-300"
                />
                Remember my session
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full mt-2 py-3 px-4 text-sm font-bold text-white bg-gov-blue hover:bg-gov-blue-dark disabled:bg-slate-300 rounded-xl transition-colors shadow-sm inline-flex items-center justify-center gap-2"
            id="citizen-submit-btn"
          >
            {loading || authLoading ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                Encrypting Connection...
              </>
            ) : mode === 'login' ? (
              'Sign In to Portal'
            ) : (
              'Create Citizen Credentials'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center text-slate-400">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[10px] font-bold uppercase tracking-widest font-mono">Or Continue With</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Google SSO button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading || authLoading}
          className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-300 rounded-xl transition-all inline-flex items-center justify-center gap-2 hover:shadow-sm"
          id="citizen-google-login"
        >
          {/* Custom minimal Google logo */}
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.258-3.133C18.3 1.745 15.49 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.814 11.57-11.79 0-.79-.08-1.393-.18-1.925H12.24z"
            />
          </svg>
          Google Single Sign-On
        </button>

        {/* Mode Switcher */}
        <p className="text-center text-xs text-slate-500 font-medium">
          {mode === 'login' ? "New to the SmartWard platform? " : "Already have a citizen account? "}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="font-bold text-gov-blue hover:underline"
            id="citizen-toggle-mode"
          >
            {mode === 'login' ? 'Create national ID profile' : 'Sign in here'}
          </button>
        </p>

        {/* Official notice */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50 text-[10px] leading-relaxed text-slate-500 font-medium text-center">
          ⚡ <strong>Official security notice:</strong> SmartWard AI uses secure, military-grade cryptographic hashing for citizen registries.
        </div>

      </div>
    </div>
  );
};

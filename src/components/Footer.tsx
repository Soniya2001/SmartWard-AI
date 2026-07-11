import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Heart, Globe, Cpu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Footer: React.FC = () => {
  const { user } = useAuth();
  return (
    <footer className="w-full border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          
          {/* Brand block */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gov-blue text-white shadow-sm">
                <Shield className="h-4.5 w-4.5" />
              </div>
              <span className="font-display text-base font-bold text-slate-900">
                SmartWard <span className="text-ai-purple font-mono text-xs px-1 py-0.5 bg-ai-purple-light rounded font-bold">AI</span>
              </span>
            </div>
            <p className="text-sm max-w-md text-slate-500 leading-relaxed">
              National-level AI-driven civic governance solution enabling unified transparency, multi-agent automated grievance routing, and spatial ward analytics for efficient citizen-state partnership.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-950 font-mono">Platform</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                {user ? (
                  <Link to={user.role === 'authority' ? "/authority/dashboard" : "/citizen/dashboard"} className="hover:text-gov-blue transition-colors">
                    {user.role === 'authority' ? "Authority Console" : "My Dashboard"}
                  </Link>
                ) : (
                  <Link to="/" className="hover:text-gov-blue transition-colors">Home Landing</Link>
                )}
              </li>
              <li>
                <Link to="/public-dashboard" className="hover:text-gov-blue transition-colors">Public Dashboard</Link>
              </li>
              <li>
                <Link to="/authorities" className="hover:text-gov-blue transition-colors">Authorities Index</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gov-blue transition-colors">About & Architecture</Link>
              </li>
            </ul>
          </div>

          {/* Guidelines / Privacy */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-950 font-mono">Resources</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a href="#privacy" className="hover:text-gov-blue transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="hover:text-gov-blue transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gov-blue transition-colors">Support Contact</a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gov-blue transition-colors inline-flex items-center gap-1.5">
                  <Github className="h-4 w-4" /> GitHub Project
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} SmartWard AI. All rights reserved.</span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Globe className="h-3.5 w-3.5 text-gov-blue" /> Asia-Southeast
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11px] bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 text-slate-500 font-mono">
              <Cpu className="h-3 w-3 text-ai-purple" />
              <span>v1.0.4-beta</span>
            </div>
            <span className="flex items-center gap-1 text-[11px]">
              Made with <Heart className="h-3 w-3 text-danger fill-danger" /> for Smart Cities
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

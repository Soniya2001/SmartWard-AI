import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Sparkles, LogOut, Menu, X, User, Users, Landmark, Info, PieChart, Activity } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [];

  if (!user) {
    navLinks.push({ name: 'Home', path: '/', icon: Landmark });
  }

  navLinks.push(
    { name: 'Public Dashboard', path: '/public-dashboard', icon: PieChart },
    { name: 'Authorities', path: '/authorities', icon: Users }
  );

  if (user) {
    if (user.role === 'citizen') {
      navLinks.push({ name: 'My Dashboard', path: '/citizen/dashboard', icon: Shield });
    } else if (user.role === 'authority') {
      navLinks.push({ name: 'Authority Console', path: '/authority/dashboard', icon: Shield });
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md md3-shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link 
          to={user ? (user.role === 'authority' ? '/authority/dashboard' : '/citizen/dashboard') : '/'} 
          className="flex items-center gap-2.5 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gov-blue text-white shadow-md transition-transform group-hover:scale-105">
            <Shield className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-slate-950 flex items-center gap-1.5">
              SmartWard <span className="text-ai-purple flex items-center gap-0.5 text-xs bg-ai-purple-light px-1.5 py-0.5 rounded-md font-mono font-bold">AI</span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest font-mono">Civic Platform</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-gov-blue-light text-gov-blue'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${active ? 'text-gov-blue' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Portal Actions / User Status */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3 bg-slate-50 pl-3 pr-1.5 py-1.5 rounded-full border border-slate-200">
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</span>
                <span className="text-[10px] text-slate-500 capitalize leading-none flex items-center justify-end gap-1 font-medium">
                  {user.role === 'authority' ? (
                    <span className="text-ai-purple flex items-center gap-0.5">
                      <Sparkles className="h-2.5 w-2.5" /> Authority
                    </span>
                  ) : (
                    <span className="text-gov-blue">Citizen</span>
                  )}
                </span>
              </div>
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-8 w-8 rounded-full ring-2 ring-gov-blue/20"
              />
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-full text-slate-400 hover:text-danger hover:bg-danger-light transition-all"
                title="Log Out"
                id="navbar-logout-btn"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login/citizen"
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
                id="nav-citizen-login"
              >
                Citizen Login
              </Link>
              <Link
                to="/authority/login"
                className="px-4 py-2 text-sm font-medium text-white bg-gov-blue hover:bg-gov-blue-dark rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5"
                id="nav-authority-login"
              >
                <Sparkles className="h-4 w-4 text-slate-100" />
                Authority Portal
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    active
                      ? 'bg-gov-blue-light text-gov-blue'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${active ? 'text-gov-blue' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <hr className="border-slate-200" />

          {/* Mobile Auth actions */}
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-4">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{user.name}</h4>
                  <p className="text-xs text-slate-500 capitalize">{user.role} Account</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium text-danger bg-danger-light hover:bg-danger/10 transition-colors"
                id="mobile-logout-btn"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 px-2">
              <Link
                to="/login/citizen"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-center text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
              >
                Citizen Portal
              </Link>
              <Link
                to="/authority/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-center text-sm font-medium text-white bg-gov-blue hover:bg-gov-blue-dark rounded-lg transition-colors"
              >
                Official Portal
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

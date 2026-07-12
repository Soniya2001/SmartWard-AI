import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthorityProvider } from './contexts/AuthorityContext';
import { PublicLayout } from './components/PublicLayout';
import { AuthorityLayout } from './components/AuthorityLayout';

// Public pages
import { LandingPage } from './pages/LandingPage';
import { CitizenLogin } from './pages/CitizenLogin';
import { CitizenSignup } from './pages/CitizenSignup';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { AuthorityLogin } from './pages/AuthorityLogin';
import { PublicDashboard } from './pages/PublicDashboard';
import { AuthoritiesPage } from './pages/AuthoritiesPage';

// Authority pages
import { AuthorityDashboard } from './pages/AuthorityDashboard';
import { DepartmentDashboard } from './pages/DepartmentDashboard';
import { ComplaintsPage } from './pages/authority/ComplaintsPage';
import { ReportsPage } from './pages/authority/ReportsPage';
import { NotificationsPage } from './pages/authority/NotificationsPage';
import { ProfilePage } from './pages/authority/ProfilePage';

import { AnimatePresence, motion } from 'motion/react';

// Route wrapper for Home/Landing page (only accessible when not logged in)
const HomeRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg font-sans">
        <div className="text-center space-y-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gov-blue border-t-transparent mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">Validating credentials...</p>
        </div>
      </div>
    );
  }

  if (user) {
    if (user.role === 'authority') {
      return <Navigate to="/authority/dashboard" replace />;
    } else {
      return <Navigate to="/citizen/dashboard" replace />;
    }
  }

  return <PublicLayout><LandingPage /></PublicLayout>;
};

// Secure route wrapper for official administrative dashboard pages
const AuthorityRoute: React.FC<{ children: React.ReactNode; isDepartment?: boolean }> = ({ children, isDepartment }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg font-sans">
        <div className="text-center space-y-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gov-blue border-t-transparent mx-auto" />
          <p className="text-xs text-slate-500 font-semibold">Validating credentials...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'authority') {
    return <Navigate to="/login/authority" state={{ from: location }} replace />;
  }

  if (isDepartment) {
    return (
      <AuthorityProvider>
        {children}
      </AuthorityProvider>
    );
  }

  return (
    <AuthorityProvider>
      <AuthorityLayout>
        {children}
      </AuthorityLayout>
    </AuthorityProvider>
  );
};

// Route wrapper to support clean page transitions
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex-grow flex flex-col"
      >
        <Routes location={location}>
          {/* Public Portal Routes */}
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login/citizen" element={<PublicLayout><CitizenLogin /></PublicLayout>} />
          <Route path="/citizen/signup" element={<PublicLayout><CitizenSignup /></PublicLayout>} />
          <Route path="/citizen/dashboard" element={<PublicLayout><CitizenDashboard /></PublicLayout>} />
          <Route path="/login/authority" element={<PublicLayout><AuthorityLogin /></PublicLayout>} />
          <Route path="/authority/login" element={<PublicLayout><AuthorityLogin /></PublicLayout>} />
          <Route path="/public-dashboard" element={<PublicLayout><PublicDashboard /></PublicLayout>} />
          <Route path="/authorities" element={<PublicLayout><AuthoritiesPage /></PublicLayout>} />

          {/* Secure Authority Console Routes */}
          <Route path="/authority/dashboard" element={<AuthorityRoute><AuthorityDashboard /></AuthorityRoute>} />
          <Route path="/authority/complaints" element={<AuthorityRoute><ComplaintsPage /></AuthorityRoute>} />
          <Route path="/authority/reports" element={<AuthorityRoute><ReportsPage /></AuthorityRoute>} />
          <Route path="/authority/notifications" element={<AuthorityRoute><NotificationsPage /></AuthorityRoute>} />
          <Route path="/authority/profile" element={<AuthorityRoute><ProfilePage /></AuthorityRoute>} />
          <Route path="/authority/dashboard/department" element={<AuthorityRoute><DepartmentDashboard /></AuthorityRoute>} />

          {/* Catch-all redirect to Public Portal Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-brand-bg text-slate-800" id="app-root-layout">
          <AnimatedRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

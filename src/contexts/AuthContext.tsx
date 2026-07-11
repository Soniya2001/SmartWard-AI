import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, role: 'citizen' | 'authority', name?: string) => Promise<void>;
  register: (email: string, name: string, role: 'citizen' | 'authority') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('smartward_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing saved auth user', e);
      }
    }
    // Simulate initial loading sequence for Material Design 3 experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, role: 'citizen' | 'authority', name?: string) => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const displayName = name || email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
        const formattedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        const newUser: User = {
          email,
          name: formattedName,
          role,
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=2563eb&textColor=white`
        };
        setUser(newUser);
        localStorage.setItem('smartward_user', JSON.stringify(newUser));
        setLoading(false);
        resolve();
      }, 600);
    });
  };

  const register = async (email: string, name: string, role: 'citizen' | 'authority') => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          email,
          name,
          role,
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=7c3AED&textColor=white`
        };
        setUser(newUser);
        localStorage.setItem('smartward_user', JSON.stringify(newUser));
        setLoading(false);
        resolve();
      }, 800);
    });
  };

  const logout = async () => {
    setLoading(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null);
        localStorage.removeItem('smartward_user');
        setLoading(false);
        resolve();
      }, 400);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

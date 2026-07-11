import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg text-slate-800" id="public-root-layout">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

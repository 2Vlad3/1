import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-md mx-auto bg-gray-900 min-h-screen">
        <main className="pb-20">
          {children}
        </main>
        <Navigation />
      </div>
    </div>
  );
}
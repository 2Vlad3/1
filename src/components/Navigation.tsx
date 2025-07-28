import React from 'react';
import { Home, Package, User, ArrowRightLeft, Swords, Crown } from 'lucide-react';

interface NavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Головна' },
    { id: 'inventory', icon: Package, label: 'Інвентар' },
    { id: 'trade', icon: ArrowRightLeft, label: 'Обмін' },
    { id: 'battle', icon: Swords, label: 'Битви' },
    { id: 'profile', icon: User, label: 'Профіль' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-800 border-t border-gray-700 z-50">
      <div className="flex justify-around py-2">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange?.(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === id 
                ? 'text-orange-400 bg-gray-700' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
import React from 'react';
import { Coins, Crown, Gift } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onDailyBonus?: () => void;
}

export function Header({ user, onDailyBonus }: HeaderProps) {
  return (
    <header className="bg-gray-800 p-4 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center font-bold">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{user.username}</span>
              {user.isPro && (
                <Crown size={16} className="text-yellow-400" />
              )}
            </div>
            <div className="text-sm text-gray-400">Рівень {user.level}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user.dailyBonusAvailable && (
            <button
              onClick={onDailyBonus}
              className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors"
            >
              <Gift size={20} />
            </button>
          )}
          <div className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded-full">
            <Coins size={16} className="text-yellow-400" />
            <span className="font-semibold">{user.balance}₽</span>
          </div>
        </div>
      </div>
    </header>
  );
}
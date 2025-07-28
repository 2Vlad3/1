import React from 'react';
import { Skin } from '../types';

interface SkinCardProps {
  skin: Skin;
  onSelect?: (skin: Skin) => void;
  selected?: boolean;
  showPrice?: boolean;
}

export function SkinCard({ skin, onSelect, selected, showPrice = true }: SkinCardProps) {
  const getRarityColor = () => {
    switch (skin.rarity) {
      case 'mythic': return 'from-red-500 to-pink-500';
      case 'legendary': return 'from-yellow-500 to-orange-500';
      case 'epic': return 'from-purple-500 to-indigo-500';
      case 'rare': return 'from-blue-500 to-cyan-500';
      case 'uncommon': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRarityName = () => {
    switch (skin.rarity) {
      case 'mythic': return 'Міфічний';
      case 'legendary': return 'Легендарний';
      case 'epic': return 'Епічний';
      case 'rare': return 'Рідкісний';
      case 'uncommon': return 'Незвичайний';
      default: return 'Звичайний';
    }
  };

  return (
    <div 
      className={`bg-gray-800 rounded-lg p-3 cursor-pointer transition-all hover:scale-105 ${
        selected ? 'ring-2 ring-orange-500' : ''
      }`}
      onClick={() => onSelect?.(skin)}
    >
      <div className={`aspect-square bg-gradient-to-br ${getRarityColor()} rounded-lg mb-2 p-0.5`}>
        <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
          <img 
            src={skin.image} 
            alt={skin.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <h4 className="font-semibold text-sm text-center mb-1">{skin.name}</h4>
      <p className="text-xs text-gray-400 text-center mb-2">{skin.weapon}</p>
      
      <div className="flex justify-between items-center">
        {showPrice && (
          <span className="text-yellow-400 font-bold text-sm">{skin.price}₽</span>
        )}
        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getRarityColor()} text-white`}>
          {getRarityName()}
        </span>
      </div>
    </div>
  );
}
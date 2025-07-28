import React from 'react';
import { Case } from '../types';

interface CaseCardProps {
  case: Case;
  onOpen: (caseId: string) => void;
}

export function CaseCard({ case: caseItem, onOpen }: CaseCardProps) {
  const getBorderColor = () => {
    switch (caseItem.type) {
      case 'premium': return 'border-purple-500';
      case 'exclusive': return 'border-yellow-500';
      default: return 'border-gray-600';
    }
  };

  const getGlowColor = () => {
    switch (caseItem.type) {
      case 'premium': return 'shadow-purple-500/20';
      case 'exclusive': return 'shadow-yellow-500/20';
      default: return 'shadow-gray-500/20';
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg border-2 ${getBorderColor()} p-4 hover:scale-105 transition-transform shadow-lg ${getGlowColor()}`}>
      <div className="aspect-square bg-gray-700 rounded-lg mb-3 overflow-hidden">
        <img 
          src={caseItem.image} 
          alt={caseItem.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <h3 className="font-semibold text-center mb-2">{caseItem.name}</h3>
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-yellow-400 font-bold">{caseItem.price}₽</span>
        <span className={`text-xs px-2 py-1 rounded-full ${
          caseItem.type === 'exclusive' ? 'bg-yellow-500/20 text-yellow-400' :
          caseItem.type === 'premium' ? 'bg-purple-500/20 text-purple-400' :
          'bg-gray-600/20 text-gray-400'
        }`}>
          {caseItem.type === 'exclusive' ? 'Ексклюзивний' :
           caseItem.type === 'premium' ? 'Преміум' : 'Стандартний'}
        </span>
      </div>
      
      <button
        onClick={() => onOpen(caseItem.id)}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
      >
        Відкрити
      </button>
    </div>
  );
}
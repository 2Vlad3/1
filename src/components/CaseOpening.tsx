import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Skin } from '../types';
import { SkinCard } from './SkinCard';

interface CaseOpeningProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (skin: Skin) => void;
  skins: Skin[];
  caseName: string;
}

export function CaseOpening({ isOpen, onClose, onComplete, skins, caseName }: CaseOpeningProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [spinItems, setSpinItems] = useState<Skin[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsSpinning(true);
      setSelectedSkin(null);
      setShowResult(false);
      
      // Create spinning items array
      const items = [];
      for (let i = 0; i < 20; i++) {
        items.push(skins[Math.floor(Math.random() * skins.length)]);
      }
      setSpinItems(items);
      setCurrentIndex(0);
      
      // Animate spinning
      const spinInterval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length);
      }, 100);
      
      setTimeout(() => {
        clearInterval(spinInterval);
        const randomSkin = skins[Math.floor(Math.random() * skins.length)];
        setSelectedSkin(randomSkin);
        setIsSpinning(false);
        setShowResult(true);
        
        setTimeout(() => {
          onComplete(randomSkin);
        }, 3000);
      }, 2000);
    }
  }, [isOpen, skins, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Відкриття {caseName}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="text-center">
          {isSpinning && (
            <div className="space-y-4">
              <div className="relative overflow-hidden h-32 bg-gray-700 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-full bg-orange-500 z-10"></div>
                </div>
                <div className="flex transition-transform duration-100 ease-linear h-full items-center">
                  {spinItems.map((skin, index) => (
                    <div 
                      key={index} 
                      className={`min-w-24 h-24 mx-1 rounded-lg p-2 flex flex-col items-center justify-center text-xs ${
                        index === currentIndex ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className="w-12 h-12 bg-gray-500 rounded mb-1"></div>
                      <div className="text-center">
                        <div className="font-semibold truncate w-full">{skin.name.split(' ')[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-300">Відкриваємо кейс...</p>
            </div>
          )}

          {showResult && selectedSkin && (
            <div className="space-y-4">
              <div className="animate-bounce">
                <SkinCard skin={selectedSkin} showPrice={false} />
              </div>
              <div className="space-y-2">
                <p className="text-green-400 font-bold text-lg">Вітаємо!</p>
                <p className="text-gray-300">Ви отримали {selectedSkin.name}</p>
                <p className="text-yellow-400 font-bold">Вартість: {selectedSkin.price}₽</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { CaseCard } from '../components/CaseCard';
import { CaseOpening } from '../components/CaseOpening';
import { User, Case, Skin } from '../types';

interface HomePageProps {
  user: User;
  onUserUpdate: (user: User) => void;
  onSkinAdd: (skin: Skin) => void;
}

export function HomePage({ user, onUserUpdate, onSkinAdd }: HomePageProps) {
  const [openingCase, setOpeningCase] = useState<Case | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showCasePreview, setShowCasePreview] = useState(false);

  const cases: Case[] = [
    {
      id: '1',
      name: 'Новачок',
      price: 50,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      type: 'standard',
      skins: mockSkins.slice(0, 5)
    },
    {
      id: '2',
      name: 'Воїн',
      price: 150,
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      type: 'premium',
      skins: mockSkins.slice(2, 8)
    },
    {
      id: '3',
      name: 'Легенда',
      price: 300,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      type: 'exclusive',
      skins: mockSkins.slice(4, 10)
    },
    {
      id: '4',
      name: 'Майстер',
      price: 500,
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      type: 'premium',
      skins: mockSkins.slice(1, 7)
    },
    {
      id: '5',
      name: 'Чемпіон',
      price: 750,
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      type: 'exclusive',
      skins: mockSkins.slice(3, 9)
    },
    {
      id: '6',
      name: 'Міфічний',
      price: 1000,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      type: 'exclusive',
      skins: mockSkins.slice(5, 10)
    }
  ];

  const handleCasePreview = (caseId: string) => {
    const selectedCase = cases.find(c => c.id === caseId);
    if (selectedCase) {
      setSelectedCase(selectedCase);
      setShowCasePreview(true);
    }
  };

  const handleCaseOpen = (caseId: string) => {
    const selectedCase = cases.find(c => c.id === caseId);
    if (selectedCase && user.balance >= selectedCase.price) {
      setShowCasePreview(false);
      setOpeningCase(selectedCase);
      onUserUpdate({
        ...user,
        balance: user.balance - selectedCase.price,
        casesOpened: user.casesOpened + 1,
        xp: user.xp + 10
      });
    }
  };

  const handleCaseComplete = (skin: Skin) => {
    onSkinAdd(skin);
    setOpeningCase(null);
  };

  const handleDailyBonus = () => {
    onUserUpdate({
      ...user,
      dailyBonusAvailable: false,
      balance: user.balance + 100,
      lastBonusTime: new Date().toISOString()
    });
  };

  return (
    <div>
      <Header user={user} onDailyBonus={handleDailyBonus} />
      
      <div className="p-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            Standoff 2 Cases
          </h1>
          <p className="text-gray-400">Відкривайте кейси та отримуйте унікальні скіни!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {cases.map(caseItem => (
            <CaseCard
              key={caseItem.id}
              case={caseItem}
              onOpen={handleCasePreview}
            />
          ))}
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-4">
          <h3 className="font-bold mb-3">🎁 Щоденний бонус</h3>
          <p className="text-gray-400 text-sm mb-3">
            Отримуйте безкоштовний кейс кожен день!
          </p>
          {user.dailyBonusAvailable ? (
            <button
              onClick={handleDailyBonus}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Забрати бонус (+100₽)
            </button>
          ) : (
            <button disabled className="w-full bg-gray-600 text-gray-400 font-semibold py-2 rounded-lg cursor-not-allowed">
              Бонус буде доступний завтра
            </button>
          )}
        </div>
      </div>

      {/* Case Preview Modal */}
      {showCasePreview && selectedCase && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-sm">
            <div className="text-center mb-4">
              <img 
                src={selectedCase.image} 
                alt={selectedCase.name}
                className="w-24 h-24 mx-auto rounded-lg mb-3"
              />
              <h2 className="text-xl font-bold mb-2">{selectedCase.name}</h2>
              <p className="text-yellow-400 font-bold text-lg">{selectedCase.price}₽</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Можливі дропи:</h3>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {selectedCase.skins.map(skin => (
                  <div key={skin.id} className="bg-gray-700 rounded p-2 text-xs">
                    <div className="font-semibold">{skin.name}</div>
                    <div className="text-gray-400">{skin.weapon}</div>
                    <div className="text-yellow-400">{skin.price}₽</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCasePreview(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Закрити
              </button>
              <button
                onClick={() => handleCaseOpen(selectedCase.id)}
                disabled={user.balance < selectedCase.price}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Відкрити
              </button>
            </div>
          </div>
        </div>
      )}

      <CaseOpening
        isOpen={!!openingCase}
        onClose={() => setOpeningCase(null)}
        onComplete={handleCaseComplete}
        skins={openingCase?.skins || []}
        caseName={openingCase?.name || ''}
      />
    </div>
  );
}

const mockSkins: Skin[] = [
  {
    id: '1',
    name: 'AK-47 | Redline',
    weapon: 'AK-47',
    rarity: 'legendary',
    price: 500,
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'AWP | Dragon Lore',
    weapon: 'AWP',
    rarity: 'mythic',
    price: 1200,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'M4A4 | Howl',
    weapon: 'M4A4',
    rarity: 'epic',
    price: 300,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Glock-18 | Fade',
    weapon: 'Glock-18',
    rarity: 'rare',
    price: 150,
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'USP-S | Kill Confirmed',
    weapon: 'USP-S',
    rarity: 'uncommon',
    price: 80,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Deagle | Blaze',
    weapon: 'Desert Eagle',
    rarity: 'legendary',
    price: 400,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'P90 | Asiimov',
    weapon: 'P90',
    rarity: 'epic',
    price: 250,
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Knife | Karambit Fade',
    weapon: 'Karambit',
    rarity: 'mythic',
    price: 2000,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '9',
    name: 'AK-47 | Fire Serpent',
    weapon: 'AK-47',
    rarity: 'legendary',
    price: 600,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    obtainedAt: new Date().toISOString()
  },
  {
    id: '10',
    name: 'M4A1-S | Hyper Beast',
    weapon: 'M4A1-S',
    rarity: 'rare',
    price: 180,
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    obtainedAt: new Date().toISOString()
  }
];
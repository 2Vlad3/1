import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SkinCard } from '../components/SkinCard';
import { Package, Hammer, ArrowRightLeft } from 'lucide-react';
import { User, Skin } from '../types';

interface InventoryPageProps {
  user: User;
  inventory: Skin[];
  onUserUpdate: (user: User) => void;
  onInventoryUpdate: (inventory: Skin[]) => void;
}

export function InventoryPage({ user, inventory, onUserUpdate, onInventoryUpdate }: InventoryPageProps) {
  const [selectedSkins, setSelectedSkins] = useState<Skin[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const filteredInventory = inventory.filter(skin => {
    if (filter === 'all') return true;
    return skin.rarity === filter;
  });

  const handleSkinSelect = (skin: Skin) => {
    setSelectedSkins(prev => {
      if (prev.find(s => s.id === skin.id)) {
        return prev.filter(s => s.id !== skin.id);
      }
      return [...prev, skin];
    });
  };

  const handleCraft = () => {
    if (selectedSkins.length >= 5) {
      const totalValue = selectedSkins.reduce((sum, skin) => sum + skin.price, 0);
      const craftedValue = Math.floor(totalValue * 0.8);
      
      // Remove selected skins from inventory
      const newInventory = inventory.filter(skin => !selectedSkins.find(s => s.id === skin.id));
      onInventoryUpdate(newInventory);
      
      onUserUpdate({
        ...user,
        balance: user.balance + craftedValue,
        xp: user.xp + 25
      });
      
      setSelectedSkins([]);
    }
  };

  const handleSell = () => {
    if (selectedSkins.length > 0) {
      const totalValue = selectedSkins.reduce((sum, skin) => sum + skin.price, 0);
      const sellValue = Math.floor(totalValue * 0.7);
      
      // Remove selected skins from inventory
      const newInventory = inventory.filter(skin => !selectedSkins.find(s => s.id === skin.id));
      onInventoryUpdate(newInventory);
      
      onUserUpdate({
        ...user,
        balance: user.balance + sellValue
      });
      
      setSelectedSkins([]);
    }
  };

  const rarityFilters = [
    { key: 'all', label: 'Всі', count: inventory.length },
    { key: 'mythic', label: 'Міфічні', count: inventory.filter(s => s.rarity === 'mythic').length },
    { key: 'legendary', label: 'Легендарні', count: inventory.filter(s => s.rarity === 'legendary').length },
    { key: 'epic', label: 'Епічні', count: inventory.filter(s => s.rarity === 'epic').length },
    { key: 'rare', label: 'Рідкісні', count: inventory.filter(s => s.rarity === 'rare').length },
  ];

  return (
    <div>
      <Header user={user} />
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Package size={24} className="text-orange-400" />
          <h1 className="text-2xl font-bold">Інвентар</h1>
          <span className="text-gray-400">({inventory.length})</span>
        </div>

        {/* Rarity Filter */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {rarityFilters.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                filter === key 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        {selectedSkins.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Вибрано: {selectedSkins.length}</span>
              <span className="text-yellow-400 font-bold">
                {selectedSkins.reduce((sum, skin) => sum + skin.price, 0)}₽
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handleSell}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowRightLeft size={16} />
                <span>Продати (70%)</span>
              </button>
              
              {selectedSkins.length >= 5 && (
                <button
                  onClick={handleCraft}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Hammer size={16} />
                  <span>Крафт (5+)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Inventory Grid */}
        {filteredInventory.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredInventory.map(skin => (
              <SkinCard
                key={skin.id}
                skin={skin}
                onSelect={handleSkinSelect}
                selected={selectedSkins.some(s => s.id === skin.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto mb-4 text-gray-500" />
            <h3 className="text-lg font-semibold mb-2">Інвентар порожній</h3>
            <p className="text-gray-400">Відкрийте кейси, щоб отримати скіни!</p>
          </div>
        )}
      </div>
    </div>
  );
}
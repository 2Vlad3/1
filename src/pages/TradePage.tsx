import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SkinCard } from '../components/SkinCard';
import { ArrowRightLeft, Plus, Users, Clock } from 'lucide-react';
import { User, Skin, Trade } from '../types';

interface TradePageProps {
  user: User;
  inventory: Skin[];
  onUserUpdate: (user: User) => void;
}

export function TradePage({ user, inventory, onUserUpdate }: TradePageProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'active' | 'history'>('create');
  const [selectedSkins, setSelectedSkins] = useState<Skin[]>([]);
  const [tradePartner, setTradePartner] = useState('');

  const activeTrades: Trade[] = [
    {
      id: '1',
      from: user,
      to: { ...user, id: '2', username: 'Player123' },
      fromSkins: inventory.slice(0, 2),
      toSkins: inventory.slice(2, 4),
      status: 'pending'
    }
  ];

  const handleSkinSelect = (skin: Skin) => {
    setSelectedSkins(prev => {
      if (prev.find(s => s.id === skin.id)) {
        return prev.filter(s => s.id !== skin.id);
      }
      if (prev.length < 5) {
        return [...prev, skin];
      }
      return prev;
    });
  };

  const handleCreateTrade = () => {
    if (selectedSkins.length > 0 && tradePartner.trim()) {
      // Create trade logic
      console.log('Creating trade with:', tradePartner, selectedSkins);
      setSelectedSkins([]);
      setTradePartner('');
    }
  };

  const tabs = [
    { id: 'create', label: 'Створити', icon: Plus },
    { id: 'active', label: 'Активні', icon: Clock },
    { id: 'history', label: 'Історія', icon: ArrowRightLeft }
  ];

  return (
    <div>
      <Header user={user} />
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <ArrowRightLeft size={24} className="text-orange-400" />
          <h1 className="text-2xl font-bold">Обмін</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors ${
                activeTab === id
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'create' && (
          <div className="space-y-6">
            {/* Trade Partner */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold mb-3 flex items-center space-x-2">
                <Users size={20} />
                <span>Партнер для обміну</span>
              </h3>
              <input
                type="text"
                placeholder="Введіть username або ID гравця"
                value={tradePartner}
                onChange={(e) => setTradePartner(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Selected Skins */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold mb-3">
                Ваші скіни для обміну ({selectedSkins.length}/5)
              </h3>
              
              {selectedSkins.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {selectedSkins.map(skin => (
                    <SkinCard
                      key={skin.id}
                      skin={skin}
                      onSelect={handleSkinSelect}
                      selected={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <ArrowRightLeft size={32} className="mx-auto mb-2 opacity-50" />
                  <p>Виберіть скіни для обміну</p>
                </div>
              )}

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Загальна вартість:</span>
                <span className="text-yellow-400 font-bold">
                  {selectedSkins.reduce((sum, skin) => sum + skin.price, 0)}₽
                </span>
              </div>

              <button
                onClick={handleCreateTrade}
                disabled={selectedSkins.length === 0 || !tradePartner.trim()}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Створити пропозицію обміну
              </button>
            </div>

            {/* Inventory */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold mb-3">Ваш інвентар</h3>
              {inventory.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {inventory.map(skin => (
                    <SkinCard
                      key={skin.id}
                      skin={skin}
                      onSelect={handleSkinSelect}
                      selected={selectedSkins.some(s => s.id === skin.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>Інвентар порожній</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeTrades.length > 0 ? (
              activeTrades.map(trade => (
                <div key={trade.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Обмін з {trade.to.username}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      trade.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      trade.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {trade.status === 'pending' ? 'Очікування' :
                       trade.status === 'accepted' ? 'Прийнято' : 'Відхилено'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Ви даєте:</p>
                      <div className="space-y-2">
                        {trade.fromSkins.map(skin => (
                          <div key={skin.id} className="flex items-center space-x-2 text-sm">
                            <div className="w-8 h-8 bg-gray-700 rounded"></div>
                            <span>{skin.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Ви отримуєте:</p>
                      <div className="space-y-2">
                        {trade.toSkins.map(skin => (
                          <div key={skin.id} className="flex items-center space-x-2 text-sm">
                            <div className="w-8 h-8 bg-gray-700 rounded"></div>
                            <span>{skin.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                      Прийняти
                    </button>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors">
                      Відхилити
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Clock size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-lg font-semibold mb-2">Немає активних обмінів</h3>
                <p className="text-gray-400">Створіть нову пропозицію обміну</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="text-center py-12">
            <ArrowRightLeft size={48} className="mx-auto mb-4 text-gray-500" />
            <h3 className="text-lg font-semibold mb-2">Історія обмінів порожня</h3>
            <p className="text-gray-400">Ваші завершені обміни будуть тут</p>
          </div>
        )}
      </div>
    </div>
  );
}
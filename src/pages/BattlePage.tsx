import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SkinCard } from '../components/SkinCard';
import { Swords, Users, Trophy, Clock } from 'lucide-react';
import { User, Skin, Battle } from '../types';

interface BattlePageProps {
  user: User;
  inventory: Skin[];
  onUserUpdate: (user: User) => void;
}

export function BattlePage({ user, inventory, onUserUpdate }: BattlePageProps) {
  const [activeTab, setActiveTab] = useState<'create' | 'join' | 'active'>('create');
  const [selectedSkins, setSelectedSkins] = useState<Skin[]>([]);
  const [battleMode, setBattleMode] = useState<'1v1' | '2v2'>('1v1');

  const activeBattles: Battle[] = [
    {
      id: '1',
      player1: { ...user, username: 'Player456' },
      player2: undefined,
      stakes: inventory.slice(0, 2),
      status: 'waiting'
    },
    {
      id: '2',
      player1: { ...user, username: 'ProGamer' },
      player2: user,
      stakes: inventory.slice(2, 4),
      status: 'active'
    }
  ];

  const handleSkinSelect = (skin: Skin) => {
    const maxSkins = battleMode === '1v1' ? 3 : 5;
    setSelectedSkins(prev => {
      if (prev.find(s => s.id === skin.id)) {
        return prev.filter(s => s.id !== skin.id);
      }
      if (prev.length < maxSkins) {
        return [...prev, skin];
      }
      return prev;
    });
  };

  const handleCreateBattle = () => {
    if (selectedSkins.length > 0) {
      // Create battle logic
      console.log('Creating battle with skins:', selectedSkins);
      setSelectedSkins([]);
    }
  };

  const handleJoinBattle = (battleId: string) => {
    // Join battle logic
    console.log('Joining battle:', battleId);
  };

  const tabs = [
    { id: 'create', label: 'Створити', icon: Swords },
    { id: 'join', label: 'Приєднатися', icon: Users },
    { id: 'active', label: 'Активні', icon: Clock }
  ];

  return (
    <div>
      <Header user={user} />
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Swords size={24} className="text-orange-400" />
          <h1 className="text-2xl font-bold">Битви за кейси</h1>
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
            {/* Battle Mode */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold mb-3">Режим битви</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setBattleMode('1v1')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    battleMode === '1v1'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  1 vs 1 (до 3 скінів)
                </button>
                <button
                  onClick={() => setBattleMode('2v2')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    battleMode === '2v2'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  2 vs 2 (до 5 скінів)
                </button>
              </div>
            </div>

            {/* Selected Skins */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-bold mb-3">
                Ваша ставка ({selectedSkins.length}/{battleMode === '1v1' ? 3 : 5})
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
                  <Swords size={32} className="mx-auto mb-2 opacity-50" />
                  <p>Виберіть скіни для битви</p>
                </div>
              )}

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Загальна вартість:</span>
                <span className="text-yellow-400 font-bold">
                  {selectedSkins.reduce((sum, skin) => sum + skin.price, 0)}₽
                </span>
              </div>

              <button
                onClick={handleCreateBattle}
                disabled={selectedSkins.length === 0}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Створити битву
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

        {activeTab === 'join' && (
          <div className="space-y-4">
            {activeBattles.filter(battle => battle.status === 'waiting').length > 0 ? (
              activeBattles
                .filter(battle => battle.status === 'waiting')
                .map(battle => (
                  <div key={battle.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold">
                          {battle.player1.username[0].toUpperCase()}
                        </div>
                        <div>
                          <span className="font-semibold">{battle.player1.username}</span>
                          <div className="text-sm text-gray-400">Очікує опонента</div>
                        </div>
                      </div>
                      <span className="text-yellow-400 font-bold">
                        {battle.stakes.reduce((sum, skin) => sum + skin.price, 0)}₽
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">Ставка:</p>
                      <div className="flex space-x-2">
                        {battle.stakes.map(skin => (
                          <div key={skin.id} className="flex items-center space-x-1 text-xs bg-gray-700 px-2 py-1 rounded">
                            <div className="w-4 h-4 bg-gray-600 rounded"></div>
                            <span>{skin.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleJoinBattle(battle.id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors"
                    >
                      Приєднатися до битви
                    </button>
                  </div>
                ))
            ) : (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-lg font-semibold mb-2">Немає доступних битв</h3>
                <p className="text-gray-400">Створіть власну битву або зачекайте</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeBattles.filter(battle => battle.status === 'active').length > 0 ? (
              activeBattles
                .filter(battle => battle.status === 'active')
                .map(battle => (
                  <div key={battle.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center space-x-4 mb-2">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold mb-1">
                            {battle.player1.username[0].toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold">{battle.player1.username}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Swords size={24} className="text-red-500" />
                          <span className="text-red-500 font-bold">VS</span>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center font-bold mb-1">
                            {battle.player2?.username[0].toUpperCase()}
                          </div>
                          <span className="text-sm font-semibold">{battle.player2?.username}</span>
                        </div>
                      </div>
                      
                      <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3">
                        <div className="flex items-center justify-center space-x-2 text-red-400">
                          <Clock size={16} />
                          <span className="font-semibold">Битва активна</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">Очікуйте результатів...</p>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-12">
                <Trophy size={48} className="mx-auto mb-4 text-gray-500" />
                <h3 className="text-lg font-semibold mb-2">Немає активних битв</h3>
                <p className="text-gray-400">Створіть нову битву або приєднайтеся до існуючої</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
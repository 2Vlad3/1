import React from 'react';
import { Header } from '../components/Header';
import { Crown, Users, Package, TrendingUp, Calendar, Gift } from 'lucide-react';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export function ProfilePage({ user, onUserUpdate }: ProfilePageProps) {
  const handleUpgradeToPro = () => {
    onUserUpdate({
      ...user,
      isPro: true,
      balance: user.balance - 500
    });
  };

  const achievements = [
    { name: 'Новачок', description: 'Відкрив перший кейс', unlocked: user.casesOpened > 0 },
    { name: 'Колекціонер', description: 'Відкрив 10 кейсів', unlocked: user.casesOpened >= 10 },
    { name: 'Щасливчик', description: 'Отримав легендарний скін', unlocked: user.casesOpened >= 5 },
    { name: 'Pro гравець', description: 'Отримав Pro статус', unlocked: user.isPro }
  ];

  return (
    <div>
      <Header user={user} />
      
      <div className="p-4 space-y-6">
        {/* Profile Stats */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <TrendingUp size={24} className="text-orange-400" />
            <span>Статистика</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <Package size={24} className="mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold">{user.casesOpened}</div>
              <div className="text-sm text-gray-400">Кейсів відкрито</div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <Users size={24} className="mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold">{user.referralsCount}</div>
              <div className="text-sm text-gray-400">Друзів запрошено</div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <TrendingUp size={24} className="mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold">{user.level}</div>
              <div className="text-sm text-gray-400">Рівень</div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-3 text-center">
              <Calendar size={24} className="mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold">{Math.floor(Math.random() * 30) + 1}</div>
              <div className="text-sm text-gray-400">Днів активності</div>
            </div>
          </div>
        </div>

        {/* Pro Status */}
        {!user.isPro && (
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
              <Crown size={24} />
              <span>Pro Статус</span>
            </h3>
            <p className="text-sm mb-4 opacity-90">
              Отримайте додаткові переваги: 3 кейси на тиждень, +5% до шансів, пріоритет в обмінах
            </p>
            <button
              onClick={handleUpgradeToPro}
              disabled={user.balance < 500}
              className="w-full bg-white text-orange-600 font-bold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              Оформити Pro за 500₽
            </button>
          </div>
        )}

        {user.isPro && (
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
              <Crown size={24} />
              <span>Pro Статус активний</span>
            </h3>
            <p className="text-sm opacity-90">
              Ви маєте всі переваги Pro підписки!
            </p>
          </div>
        )}

        {/* Referral System */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
            <Users size={20} className="text-blue-400" />
            <span>Реферальна система</span>
          </h3>
          
          <div className="space-y-3">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="text-sm text-gray-400 mb-1">Ваш реферальний код:</div>
              <div className="font-mono bg-gray-600 p-2 rounded text-center">{user.referralCode}</div>
            </div>
            
            <div className="text-sm text-gray-400">
              За кожного друга отримуєте безкоштовний кейс!
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
              Поділитися посиланням
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
            <Gift size={20} className="text-purple-400" />
            <span>Досягнення</span>
          </h3>
          
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-2 rounded-lg ${
                  achievement.unlocked ? 'bg-green-600/20 border border-green-600/30' : 'bg-gray-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.unlocked ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  {achievement.unlocked ? '✓' : '?'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{achievement.name}</div>
                  <div className="text-sm text-gray-400">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-3">Інформація про акаунт</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Дата реєстрації:</span>
              <span>{new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">User ID:</span>
              <span className="font-mono">#{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Статус:</span>
              <span className={user.isPro ? 'text-yellow-400' : 'text-gray-300'}>
                {user.isPro ? 'Pro' : 'Звичайний'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
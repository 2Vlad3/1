import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { InventoryPage } from './pages/InventoryPage';
import { TradePage } from './pages/TradePage';
import { BattlePage } from './pages/BattlePage';
import { User, Skin } from './types';
import { getTelegramUser, initTelegramWebApp } from './utils/telegram';
import { saveUserData, loadUserData, saveInventory, loadInventory, checkDailyBonus } from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  
  const [user, setUser] = useState<User | null>(null);
  const [inventory, setInventory] = useState<Skin[]>([]);

  useEffect(() => {
    initTelegramWebApp();
    
    // Load user data
    const telegramUser = getTelegramUser();
    const savedUser = loadUserData();
    const savedInventory = loadInventory();
    
    if (savedUser) {
      // Update daily bonus availability
      const dailyBonusAvailable = checkDailyBonus();
      setUser({
        ...savedUser,
        dailyBonusAvailable
      });
    } else if (telegramUser) {
      // Create new user from Telegram data
      const newUser: User = {
        id: telegramUser.id.toString(),
        username: telegramUser.username || telegramUser.first_name,
        balance: 1500,
        level: 1,
        xp: 0,
        isPro: false,
        casesOpened: 0,
        referralCode: `REF${telegramUser.id}`,
        referralsCount: 0,
        joinDate: new Date().toISOString(),
        dailyBonusAvailable: true
      };
      setUser(newUser);
      saveUserData(newUser);
    } else {
      // Fallback for development
      const defaultUser: User = {
        id: '1',
        username: 'Player',
        balance: 1500,
        level: 5,
        xp: 250,
        isPro: false,
        casesOpened: 12,
        referralCode: 'REF123456',
        referralsCount: 3,
        joinDate: '2024-01-01',
        dailyBonusAvailable: true
      };
      setUser(defaultUser);
    }
    
    setInventory(savedInventory);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      saveUserData(user);
    }
  }, [user]);

  useEffect(() => {
    saveInventory(inventory);
  }, [inventory]);

  const handleSkinAdd = (skin: Skin) => {
    const newSkin = {
      ...skin,
      id: Date.now().toString(),
      obtainedAt: new Date().toISOString()
    };
    setInventory(prev => [...prev, newSkin]);
  };

  const handleInventoryUpdate = (newInventory: Skin[]) => {
    setInventory(newInventory);
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Завантаження...</p>
        </div>
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage user={user} onUserUpdate={handleUserUpdate} onSkinAdd={handleSkinAdd} />;
      case 'inventory':
        return <InventoryPage user={user} inventory={inventory} onUserUpdate={handleUserUpdate} onInventoryUpdate={handleInventoryUpdate} />;
      case 'trade':
        return <TradePage user={user} inventory={inventory} onUserUpdate={handleUserUpdate} />;
      case 'battle':
        return <BattlePage user={user} inventory={inventory} onUserUpdate={handleUserUpdate} />;
      case 'profile':
        return <ProfilePage user={user} onUserUpdate={handleUserUpdate} />;
      default:
        return <HomePage user={user} onUserUpdate={handleUserUpdate} onSkinAdd={handleSkinAdd} />;
    }
  };

  return (
    <Layout>
      {renderActivePage()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </Layout>
  );
}

export default App;
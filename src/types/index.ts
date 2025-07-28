export interface User {
  id: string;
  username: string;
  balance: number;
  level: number;
  xp: number;
  isPro: boolean;
  casesOpened: number;
  referralCode: string;
  referralsCount: number;
  joinDate: string;
  dailyBonusAvailable: boolean;
  lastBonusTime?: string;
}

export interface Skin {
  id: string;
  name: string;
  weapon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  price: number;
  image: string;
  obtainedAt: string;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  image: string;
  skins: Skin[];
  type: 'standard' | 'premium' | 'exclusive';
}

export interface Battle {
  id: string;
  player1: User;
  player2?: User;
  stakes: Skin[];
  status: 'waiting' | 'active' | 'completed';
  winner?: string;
}

export interface Trade {
  id: string;
  from: User;
  to: User;
  fromSkins: Skin[];
  toSkins: Skin[];
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}
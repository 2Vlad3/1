import { User, Skin } from '../types';

const STORAGE_KEYS = {
  USER: 'standoff2_user',
  INVENTORY: 'standoff2_inventory',
  LAST_BONUS: 'standoff2_last_bonus'
};

export const saveUserData = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const loadUserData = (): User | null => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const saveInventory = (inventory: Skin[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  } catch (error) {
    console.error('Error saving inventory:', error);
  }
};

export const loadInventory = (): Skin[] => {
  try {
    const inventoryData = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    return inventoryData ? JSON.parse(inventoryData) : [];
  } catch (error) {
    console.error('Error loading inventory:', error);
    return [];
  }
};

export const checkDailyBonus = (): boolean => {
  try {
    const lastBonus = localStorage.getItem(STORAGE_KEYS.LAST_BONUS);
    if (!lastBonus) return true;
    
    const lastBonusDate = new Date(lastBonus);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastBonusDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays >= 1;
  } catch (error) {
    console.error('Error checking daily bonus:', error);
    return true;
  }
};

export const setDailyBonusClaimed = (): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_BONUS, new Date().toISOString());
  } catch (error) {
    console.error('Error setting daily bonus:', error);
  }
};
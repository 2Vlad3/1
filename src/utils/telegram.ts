// Telegram WebApp utilities
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          onClick: (callback: () => void) => void;
        };
        BackButton: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
      };
    };
  }
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export const getTelegramUser = (): TelegramUser | null => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp.initDataUnsafe.user || null;
  }
  return null;
};

export const initTelegramWebApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
};

export const closeTelegramWebApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
};
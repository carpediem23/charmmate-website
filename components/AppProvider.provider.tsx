'use client';

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import { TAppProiderProps } from '@/types/components.type';
import { useAuthStore } from '@/store/auth.store';
import { isAuthenticated } from '@/actions/auth.action';

interface AppContextProps {
  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<TAppProiderProps> = ({ children }) => {
  const [state, setState] = useState<any>(null);
  const { setAuthenticated } = useAuthStore();

  useLayoutEffect(() => {
    async function init() {
      setAuthenticated(await isAuthenticated());
    }

    init();
  }, [state, setAuthenticated]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

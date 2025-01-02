import { ReactNode } from 'react';

export type TAppProiderProps = {
  children: ReactNode;
};

export type TAppContextProps = {
  state: unknown;
  setState: React.Dispatch<React.SetStateAction<unknown>>;
};

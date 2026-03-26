import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IUser } from '../interfaces';

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: IUser) => set(() => ({ user })),
      clearUser: () => set({ user: null }),
    }),
    { name: 'user-storage' },
  ),
);

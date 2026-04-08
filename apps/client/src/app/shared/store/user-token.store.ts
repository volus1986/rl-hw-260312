import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ITokenStore {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const userTokenStore = create<ITokenStore>()(
  persist(
    (set) => ({
      token: '',
      setToken: (token: string) => set(() => ({ token })),
      clearToken: () => set({ token: '' }),
    }),
    { name: 'user-token-storage' },
  ),
);

export { userTokenStore };

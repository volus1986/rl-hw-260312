import { create } from "zustand";

type TokenStore = {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
};

const useToken = create<TokenStore>((set) => ({
  token: "",
  setToken: (token: string) => set(() => ({ token })),
  clearToken: () => set({ token: "" }),
}));

export { useToken };

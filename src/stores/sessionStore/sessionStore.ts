import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  accessToken: string;
  expiresIn: number;
  setSession: (token: string, expires: number) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      accessToken: '',
      expiresIn: 0,
      setSession: (token, expires) => set(() => ({
        accessToken: token,
        expiresIn: expires,
      })),
      clearSession: () => set(() => ({
        accessToken: '',
        expiresIn: 0,
      })),
      isAuthenticated: () => {
        const { accessToken, expiresIn } = get();
        const now = Math.floor(Date.now() / 1000);
        return !!accessToken && now < expiresIn;
      }
    }),
    {
      name: 'user-session',
    }
  )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SessionStore } from "./sessionStore.type";

const useSessionStore = create<SessionStore>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            setIsLoggedIn: (value) => set(() => ({ isLoggedIn: value }))
        }),
        {
            name: "user-session"
        }
    )
)

export { useSessionStore }
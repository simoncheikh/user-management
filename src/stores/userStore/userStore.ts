// store/userStore.ts
import { create } from "zustand";

interface UserStore {
    isContainerOpen: boolean;
    setIsContainerOpen: (value: boolean) => void;
    openCreateUser: () => void;
    closeContainer: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    isContainerOpen: false,
    setIsContainerOpen: (value) => set({ isContainerOpen: value }),
    openCreateUser: () => set({ isContainerOpen: true }),
    closeContainer: () => set({ isContainerOpen: false }),
}));

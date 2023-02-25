import { create } from 'zustand';

export const useAppStore = create((set) => ({
    userInfo: {},
    setUserInfo: () => set((payload) => { userInfo: payload })
}))
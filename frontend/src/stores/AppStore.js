import { create } from 'zustand';

export const useAppStore = create((set) => ({
    userInfo: {},
    setUserInfo: (payload) => { set({ userInfo: payload }) }

}))

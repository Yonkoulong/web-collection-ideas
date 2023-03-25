import { create } from 'zustand';

export const useIdeaStore = create((set) => ({
    ideas: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload})),
    setIdeas: () => set((payload) => ({ ideas: payload }))
}))
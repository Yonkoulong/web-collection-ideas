import { create } from 'zustand';
import { getIdeas } from "@/services/idea.services";

export const useIdeaStore = create((set) => ({
    ideas: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload})),

    fetchIdeas: async () => {
        const response = await getIdeas();
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }
}))
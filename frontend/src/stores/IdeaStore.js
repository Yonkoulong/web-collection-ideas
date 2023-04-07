import { create } from 'zustand';
import { getIdeaFilter, getIdeaMostLike, getIdeasMostView, getIdeasLatest } from "@/services/idea.services";

export const useIdeaStore = create((set) => ({
    ideas: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload})),

    fetchIdeas: async (payload) => {
        const response = await getIdeaFilter(payload);
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },

    fetchIdeaMostLike: async (payload) => {
        const response = await getIdeaMostLike();
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },
    fetchIdeaMostView: async () => {
        const response = await getIdeasMostView();
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },
    fetchIdeaLatest: async () => {
        const response = await getIdeasLatest();
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }
}))
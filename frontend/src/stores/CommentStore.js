import { create } from 'zustand';
import { getComment } from "@/services/comment.services";

export const useIdeaStore = create((set) => ({
    comments: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload})),

    fetchIdeas: async (payload) => {
        const response = await getComment(payload);
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }
}))
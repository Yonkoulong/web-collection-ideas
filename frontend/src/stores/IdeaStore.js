import { create } from 'zustand';
import { getIdeaFilter, getIdeaMostLike, getIdeasMostView, getIdeasLatest, getIdeaMostComment, searchIdea } from "@/services/idea.services";

export const useIdeaStore = create((set) => ({
    ideas: [],
    ideasFiltered: [],
    isSearching: false,
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload})),
    setIsSearching: () => set((payload) => ({ isSearching: payload })),
   
    fetchIdeas: async (payload) => {
        const response = await getIdeaFilter(payload);
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },

    fetchIdeaMostLike: async (payload) => {
        const response = await getIdeaMostLike(payload);
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },
    fetchIdeaMostView: async (payload) => {
        const response = await getIdeasMostView(payload);
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },
    fetchIdeaLatest: async (payload) => {
        const response = await getIdeasLatest(payload);
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },
    fetchIdeaMostComment: async (payload) => {
        const response = await getIdeaMostComment(payload);
        if(response) {
            set({ ideas: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },
    filterIdeas: async (payload) => {
        const response = await searchIdea(payload);
        if(response) {
            set({ ideasFiltered: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }
}))
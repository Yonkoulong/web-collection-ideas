import { create } from 'zustand';
import { getCategory } from '@/services/qam.services';

export const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload})),

    fetchCategorys: async () => {
        const response = await getCategory();
        if(response) {
            set({ categories: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }
}))
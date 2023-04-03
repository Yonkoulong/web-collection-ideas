import { create } from 'zustand';
import { getCampaign } from '@/services/admin.services';

export const useCampaignStore = create((set) => ({
    campaigns: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload})),

    fetchCampaigns: async (payload) => {
        console.log(payload);
        const response = await getCampaign(payload);
        if(response) {
            set({ campaigns: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }
}))
import { create } from 'zustand';
import { getAccount } from '@/services/admin.services';

export const useAccountStore = create((set) => ({
    accounts: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload })),

    fetchAccounts: async () => {
        const response = await getAccount();
        if (response) {
            set({ accounts: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }

}))
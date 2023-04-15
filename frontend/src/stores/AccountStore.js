import { create } from 'zustand';
import { getAccount, postSearchAccount } from '@/services/admin.services';

export const useAccountStore = create((set) => ({
    accounts: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload })),

    searchAccounts: async (payload) => {
        const response = await postSearchAccount(payload);

        if (response) {
            set({ accounts: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },

    fetchAccounts: async () => {
        const response = await getAccount();
        if (response) {
            set({ accounts: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }

}))
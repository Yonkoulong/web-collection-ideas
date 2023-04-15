import { create } from 'zustand';
import { getDepartment, postSearchDepartment } from '@/services/admin.services';

export const useDepartmentStore = create((set) => ({
    departments: [],
    loading: false,
    totalRecord: 0,
    setLoading: () => set((payload) => ({ loading: payload})),

    searchDepartments: async (payload) => {
        const response = await postSearchDepartment(payload);

        if(response) {
            set({ departments: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    },

    fetchDepartments: async () => {
        const response = await getDepartment();
        if(response) {
            set({ departments: response?.data?.data })
            set({ loading: false })
            set({ totalRecord: response?.data?.data?.length })
        }
    }
}))
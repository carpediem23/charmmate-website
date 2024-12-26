import { create } from 'zustand';
import { TLoginFormValues, TAuthState } from '@/types/auth.type';
import axiosInstance from '@/lib/axios.lib';

export const useAuthStore = create<TAuthState>()((set) => ({
  token: null,
  authenticated: false,
  loading: false,
  error: null,
  login: async (values: TLoginFormValues) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/api/auth/login', values);
      const result = response.data;

      if (result.success) {
        set({
          token: result.access_token,
          authenticated: true,
          error: null,
        });
      } else {
        set({ error: result.message || 'Login failed' });
      }
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || 'An error occurred during login',
      });
    }
    set({ loading: false });
  },
  logout: async () => {
    await axiosInstance.post('/api/auth/logout');
    set({ token: null, authenticated: false });
  },
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
}));

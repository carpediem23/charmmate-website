import { create } from 'zustand';
import { TLoginFormValues, TAuthState } from '@/types/auth.type';
import { loginAction, logoutAction } from '@/actions/auth.action';

export const useAuthStore = create<TAuthState>()((set) => ({
  token: null,
  authenticated: false,
  loading: false,
  error: null,
  login: async (values: TLoginFormValues) => {
    set({ loading: true, error: null });
    try {
      const result = await loginAction(values);

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
        error: 'An error occurred during login',
      });
    }
    set({ loading: false });
  },
  logout: async () => {
    try {
      const result = await logoutAction();

      if (result.success) {
        set({ token: null, authenticated: false });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
}));

import { create } from 'zustand';
import { TLoginFormValues, TAuthState } from '@/types/auth.type';
import { loginAction, logoutAction } from '@/actions/auth/index.action';

export const useAuthStore = create<TAuthState>()((set) => ({
  token: null,
  authenticated: false,
  loading: false,
  error: null,
  login: async (values: TLoginFormValues) => {
    set({ loading: true, error: null });
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

    set({ loading: false });
  },
  logout: async () => {
    await logoutAction();
    set({ token: null, authenticated: false });
  },
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
}));

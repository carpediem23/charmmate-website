import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginAction } from '@/actions/auth/index.action';
import { TLoginFormValues, TAuthState } from '@/types/auth.type';

export const useAuthStore = create<TAuthState>()(
  persist(
    (set) => ({
      token: null,
      authenticated: false,
      loading: false,
      error: null,
      handleLogin: async (values: TLoginFormValues) => {
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
      logout: () => set({ token: null, authenticated: false }),
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading: loading }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

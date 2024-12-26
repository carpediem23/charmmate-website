import Error from 'next/error';

export type TLoginFormValues = {
  email: string;
  password: string;
};

export type TRegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type TAuthState = {
  token: string | null;
  authenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (values: TLoginFormValues) => Promise<void>;
  logout: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
};

export type TLoginResponse = {
  access_token?: string;
  message?: string;
  success?: boolean;
};

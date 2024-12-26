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

export type TLoginResponse = {
  access_token?: string;
  error?: Error;
};

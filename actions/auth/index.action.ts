'use server';

import axiosInstance from '@/lib/axios.lib';
import { TLoginFormValues, TLoginResponse } from '@/types/auth.type';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';

export async function loginAction(
  formData: TLoginFormValues,
): Promise<TLoginResponse> {
  try {
    const response = await axiosInstance.post(
      `${process.env.API_URL}/v1/auth/login`,
      formData,
    );
    const cookieStore = await cookies();
    const serializedCookie = serialize(
      'access_token',
      response.data.access_token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 * 4 * 6,
        path: '/',
      },
    );

    cookieStore.set('auth', serializedCookie);

    return {
      success: true,
      access_token: response.data.access_token,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
}

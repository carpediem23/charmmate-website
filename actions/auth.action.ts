'use server';

import { cookies } from 'next/headers';
import { serialize } from 'cookie';
import { TLoginFormValues } from '@/types/auth.type';
import axiosInstance from '@/lib/axios.lib';

export async function loginAction(values: TLoginFormValues) {
  try {
    const response = await axiosInstance.post(
      `${process.env.API_URL}/v1/auth/login`,
      values,
    );

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

    const cookieStore = await cookies();
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

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('auth');

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed',
    };
  }
}

export async function isAuthenticated() {
  const cookieStore = await cookies();

  return cookieStore.has('auth');
}

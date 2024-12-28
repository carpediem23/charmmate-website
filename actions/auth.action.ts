'use server';

import { TLoginFormValues } from '@/types/auth.type';
import axiosInstance from '@/lib/axios.lib';
import { validateCsrfToken, generateCsrfToken } from '@/lib/csrf.lib';
import { setCookie, deleteCookie, getCookie } from '@/lib/cookie.lib';
import { randomBytes } from 'crypto';
import { fetchCsrfToken } from '@/actions/csrf.action';

export async function loginAction(values: TLoginFormValues) {
  let csrfToken = values.csrfToken;
  let csrfSecret = await getCookie('csrf_secret');

  if (!csrfSecret || !validateCsrfToken(csrfSecret, csrfToken)) {
    return {
      success: false,
      message: 'CSRF token expired, please try again',
      csrfExpired: true,
    };
  }

  try {
    const response = await axiosInstance.post(
      `${process.env.API_URL}/v1/auth/login`,
      values,
    );

    await setCookie('access_token', response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 * 4 * 2,
      path: '/',
    });

    return {
      success: true,
      access_token: response.data.access_token,
    };
  } catch (error: any) {
    console.error('Login error:', error);

    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
}

export async function logoutAction() {
  try {
    await deleteCookie('auth');

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
  const authCookie = await getCookie('auth');
  return authCookie !== null;
}

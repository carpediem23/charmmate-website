'use server';

import { TLoginFormValues } from '@/types/auth.type';
import axiosInstance from '@/lib/axios.lib';
import { validateCsrfToken } from '@/lib/csrf.lib';
import { setCookie, deleteCookie, getCookie } from '@/lib/cookie.lib';
import { TServiceResponse } from '@/types/common.type';
import EHttpCodes from '@/enums/common.enum';

export async function loginAction(values: TLoginFormValues): Promise<
  TServiceResponse &
    Partial<{
      csrfExpired?: boolean;
      access_token?: string;
    }>
> {
  let csrfToken = values.csrfToken;
  let csrfSecret = await getCookie('csrf_secret');

  if (!csrfSecret || !validateCsrfToken(csrfSecret, csrfToken)) {
    return {
      success: false,
      message: 'CSRF token expired, please try again',
      csrfExpired: true,
      status: EHttpCodes.BadRequest,
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
      status: EHttpCodes.Ok,
    };
  } catch (error: any) {
    console.error('Login error:', error);

    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status || EHttpCodes.InternalServerError,
    };
  }
}

export async function logoutAction(): Promise<TServiceResponse> {
  try {
    await deleteCookie('auth');

    return {
      success: true,
      status: EHttpCodes.Ok,
      message: 'Logout successful',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed',
      status: error.response?.status || EHttpCodes.InternalServerError,
    };
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const authCookie = await getCookie('access_token');

  return authCookie !== null;
}

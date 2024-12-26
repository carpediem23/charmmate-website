'use server';

import axios from 'axios';
import { TLoginFormValues, TLoginResponse } from '@/types/auth.type';
import { cookies } from 'next/headers';

export async function loginAction(
  formData: TLoginFormValues,
): Promise<TLoginResponse> {
  try {
    const response = await axios.post(
      `${process.env.API_URL as string}/v1/auth/login`,
      formData,
    );

    const cookieStore = await cookies();
    cookieStore.set('access_token', response.data.access_token);

    return {
      success: true,
      access_token: response.data.access_token,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

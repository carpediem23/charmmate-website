'use server';

import axios from 'axios';
import { TLoginFormValues, TLoginResponse } from '@/types/auth.type';

export async function loginAction(
  formData: TLoginFormValues,
): Promise<TLoginResponse> {
  try {
    const response = await axios.post(
      `${process.env.API_URL as string}/v1/auth/login`,
      formData,
    );

    return {
      access_token: response.data.access_token,
    };
  } catch (error: any) {
    return {
      error: error.response?.data || 'An error occurred',
    };
  }
}

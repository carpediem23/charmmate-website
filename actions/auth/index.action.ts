'use server';

import axios from 'axios';
import { TLoginFormValues } from '@/types/auth.type';

export async function loginAction(formData: TLoginFormValues) {
  try {
    const response = await axios.post(
      `${process.env.API_URL as string}/v1/auth/login`,
      formData,
    );

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || 'An error occurred',
      status: error.response?.status,
    };
  }
}

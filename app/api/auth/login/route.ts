import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';
import axiosInstance from '@/lib/axios.lib';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axiosInstance.post(
      `${process.env.API_URL}/v1/auth/login`,
      body,
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

    await cookieStore.set('auth', serializedCookie);

    return NextResponse.json({
      success: true,
      access_token: response.data.access_token,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.response?.data?.message || 'An error occurred',
      },
      { status: 401 },
    );
  }
}

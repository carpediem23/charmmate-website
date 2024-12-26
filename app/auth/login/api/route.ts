import Error from 'next/error';
import { NextResponse } from 'next/server';
import axios from 'axios';
import EHttpCodes from '@/enums/http-codes.enum';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await axios.post(
      `${process.env.API_URL as string}/v1/auth/login`,
      body,
    );

    if (response.status < EHttpCodes.Ok) {
      throw new Error({ statusCode: response.status, message: 'Login failed' });
    }

    const { access_token } = response.data;

    return NextResponse.json({ access_token }, { status: EHttpCodes.Ok });
  } catch (error: Error | unknown) {
    return NextResponse.json({ message: 'Login failed' });
  }
}

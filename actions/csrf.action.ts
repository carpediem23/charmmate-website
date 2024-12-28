'use server';

import { generateCsrfToken } from '@/lib/csrf.lib';
import { setCookie, getCookie } from '@/lib/cookie.lib';
import { randomBytes } from 'crypto';

export async function fetchCsrfToken() {
  let secret = await getCookie('csrf_secret');
  let csrfToken = await getCookie('csrf_token');

  if (!secret || !csrfToken) {
    secret = randomBytes(16).toString('hex');
    csrfToken = generateCsrfToken(secret);

    await setCookie('csrf_secret', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15, // 3 seconds
      path: '/',
    });

    await setCookie('csrf_token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15, // 3 seconds
      path: '/',
    });
  }

  return { csrfToken };
}

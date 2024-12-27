'use server';

import { generateCsrfToken } from '@/lib/csrf.lib';
import { setCookie } from '@/lib/cookie.lib';

export async function fetchCsrfToken() {
  const csrfToken = generateCsrfToken();

  await setCookie('csrf_token', csrfToken, {});

  return { csrfToken };
}

import { randomBytes } from 'crypto';

export function generateCsrfToken() {
  return randomBytes(32).toString('hex');
}

export function validateCsrfToken(requestToken: string, cookies: string) {
  return requestToken === cookies;
}

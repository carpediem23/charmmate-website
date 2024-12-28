import csrf from 'csrf';

const tokens = new csrf();

export function generateCsrfToken(secret: string) {
  return tokens.create(secret);
}

export function validateCsrfToken(secret: string, token: string) {
  return tokens.verify(secret, token);
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string, options: any) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}

export async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value || null;
}

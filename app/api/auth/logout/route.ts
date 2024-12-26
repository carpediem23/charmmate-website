import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  await cookieStore.delete('auth');

  return NextResponse.json({ success: true });
}
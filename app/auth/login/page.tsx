import { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { isAuthenticated } from '@/actions/auth.action';

export const metadata: Metadata = {
  title: 'Sign in to CharmMate',
  description: 'Sign in to your account for generate or select animations',
};

export default async function LoginPage() {
  const authenticated = await isAuthenticated();

  if (authenticated) redirect('/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
        <LoginForm />
        <Link className="block mt-4" href="/auth/register">
          You don't have any account?
        </Link>
      </div>
    </div>
  );
}

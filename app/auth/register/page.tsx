import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign up to ContentMate',
  description: 'Sign up to your account for generate or select animations',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Signup
        </h2>
        <RegisterForm />
        <Link className="block mt-4" href="/auth/login">
          Already an account?
        </Link>
      </div>
    </div>
  );
}

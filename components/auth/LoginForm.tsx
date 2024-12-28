'use client';

import { useLayoutEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TLoginFormValues } from '@/types/auth.type';
import { useAuthStore } from '@/store/useAuthStore';
import { fetchCsrfToken } from '@/actions/csrf.action';
import { loginAction } from '@/actions/auth.action';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  csrfToken: Yup.string().required(),
});

const initialValues: TLoginFormValues = {
  email: '',
  password: '',
  csrfToken: '',
};

export default function LoginForm() {
  const { login, loading, error, setError } = useAuthStore();
  const [csrfToken, setCsrfToken] = useState('');

  useLayoutEffect(() => {
    async function getCsrfToken() {
      const data = await fetchCsrfToken();
      setCsrfToken(data.csrfToken);
    }
    getCsrfToken();
  }, []);

  const handleSubmit = async (values: TLoginFormValues) => {
    const result = await loginAction(values);
    if (result.csrfExpired) {
      const data = await fetchCsrfToken();
      setCsrfToken(data.csrfToken);

      values.csrfToken = data.csrfToken;

      const retryResult = await loginAction(values);

      if (!retryResult.success) {
        setError(retryResult.message);
      }
    } else if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues, csrfToken }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="mt-8 space-y-6">
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>
          <Field type="hidden" name="csrfToken" value={csrfToken} />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

'use server';

import { loginSchema } from '@/validation/loginSchema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function login(_state: undefined, data: FormData) {
  const email = data.get('email');
  const password = data.get('password');
  const result = loginSchema.safeParse({ email, password });
  if (result.success) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result.data.email,
          password: result.data.password,
        }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      cookies().set('token', `${data.email} ${data.accessToken}`, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      cookies().set('user', JSON.stringify(data), {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      console.log('Login Success');
      redirect('/');
    } else {
      return { res: data.message };
    }
  } else {
    let errors = { email: '', password: '' };
    result.error.errors.map((e) => {
      if (e.path[0] === 'email') {
        return (errors.email = e.message);
      }
      if (e.path[0] === 'password') {
        return (errors.password = e.message);
      }
      return;
    });
    return errors;
  }
}

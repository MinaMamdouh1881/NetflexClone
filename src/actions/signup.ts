'use server';

import { signUpSchema } from '@/validation/signupNext';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function signUp(_state: undefined, data: FormData) {
  const result = signUpSchema.safeParse({
    email: cookies().get('email')?.value,
    username: data.get('username'),
    password: data.get('password'),
  });
  if (result.success) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.data.username,
          email: result.data.email,
          password: result.data.password,
        }),
      }
    );
    const data = await res.json();
    console.log(res);

    if (res.ok) {
      cookies().delete('email');
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
      return redirect(`/sign-up?res=${data.message}`);
    }
  } else {
    console.log(result.error.errors);
    let errors = { username: '', password: '' };
    result.error.errors.map((e) => {
      if (e.path[0] === 'username') {
        return (errors.username = e.message);
      }
      if (e.path[0] === 'password') {
        return (errors.password = e.message);
      }
      return;
    });
    return errors;
  }
}

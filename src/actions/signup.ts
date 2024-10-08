'use server';

import { signUpSchema } from '@/validation/signupNext';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function signUp(data: FormData) {
  const email = cookies().get('email')?.value ?? '';
  const username = data.get('username') as string;
  const password = data.get('password') as string;

  const result = signUpSchema.safeParse({ username, email, password });
  if (result.success) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result.data.email,
          username: result.data.username,
          password: result.data.password,
        }),
      }
    );

    const data = await res.json();

    if (res.status === 201) {
      cookies().set('token', `${data.email} ${data.accessToken}`, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      cookies().set('user', JSON.stringify(data), {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      cookies().delete('email');

      return redirect('/sign-up/next?success=true');
    } else {
      return redirect(`/sign-up?res=${data.message}`);
    }
  } else {
    let usernameError = '';
    let passwordError = '';
    result.error.errors.map((e) => {
      if (e.path[0] === 'username') {
        return (usernameError = e.message);
      }
      if (e.path[0] === 'password') {
        return (passwordError = e.message);
      }
      return;
    });
    return redirect(
      `/sign-up/next?${usernameError && `usernameError=${usernameError}`}${
        passwordError && `&passwordError=${passwordError}`
      }`
    );
  }
}

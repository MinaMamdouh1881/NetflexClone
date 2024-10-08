'use server';

import { signUpFirstSchema } from '@/validation/signupFirst';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function signUpFirst(data: FormData) {
  const email = data.get('email');
  if (email === cookies().get('email')?.value) {
    return redirect('/sign-up?res=Please Change This Email');
  }
  const result = signUpFirstSchema.safeParse({ email });
  if (result.success) {
    cookies().set('email', result.data.email);
    return redirect('/sign-up/next');
  } else {
    return redirect(`/sign-up?error=${result.error.errors[0]?.message}`);
  }
}

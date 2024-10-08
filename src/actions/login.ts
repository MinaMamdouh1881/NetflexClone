// 'use server';

// import { loginSchema } from '@/validation/loginSchema';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// export default async function login(data: FormData) {
//   const email = data.get('email');
//   const password = data.get('password');
//   const result = loginSchema.safeParse({ email, password });
//   let finalResult;
//   if (result.success) {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       }
//     );
//     const res = await response.json();
//     if (response.ok) {
//       cookies().set('token', `${res.email} ${res.accessToken}`, {
//         maxAge: 7 * 24 * 60 * 60,
//         path: '/',
//       });
//       cookies().set('user', JSON.stringify(res), {
//         maxAge: 7 * 24 * 60 * 60,
//         path: '/',
//       });
//       console.log('Login Success');
//       redirect('/login?success=true');
//     } else {
//       redirect(`/login?res=${res.message}`);
//     }
//   } else {
//     let emailError = '';
//     let passwordError = '';
//     result.error.errors.map((e) => {
//       if (e.path[0] === 'email') {
//         return (emailError = e.message);
//       }
//       if (e.path[0] === 'password') {
//         return (passwordError = e.message);
//       }
//       return;
//     });
//     finalResult = { success: false, emailError, passwordError };
//   }

//   console.log(finalResult);

//   if (finalResult.success) {
//     return redirect('/sign-up');
//   } else {
//     throw redirect(`/login?res=${finalResult.error}`);
//   }
// }

'use server';

import { loginSchema } from '@/validation/loginSchema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function login(data: FormData) {
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

    if (res.status === 200) {
      cookies().set('token', `${data.email} ${data.accessToken}`, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      cookies().set('user', JSON.stringify(data), {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      console.log('Login Success');
      return redirect('/login?success=true');
    } else {
      return redirect(`/login?res=${data.message}`);
    }
  } else {
    let emailError = '';
    let passwordError = '';
    result.error.errors.map((e) => {
      if (e.path[0] === 'email') {
        return (emailError = e.message);
      }
      if (e.path[0] === 'password') {
        return (passwordError = e.message);
      }
      return;
    });
    return redirect(
      `/login?${emailError && `emailError=${emailError}`}${
        passwordError && `&passwordError=${passwordError}`
      }`
    );
  }
}

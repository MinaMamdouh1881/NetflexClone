import { cookies } from 'next/headers';

export default async function getAllMovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `${cookies().get('token')?.value}`,
    },
    next: { revalidate: 60 * 5 },
  }).then((res) => res.json());
  return res;
}

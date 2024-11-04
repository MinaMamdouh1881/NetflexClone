import { cookies } from 'next/headers';

export default async function getMovieById(id:string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/movie/find/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: `${cookies().get('token')?.value}`,
      },
      next: { revalidate: 1 },
    }
  ).then((res) => res.json());
  return res;
}

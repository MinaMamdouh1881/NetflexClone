import { cookies } from 'next/headers';

export default async function getTopSeries() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/lists/?genre=top-series`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: `${cookies().get('token')?.value}`,
      },
      cache: 'no-store',
    }
  ).then((res) => res.json());
  return res;
}

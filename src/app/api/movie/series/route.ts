import { NextRequest, NextResponse as res } from 'next/server';
import connect from 'db/connect';
import Movie from 'db/models/Movie';
import { verifyToken } from '@/lib/verifyToken';

export async function GET(req: NextRequest) {
  const checkAuth = await verifyToken(req);
  if (checkAuth) return checkAuth;
  try {
    await connect();
    const movies = await Movie.find({ isSeries: true });
    return res.json(movies.reverse(), { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return res.json({ message: error.message }, { status: 500 });
    else
      return res.json({ message: 'Unknown error occurred' }, { status: 500 });
  }
}

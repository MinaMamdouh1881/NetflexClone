import { NextRequest, NextResponse as res } from 'next/server';
import connect from 'db/connect';
import Movie from 'db/models/Movie';
import { verifyToken } from '@/lib/verifyToken';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type');
  console.log(type);

  const checkAuth = await verifyToken(req);
  if (checkAuth) return checkAuth;
  let movie;
  try {
    await connect();
    if (type === 'series') {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    return res.json(movie, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return res.json({ message: error.message }, { status: 500 });
    else
      return res.json({ message: 'Unknown error occurred' }, { status: 500 });
  }
}

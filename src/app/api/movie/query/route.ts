import { NextRequest, NextResponse as res } from 'next/server';
import connect from 'db/connect';
import Movie from 'db/models/Movie';
import { verifyToken } from '@/lib/verifyToken';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type');
  const genre = req.nextUrl.searchParams.get('genre');
  console.log(type, genre);

  const checkAuth = await verifyToken(req);
  if (checkAuth) return checkAuth;
  try {
    await connect();
    if (!type && !genre) {
      return res.json({ message: 'Bad Request' }, { status: 400 });
    }

    if (type == 'series') {
      console.log('series');
      const movies = await Movie.find({ isSeries: true, genre: genre });
      return res.json(movies, { status: 200 });
    } else if (type == 'movies') {
      console.log('movies');
      const movies = await Movie.find({ isSeries: false, genre: genre });
      return res.json(movies, { status: 200 });
    } else {
      const movies = await Movie.find({ genre: genre });

      return res.json(movies, { status: 200 });
    }
  } catch (error) {
    if (error instanceof Error)
      return res.json({ message: error.message }, { status: 500 });
    else
      return res.json({ message: 'Unknown error occurred' }, { status: 500 });
  }
}

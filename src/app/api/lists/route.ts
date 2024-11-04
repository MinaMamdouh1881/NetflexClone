import { NextRequest, NextResponse } from 'next/server';
import connect from 'db/connect';
import List from 'db/models/List';
import { verifyToken } from '@/lib/verifyToken';

export async function GET(req: NextRequest) {
  const authCheck = await verifyToken(req);
  if (authCheck) return authCheck;
  const genre = req.nextUrl.searchParams.get('genre');
  try {
    await connect();
    const list = await List.find({ genre }).populate('content');
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}

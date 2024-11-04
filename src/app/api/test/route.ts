import { NextRequest, NextResponse as res } from 'next/server';
export async function GET(req: NextRequest) {
  console.log(req);
  return res.json({
    name: 'test',
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  return res.json({
    name: 'test',
  });
}

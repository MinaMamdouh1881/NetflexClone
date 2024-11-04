import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get('token');

  if (!authHeader) {
    return NextResponse.json(
      { message: 'You are not authenticated!' },
      { status: 401 }
    );
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as JwtPayload;
    req.headers.set('user', JSON.stringify(user)); 
    return null; 
  } catch (error) {
    return NextResponse.json(
      { message: 'Token is not valid!' },
      { status: 403 }
    );
  }
}

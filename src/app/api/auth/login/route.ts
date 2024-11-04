import { NextRequest, NextResponse as res } from 'next/server';
import connect from 'db/connect';
import User from 'db/models/User';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  console.log('here Login Route');
  try {
    const [_, body] = await Promise.all([connect(), req.json()]);
    console.log('here');

    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.json(
        { message: 'Wrong password or username!' },
        {
          status: 401,
        }
      );
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY!);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== body.password) {
      return res.json(
        { message: 'Wrong password or username!' },
        { status: 401 }
      );
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY!,
      { expiresIn: '5d' }
    );

    const { password, ...info } = user.toObject();
    return res.json({ ...info, accessToken }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({ message: error.message }, { status: 500 });
    } else {
      return res.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

import { NextRequest, NextResponse as res } from 'next/server';
import connect from 'db/connect';
import User from 'db/models/User';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const [_, body] = await Promise.all([connect(), req.json()]);
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return res.json({ message: 'Email already exists' }, { status: 400 });
    }

    const newUser = new User({
      username: body.username,
      email: body.email,
      password: CryptoJS.AES.encrypt(
        body.password,
        process.env.SECRET_KEY!
      ).toString(),
    });

    const user = await newUser.save();

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY!,
      { expiresIn: '5d' }
    );

    const { password, ...info } = user.toObject();

    return res.json({ ...info, accessToken }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({ message: error.message }, { status: 500 });
    } else {
      return res.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

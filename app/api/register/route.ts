import bcrypt from 'bcrypt';

import prisma from '@/app/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('body', body);
    const { email, name, password, username } = body;

    if (!email || !name || !password || !username) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        username,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('REGISTRATION ERROR', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

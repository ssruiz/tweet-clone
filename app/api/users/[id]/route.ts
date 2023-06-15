import bcrypt from 'bcrypt';

import prisma from '@/app/lib/prisma';
import getSession from '@/app/actions/getSession';
import { NextResponse } from 'next/server';

interface IParams {
  id: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    console.log('here');
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const followersCount = await prisma.follows.count({
      where: {
        followingId: id,
      },
    });

    return NextResponse.json({ ...user, followersCount });
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}

// Update user
export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const { id } = params;

    const body = await request.json();
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return new NextResponse('User Not found', { status: 404 });

    const session = await getSession();

    if (!session || session?.user?.email !== user.email)
      return new NextResponse('Unathorized', { status: 404 });

    const userUpdate = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
    // revalidatePath(`/${user.username}`);
    return NextResponse.json({ userUpdate });
  } catch (error) {
    console.log('Update ERROR', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

import prisma from '@/app/lib/prisma';
import getSession from '@/app/actions/getSession';
import { NextResponse } from 'next/server';

interface IParams {
  id: string;
}

// Follow user
export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { id } = params;

    const userFollowed = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userFollowed)
      return new NextResponse('User Not found', { status: 404 });

    const session = await getSession();

    if (!session) return new NextResponse('Unathorized', { status: 404 });

    const userUpdate = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!userUpdate) return new NextResponse('Internal error', { status: 500 });

    const follow = await prisma.follows.create({
      data: {
        followerId: userUpdate.id,
        followingId: userFollowed.id,
      },
    });

    // revalidatePath(`/${user.username}`);
    return NextResponse.json({ follow });
  } catch (error) {
    console.log('Update ERROR', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { id } = params;

    const userFollowed = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!userFollowed)
      return new NextResponse('User Not found', { status: 404 });

    const session = await getSession();

    if (!session) return new NextResponse('Unathorized', { status: 404 });

    const userUpdate = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!userUpdate) return new NextResponse('Internal error', { status: 500 });

    const follow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userUpdate.id,
          followingId: userFollowed.id,
        },
      },
    });

    if (!follow) return new NextResponse('Internal error', { status: 500 });

    const followDelete = await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: userUpdate.id,
          followingId: userFollowed.id,
        },
      },
    });

    // revalidatePath(`/${user.username}`);
    return NextResponse.json({ followDelete });
  } catch (error) {
    console.log('Update ERROR', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

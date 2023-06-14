import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import getSession from '@/app/actions/getSession';

export async function POST(request: Request) {
  try {
    console.log('hello');
    const session = await getSession();

    console.log('session', session);
    if (!session) return new NextResponse('Unathorized', { status: 401 });

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) return new NextResponse('Unathorized', { status: 401 });

    const body = await request.json();

    if (!user) return new NextResponse('User Not found', { status: 401 });

    const newPost = await prisma.post.create({
      data: {
        userId: user.id,
        ...body,
      },
    });
    // revalidatePath(`/${user.username}`);
    return NextResponse.json({ newPost });
  } catch (error) {
    console.log('Update ERROR', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

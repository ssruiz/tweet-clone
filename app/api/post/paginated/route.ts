import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import getSession from '@/app/actions/getSession';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || 0);

    const posts = await prisma.post.findMany({
      take: 10,
      skip: 10 * (page - 1),
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Comment: true,
        User: {
          select: {
            id: true,
            username: true,
            image: true,
            name: true,
          },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.log('Update ERROR', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

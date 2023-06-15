import getSession from '@/app/actions/getSession';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

interface IParams {
  postId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { postId } = params;
    const session = await getSession();

    if (!session) return new NextResponse('Unauthorized', { status: 401 });

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) return new NextResponse('Post not found', { status: 404 });

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) return new NextResponse('Post not found', { status: 404 });

    const alreadyLiked = post?.likeIds.some((like) => like === user.id);

    if (alreadyLiked) {
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: {
          likeIds: {
            set: post.likeIds.filter((like) => like !== user.id),
          },
        },
      });
      return NextResponse.json({ updatedPost });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likeIds: {
          push: user.id,
        },
      },
    });
    revalidatePath('/');
    return NextResponse.json({ updatedPost });
  } catch (error) {
    console.log('error', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

import prisma from '@/app/lib/prisma';
import { PostDTO } from '../utils/types';

export const getPosts = async () => {
  // const session = await getSession();

  // if (!session?.user?.email) {
  //   return [];
  // }

  try {
    const posts = await prisma.post.findMany({
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
    return posts;
  } catch (error) {
    return [];
  }
};

export const getPostsByUser = async (userId: string): Promise<PostDTO[]> => {
  // const session = await getSession();

  // if (!session?.user?.email) {
  //   return [];
  // }

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
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
    return posts;
  } catch (error) {
    return [];
  }
};

export const getPostById = async (postId: string): Promise<PostDTO | null> => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
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
    return post;
  } catch (error) {
    return null;
  }
};

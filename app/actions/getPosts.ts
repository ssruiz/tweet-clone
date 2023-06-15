import prisma from '@/app/lib/prisma';
import getSession from './getSession';
import { PostDTO } from '../utils/types/posts';

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

export const getPostsByUser = async (userId: string): PostDTO[] => {
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

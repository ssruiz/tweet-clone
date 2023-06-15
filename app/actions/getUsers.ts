import prisma from '@/app/lib/prisma';
import getSession from './getSession';

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
      include: {
        followedBy: {
          select: {
            followerId: true,
            followingId: true,
          },
        },
      },
    });
    return users.filter(
      (u) => !u.followedBy.some((f) => f.followerId === session.user.id)
    );
  } catch (error) {
    return [];
  }
};

export default getUsers;

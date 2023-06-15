import prisma from '@/app/lib/prisma';
import getSession from './getSession';
import { User } from '@prisma/client';
import { ProfileUserT } from '../utils/types';

const getUserByUsername = async ({
  username,
}: {
  username: string;
}): Promise<ProfileUserT | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        followedBy: true,
        following: true,
      },
    });

    if (!user) return null;

    const tweetsCount = await prisma.post.count({
      where: {
        userId: user?.id,
      },
    });
    return { ...user, tweetsCount };
  } catch (error) {
    return null;
  }
};

export default getUserByUsername;

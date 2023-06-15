import { Comment, Follows, Post, User } from '@prisma/client';

export type ProfileUserT = User & {
  tweetsCount: number;
  followedBy: Follows[];
  following: Follows[];
};

export type ResponseHook = {
  error?: boolean;
  message: string;
};

export type PostDTO = Post & {
  Comment: Comment[];
  User: {
    id: string;
    username: string | null;
    image: string | null;
    name: string | null;
  };
};

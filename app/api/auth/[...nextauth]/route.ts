import * as bcrypt from 'bcrypt-ts';
import NextAuth, { AuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import GitHubProvider, { GithubProfile } from 'next-auth/providers/github';

import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/lib/prisma';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: { signIn: '/auth', error: '/auth', signOut: '/logout' },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile: GithubProfile): any {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.email?.replace('@', '.'),
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }

        console.log('credentials', credentials);
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: credentials.username,
              },
              {
                username: credentials.username,
              },
            ],
          },
        });

        if (!user || !user?.hashedPassword)
          throw new Error('Invalid Credentials');

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) throw new Error('Invalid Credentials');
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      });
      return {
        ...session,
        user: { ...session.user, username: user?.username, id: user?.id },
      };
    },
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

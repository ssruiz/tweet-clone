import getUserByUsername from '@/app/actions/getUser';
import Header from '@/app/components/Header';
import { Button } from '@/app/components/ui/button';
import CONSTANTS from '@/app/utils/constants';
import { User } from '@prisma/client';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';

import { CiLocationOn } from 'react-icons/ci';
import { GoCalendar } from 'react-icons/go';
import UserProfile from './components/UserProfile';
import UserProfileHeader from './components/UserProfileHeader';
import EmptyProfile from './components/EmptyProfile';
import getSession from '@/app/actions/getSession';
import { getPostsByUser } from '@/app/actions/getPosts';

interface IParams {
  username: string;
}

export default async function ProfilePage({ params }: { params: IParams }) {
  const session = await getSession();
  const { username } = params;
  const user = await getUserByUsername({ username });

  const posts = user ? await getPostsByUser(user.id) : [];
  return (
    <div className="flex flex-col">
      <Header
        label={user?.name || 'Profile'}
        subLabel={user?.tweetsCount?.toString() || undefined}
        canGoBack
      />
      <UserProfileHeader
        coverImage={user?.coverImage || undefined}
        userImage={user?.image || undefined}
      />

      {user && (
        <UserProfile
          user={user}
          canEdit={session?.user.username === user.username}
          currentUserId={session?.user.id!}
          posts={posts}
        />
      )}
      {!user && <EmptyProfile username={username} />}
    </div>
  );
}

'use client';
import getUserByUsername from '@/app/actions/getUser';
import Header from '@/app/components/Header';
import Modal from '@/app/components/Modal';
import { Button } from '@/app/components/ui/button';
import CONSTANTS from '@/app/utils/constants';
import { PostDTO, ProfileUserT } from '@/app/utils/types';
import { User } from '@prisma/client';
import axios from 'axios';
import { format } from 'date-fns';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { CiLocationOn } from 'react-icons/ci';
import { GoCalendar } from 'react-icons/go';
import EditProfileForm from './EditProfileForm';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';

import TweetPreview from '@/app/components/TweetPreview';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';

interface Props {
  user: ProfileUserT;
  canEdit?: boolean;
  posts: PostDTO[];
}

const UserProfile: React.FC<Props> = ({ user, canEdit = false, posts }) => {
  const { username, createdAt, name, bio, location, id } = user;

  const [showModal, setShowModal] = useState(false);

  const onClose = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <div className="text-white flex flex-col w-full gap-4 h-full">
      <div className="flex flex-col w-full gap-4 h-full p-4">
        {canEdit && (
          <div className="flex">
            <div className="flex-1" />
            <Button
              onClick={() => setShowModal(true)}
              variant="outline"
              className="rounded-full"
            >
              Edit profile
            </Button>
          </div>
        )}

        <div className={clsx('w-full flex flex-col', { 'mt-10': !canEdit })}>
          <p className="text-xl font-medium">{name || `@${username}`}</p>
          <p className="text-sm text-gray-600">@{username}</p>
        </div>

        {bio && <p className="text-base">{bio}</p>}

        <div className="flex gap-2 items-center text-gray-500">
          {location && (
            <>
              <CiLocationOn />
              <p className="text-sm font-thin ">{location}</p>
            </>
          )}

          {createdAt && <GoCalendar />}
          {createdAt && (
            <p className="text-sm font-thin ">
              Joined {format(createdAt, 'MMMM yyyy')}
            </p>
          )}
        </div>

        <div className="flex gap-2 text-sm items-center text-gray-500">
          <div className="hover:underline transition hover:cursor-pointer">
            <span className="text-white">{user.following.length}</span>{' '}
            Following
          </div>
          <div className="hover:underline transition hover:cursor-pointer">
            <span className="text-white">{user.followedBy.length}</span>{' '}
            Followers
          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <EditProfileForm user={user} onClose={onClose} />
      </Modal>

      <div className="">
        <Tabs defaultValue="tweets" className="w-full">
          <TabsList className="bg-transparent ">
            <TabsTrigger
              className="text-base font-medium data-[state=active]:decoration-4 data-[state=active]:underline  data-[state=active]:bg-transparent text-white data-[state=active]:text-brand data-[state=active]:underline-offset-8 data-[state=active]:transition p-8 h-10 hover:bg-gray-500/30 data-[state=active]:hover:bg-gray-500/30 w-48"
              value="tweets"
            >
              Tweets
            </TabsTrigger>
            <TabsTrigger
              className="text-base font-medium data-[state=active]:decoration-4 data-[state=active]:underline data-[state=active]:bg-transparent text-white data-[state=active]:text-brand data-[state=active]:underline-offset-8 data-[state=active]:transition p-8 h-10 data-[state=active]:hover:bg-gray-500/30 hover:bg-gray-500/30 w-48"
              value="replies"
            >
              Replies
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tweets">
            {posts.map((post) => (
              <div key={post.id} className="mt-5">
                <TweetPreview
                  content={post.body}
                  image={post.User.image || ''}
                  date={post.createdAt}
                  postId={post.id}
                  likes={post.likeIds.length}
                  username={post.User.username!}
                  likeByUser={post.likeIds.some((like) => like === id)}
                  name={post.User.name!}
                />
              </div>
            ))}
          </TabsContent>
          <TabsContent value="replies"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;

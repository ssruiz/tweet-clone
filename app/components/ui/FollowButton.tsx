'use client';

import React, { useMemo, useState } from 'react';
import { Button } from './button';
import axios from 'axios';
import Spinner from './Spinner';
import { useSession } from 'next-auth/react';
import SpinnerNormal from './SpinnerNormal';
import { useRouter } from 'next/navigation';

interface Props {
  userId: string;
  followByCurrentUser?: boolean;
}

const FollowButton: React.FC<Props> = ({ userId, followByCurrentUser }) => {
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();

  const onFollow = async () => {
    setIsFetching(true);
    if (!followByCurrentUser) await axios.post(`/api/users/follow/${userId}`);
    else await axios.delete(`/api/users/follow/${userId}`);
    setIsFetching(false);
    router.refresh();
  };

  return (
    <div className="">
      {!isFetching && (
        <Button
          className="ml-2 px-6 py-2 bg-white text-gray-900 hover:bg-gray-200 rounded-full font-semibold"
          onClick={onFollow}
        >
          {!followByCurrentUser ? 'Follow' : 'Unfollow'}
        </Button>
      )}

      {isFetching && <SpinnerNormal />}
    </div>
  );
};

export default FollowButton;

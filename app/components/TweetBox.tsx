'use client';

import React from 'react';
import Avatar from './Avatar';
import TweetForm from './TweetForm';

interface Props {
  image?: string;
}

const TweetBox: React.FC<Props> = ({ image }) => {
  return (
    <div className="min-h-[150px] border-b border-gray-400 px-4 flex">
      <div className="h-full pt-4">
        <Avatar userId={''} image={image} />
      </div>
      <TweetForm />
    </div>
  );
};

export default TweetBox;

'use client';
import Header from '../components/Header';
import TweetBox from '../components/TweetBox';

import Avatar from '../components/Avatar';
import { parseDate, tweetTimeElapsed } from '../utils/formaters';
import { FaRegComment } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai';
import { usePosts } from '../hooks';
import { useRouter } from 'next/navigation';
import { BsFillHeartFill, BsHeart } from 'react-icons/bs';

interface Props {
  image?: string;
  date: Date;
  content: string;
  postId: string;
  likes: number;
  username: string;
  likeByUser?: boolean;
  name: string;
  comments: number;
  rts: number;
}

const TweetPreview: React.FC<Props> = ({
  image,
  date,
  content,
  postId,
  likes,
  username,
  likeByUser,
  name,
  comments,
  rts,
}) => {
  const router = useRouter();
  const { likePost } = usePosts();

  const onClickLike = async () => {
    await likePost({ postId });
    router.refresh();
  };

  return (
    <div className="border border-gray-800 h-auto flex p-4 gap-4 cursor-pointer">
      <Avatar image={image} userId="" />
      <div className="flex flex-col">
        <div className="flex justify-start items-center h-fit">
          <p className="font-semibold text-white hover:underline">{name}</p>
          <p className="font-thin text-gray-400 ml-2 text-sm">@{username}</p>
          <p className="ml-2 text-gray-400 font-thin text-sm hover:underline">
            {tweetTimeElapsed(date)}
          </p>
        </div>

        <p className="text-white">{content}</p>
        <div className="flex h-auto items-center gap-5 mt-1">
          <div className="flex items-center group cursor-pointer">
            <div className="p-3 flex items-center rounded-full hover:bg-gray-200/10 transition duration-300 peer/like">
              <FaRegComment
                size={16}
                className="text-white group-hover:text-brand-200 transition duration-300"
              />
            </div>
            <span className="group-hover:text-brand-200 text-white text-sm">
              {comments}
            </span>
          </div>
          <div className="flex items-center">
            <div className="group p-3 flex items-center rounded-full hover:bg-gray-200/10 cursor-pointer transition duration-300 peer/rt">
              <AiOutlineRetweet
                size={16}
                className="text-white group-hover:text-green-500 transition duration-300"
              />
            </div>
            <span className="peer-hover/rt:text-green-600 text-white text-sm">
              {rts}
            </span>
          </div>

          <div className="flex items-center group cursor-pointer">
            <div
              className="p-3 rounded-full group-hover:bg-gray-200/10 transition duration-300"
              onClick={onClickLike}
            >
              {likeByUser ? (
                <BsFillHeartFill
                  size={16}
                  className="text-red-500 group-hover:text-red-600 transition duration-300"
                />
              ) : (
                <BsHeart
                  size={16}
                  className="text-white group-hover:text-red-600 transition duration-300"
                />
              )}
            </div>
            <span className="group-hover:text-red-500 text-white text-sm">
              {likes}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetPreview;

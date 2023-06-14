import Link from 'next/link';
import getUsers from '../actions/getUsers';
import Avatar from './Avatar';
import { Button } from './ui';
import FollowButton from './ui/FollowButton';

const FollowBar = async () => {
  const users = await getUsers();

  if (users.length === 0) return null;

  return (
    <div className="bg-brand-black2 rounded-xl mt-5 mx-4 py-4 hidden xl:block">
      <h2 className="text-white text-xl font-semibold px-6">Who to follow</h2>
      <div className="flex flex-col gap-6 mt-4 items-center ">
        {users.map((user) => (
          <div
            className="flex justify-around items-center w-full py-3 px-6 hover:bg-gray-700/20 transition"
            key={user.id}
          >
            <Link
              href={`/${user.username}`}
              className="flex flex-row gap-4  w-full"
            >
              <Avatar userId={user.id} image={user.image || ''} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm hover:cursor-pointer hover:underline">
                  {user.name}
                </p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </Link>
            <FollowButton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowBar;

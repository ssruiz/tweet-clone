import CONSTANTS from '@/app/utils/constants';
import Image from 'next/image';

interface Props {
  coverImage?: string;
  userImage?: string;
}

const UserProfileHeader: React.FC<Props> = ({
  coverImage = CONSTANTS.userBannerPlaceholder,
  userImage = CONSTANTS.userImagePlaceholder,
}) => {
  return (
    <div className="h-52 w-full relative">
      <Image
        alt="Banner"
        fill
        style={{
          objectFit: 'cover',
        }}
        src={coverImage}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="bg-green-500 rounded-full h-32 w-32 absolute -bottom-10 border-[2px] border-gray-800 left-5">
        <Image
          alt="Avatar"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            borderRadius: '100%',
          }}
          src={userImage}
        />
      </div>
    </div>
  );
};

export default UserProfileHeader;

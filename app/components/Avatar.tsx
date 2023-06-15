'use client';

import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  image?: string;
}

const Avatar: React.FC<Props> = ({ userId, hasBorder, isLarge, image }) => {
  return (
    <div
      className={clsx(
        'rounded-full hover:opacity-90 transition cursor-pointer relative',
        {
          'h-32 w-32': isLarge,
          'h-12 w-12': !isLarge,
        }
      )}
    >
      <Image
        alt="Avatar"
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
        }}
        src={image || '/images/userimageplaceholder.jpg'}
      />
    </div>
  );
};

export default Avatar;

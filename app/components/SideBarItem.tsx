'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { IconType } from 'react-icons';

import { SiTwitter } from 'react-icons/si';
import { CgLogOut } from 'react-icons/cg';
import {
  RiHome7Fill,
  RiNotificationFill,
  RiUser3Fill,
  RiQuillPenLine,
} from 'react-icons/ri';

const iconsMap: { [key: string]: IconType } = {
  logo: SiTwitter,
  home: RiHome7Fill,
  notifications: RiNotificationFill,
  profile: RiUser3Fill,
  tweet: RiQuillPenLine,
  logout: CgLogOut,
};

interface Props {
  label: string;
  icon?: string;
  href: string;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
}
const SideBarItem: React.FC<Props> = ({
  icon,
  href,
  label,
  active,
  onClick,
  visible,
}) => {
  const handleClick = () => {
    if (onClick) return onClick();
  };

  const Icon = icon ? iconsMap[icon] : null;

  return (
    <li onClick={handleClick}>
      <Link href={href}>
        <div
          className={clsx(
            'h-10 flex justify-start items-center rounded-full  transition duration-500 text-white min-w-fit max-w-fit',
            {
              'bg-brand hover:bg-brand-600': active,
              'hover:bg-gray-400/10': !active,
              hidden: !visible,
            }
          )}
        >
          {Icon && (
            <Icon
              className={clsx(
                'transform -scale-x-100 mx-2 text-base xs:text-2xl text-gray-200',
                {
                  'hover:rotate-12 transition': href === '#',
                }
              )}
            />
          )}
          {label && (
            <p className="hidden text-md font-medium xl:block mx-4">{label}</p>
          )}
        </div>
      </Link>
    </li>
  );
};

export default SideBarItem;

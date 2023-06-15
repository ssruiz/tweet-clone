import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { SiTwitter } from 'react-icons/si';
import { CgLogOut } from 'react-icons/cg';
import {
  RiHome7Fill,
  RiNotificationFill,
  RiUser3Fill,
  RiQuillPenLine,
} from 'react-icons/ri';

const useRoutes = () => {
  const pathName = usePathname();
  const router = useRouter();
  const session = useSession();

  const routes = useMemo(
    () => [
      {
        label: '',
        href: '#',
        icon: SiTwitter,
        active: false,
        onClick: () => router.push('/'),
        visible: true,
      },
      {
        label: 'Home',
        href: '/',
        icon: RiHome7Fill,
        active: pathName === '/',
        visible: session.status === 'authenticated',
      },
      {
        label: 'Notifications',
        href: '/',
        icon: RiNotificationFill,
        active: pathName === '/notifications',
        visible: session.status === 'authenticated',
      },
      {
        label: 'Profile',
        href: `/${session.data?.user.username}`,
        icon: RiUser3Fill,
        active: pathName === `/${session.data?.user.username}`,
        visible: session.status === 'authenticated',
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => {
          signOut();
        },
        icon: CgLogOut,
        visible: session.status === 'authenticated',
      },
    ],
    [pathName, router, session]
  );

  return routes;
};

export default useRoutes;

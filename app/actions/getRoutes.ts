import getSession from './getSession';

const getRoutes = async () => {
  try {
    const session = await getSession();

    if (!session)
      return [
        {
          label: '',
          href: '#',
          active: false,
          visible: true,
          icon: 'logo',
        },
      ];

    return [
      {
        label: '',
        href: '#',
        active: false,
        visible: true,
        icon: 'logo',
      },
      {
        label: 'Home',
        href: '/',
        icon: 'home',
        active: false,
        visible: true,
      },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: 'notifications',
        active: false,
        visible: true,
      },
      {
        label: 'Profile',
        href: `/${session.user.username}`,
        icon: 'profile',
        active: false,
        visible: true,
      },
      {
        label: 'Logout',
        href: '/api/auth/signout',
        icon: 'logout',
        visible: true,
      },
    ];
  } catch (error) {
    return [];
  }
};

export default getRoutes;

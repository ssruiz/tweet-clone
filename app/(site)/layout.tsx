import { getServerSession } from 'next-auth';
import LoginFooter from '../auth/components/LoginFooter';

import '../globals.css';
import AuthProvider from '../context/AuthProvider';
import FollowBar from '../components/FollowBar';
import { Suspense } from 'react';
import Sidebar from '@/app/components/Sidebar';
import ToasterContext from '../context/ToasterContext';
import { ThemeProvider } from '../context/ThemeProvider';

export const metadata = {
  title: 'TwitClone',
  description: 'Twitter clone',
};

export default async function RootLayout({
  children,
  authModal,
  sidebar,
  logoutModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
  sidebar: React.ReactNode;
  logoutModal: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen relative bg-black">
          {/* <ThemeProvider> */}
          <div className="grid grid-cols-12 mx-auto h-full max-w-7xl relative">
            <ToasterContext />
            {/* @ts-ignore React SC */}
            {/* <SidebarClient /> */}
            <div className="col-span-2 hidden xs:block relative">
              {/* @ts-ignore React SC */}
              <Sidebar />
              {/* {sidebar} */}
            </div>

            <div className="col-span-11 xs:col-span-10 md:col-span-7 border-x-[1px] border-neutral-600 xl:col-span-6">
              {children}
            </div>

            <div className="hidden md:block col-span-1 xl:col-span-4">
              {/* @ts-ignore React SC */}
              <FollowBar />
            </div>

            {authModal}
            {logoutModal}
          </div>
          {/* @ts-ignore React SC */}
          {!session && <LoginFooter />}
          {/* </ThemeProvider> */}
        </body>
      </html>
    </AuthProvider>
  );
}

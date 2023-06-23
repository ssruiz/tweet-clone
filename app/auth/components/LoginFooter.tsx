import { Button } from '@/app/components/ui/button';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

const LoginFooter = async () => {
  return (
    <div className="h-20  bg-brand flex justify-center items-center fixed bottom-0 left-0 w-full">
      <div className="shrink hidden sm:flex flex-col text-start px-10">
        <p className="text-xl font-bold text-white">
          Don&apos;t miss what&apos;s happening
        </p>
        <p className="text-base font-medium text-white">
          People on Twitter are the first to know.
        </p>
      </div>

      <div className="flex gap-2 justify-between px-10 w-full max-w-sm">
        <Link href="/auth" className="w-full">
          <Button variant="outline" className="rounded-full text-white w-full">
            Log in
          </Button>
        </Link>

        <Button variant="secondary" className="rounded-full w-full">
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default LoginFooter;

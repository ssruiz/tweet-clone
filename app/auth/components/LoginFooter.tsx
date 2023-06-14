import { Button } from '@/app/components/ui/button';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

const LoginFooter = async () => {
  return (
    <div className="h-20 py-10 bg-brand flex justify-center items-center fixed bottom-0 left-0 w-full space-x-10">
      <div className="shrink md:flex flex-col text-start px-10">
        <p className="text-xl font-bold text-white">
          Don&apos;t miss what&apos;s happening
        </p>
        <p className="text-base font-medium text-white">
          People on Twitter are the first to know.
        </p>
      </div>

      <div className="flex gap-2 px-10">
        <Link href="/auth">
          <Button variant="outline" className="rounded-full text-white">
            Log in
          </Button>
        </Link>

        <Button variant="secondary" className="rounded-full">
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default LoginFooter;

'use client';
import Modal from '@/app/components/Modal';
import { signOut } from 'next-auth/react';
import { Button } from '@/app/components/ui';
import { useRouter } from 'next/navigation';

const LogoutForm = () => {
  const router = useRouter();
  return (
    <div className="h-24 flex flex-col items-center justify-center gap-4">
      <p className="text-xl text-white">Are you sure?</p>
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="text-white rounded-full"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={() => signOut()}
        >
          Leave
        </Button>
      </div>
    </div>
  );
};

export default LogoutForm;

import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LogoutForm from './Components/LogoutForm';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  return (
    <>
      <LogoutForm />
    </>
  );
}

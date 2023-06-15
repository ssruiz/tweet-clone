import { getServerSession } from 'next-auth';
import AuthForm from './components/AuthForm';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  return (
    <>
      <AuthForm />
    </>
  );
}

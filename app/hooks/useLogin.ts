import { useCallback, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const socialLogin = useCallback(async (action: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(action, { redirect: false });
      if (result?.error) toast.error('Invalid credentials');
      if (result?.ok && !result?.error) toast.success('Success!');
    } catch (error) {
      console.log('error', error);
      toast.error('Something went wrong ☹️');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    socialLogin,
    setIsLoading,
    isLoading,
  };
};

export default useLogin;

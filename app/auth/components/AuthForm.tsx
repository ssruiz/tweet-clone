'use client';

import { useCallback, useState } from 'react';

import { BsTwitter } from 'react-icons/bs';
import { HiOutlineX } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { GoMarkGithub } from 'react-icons/go';

import { useRouter } from 'next/navigation';
import { AuthSocialButton } from './AuthSocialButton';

import { useLogin } from '@/app/hooks';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

type Variant = 'LOGIN' | 'REGISTER';

const textVariants: { [key in Variant]: { title: string; spanText: string } } =
  {
    LOGIN: {
      title: 'Sign in to Tweeta',
      spanText: 'Sign in',
    },
    REGISTER: {
      title: 'Join Tweeta today',
      spanText: 'Sign up',
    },
  };

const AuthForm = () => {
  const { isLoading, socialLogin, setIsLoading } = useLogin();
  const router = useRouter();
  const [hiddeContent, setHiddeContent] = useState(false);
  const [variant, setVariant] = useState<Variant>('LOGIN');

  const toogleVariante = useCallback(() => {
    setVariant((prev) => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
    setHiddeContent(false);
  }, []);

  return (
    <div className="bg-black w-full h-full p-10 md:w-8/12 min-w-fit lg:w-4/12 md:p-16 md:h-fit flex flex-col space-y-10 items-center">
      <div className="flex w-full justify-between items-center">
        <div onClick={() => router.back()}>
          <HiOutlineX size={40} className="cursor-pointer text-white" />
        </div>
        <BsTwitter size={40} className="text-white" />
        <div />
      </div>
      <div className="w-full text-center flex flex-col items-center md:px-16 space-y-10">
        {!hiddeContent && (
          <p className="text-3xl font-bold text-white">
            {textVariants[variant].title}
          </p>
        )}
        {!hiddeContent && (
          <div className="flex flex-col space-y-5 mt-10 w-full">
            <AuthSocialButton
              icon={FcGoogle}
              onClick={() => socialLogin('google')}
              text={`${textVariants[variant].spanText} with Google`}
            />
            <AuthSocialButton
              icon={GoMarkGithub}
              onClick={() => socialLogin('github')}
              text={`${textVariants[variant].spanText} with Github`}
            />
          </div>
        )}
        {!hiddeContent && (
          <div className="flex w-full mt-5 items-center gap-5">
            <div className="h-[1px] flex-1 bg-white " />
            <span className="text-xl text-white">or</span>
            <div className="h-[1px] flex-1 bg-white " />
          </div>
        )}

        {variant === 'LOGIN' && <SignInForm hiddeContent={setHiddeContent} />}
        {variant === 'REGISTER' && (
          <SignUpForm hiddeContent={setHiddeContent} />
        )}

        <div className="flex gap-2 justify-center text-lg mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN' ? "You're new?" : 'Already have an account?'}
          </div>
          <div
            onClick={toogleVariante}
            className="underline cursor-pointer text-brand"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

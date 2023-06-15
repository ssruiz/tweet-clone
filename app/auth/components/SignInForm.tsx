'use client';

import { Button, Input } from '@/app/components/ui';
import SpinnerNormal from '@/app/components/ui/SpinnerNormal';
import { useToast } from '@/app/hooks';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type LoginSteps = 'ONE' | 'TWO';

interface Props {
  hiddeContent: Dispatch<SetStateAction<boolean>>;
}

const SignInForm: React.FC<Props> = ({ hiddeContent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();
  const router = useRouter();

  const [loginStep, setLoginStep] = useState<LoginSteps>('ONE');

  useEffect(() => {
    return () => {
      router.refresh();
    };
  }, [router]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (loginStep === 'ONE') {
      setLoginStep('TWO');
      hiddeContent((prev) => !prev);
    } else {
      // Login
      try {
        setIsLoading(true);
        const result = await signIn('credentials', {
          ...data,
          redirect: false,
        });
        console.log('result', result);
        if (result?.error) error('Invalid credentials');
        if (result?.ok && !result?.error) {
          success('Login succeed!');
          router.back();
        }
      } catch (e) {
        error('Something went wrong');
      } finally {
        setIsLoading(false);
        return;
      }
    }
  };

  return (
    <div className="flex flex-col mt-5 w-full relative text-start text-2xl text-white">
      {loginStep === 'TWO' && (
        <p className="text-3xl font-bold text-white mb-10">
          Enter your password
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email or username"
          id={'username'}
          register={register}
          errors={errors}
          required
          disabled={loginStep === 'TWO'}
        />
        <Transition
          show={loginStep === 'TWO'}
          enter="transition-all duration-700"
          enterFrom="opacity-0 translate-x-40"
          enterTo="opacity-100 translate-x-0"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mt-5">
            <Input
              label="Password"
              type="password"
              id={'password'}
              register={register}
              errors={errors}
              required={loginStep === 'TWO'}
            />
          </div>
        </Transition>
        <div className="flex flex-col space-y-6 mt-5 items-center">
          {!isLoading && (
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full bg-white text-black hover:bg-gray-200 w-full"
              disabled={isLoading}
            >
              {loginStep === 'ONE' ? 'Next' : 'Sign in'}
            </Button>
          )}

          {isLoading && <SpinnerNormal />}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

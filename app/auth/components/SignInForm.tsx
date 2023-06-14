'use client';

import { Button, Input } from '@/app/components/ui';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useState,
} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type LoginSteps = 'ONE' | 'TWO';

interface Props {
  hiddeContent: Dispatch<SetStateAction<boolean>>;
}

const SignInForm: React.FC<Props> = ({ hiddeContent }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [loginStep, setLoginStep] = useState<LoginSteps>('ONE');

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
      console.log('data', data);
      // Login
      try {
        const result = await signIn('credentials', {
          ...data,
          redirect: false,
        });
        if (result?.error) toast.error('Invalid credentials');
        if (result?.ok && !result?.error) {
          toast.success('Success!');
          router.back();
        }
      } catch (error) {
        toast.error('Something went wrong');
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
              id={'password'}
              register={register}
              errors={errors}
              required={loginStep === 'TWO'}
            />
          </div>
        </Transition>
        <div className="flex flex-col space-y-6 mt-5">
          <Button
            type="submit"
            variant="secondary"
            className="rounded-full bg-white text-black hover:bg-gray-200"
          >
            {loginStep === 'ONE' ? 'Next' : 'Sign in'}
          </Button>
          {/* {loginStep === 'ONE' && (
            <Button intent="secondaryy">Forgot Password?</Button>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

'use client';

import { Button, Input } from '@/app/components/ui';
import { Transition } from '@headlessui/react';
import axios from 'axios';
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

const SignUpForm: React.FC<Props> = ({ hiddeContent }) => {
  const [loginStep, setLoginStep] = useState<LoginSteps>('ONE');
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      name: '',
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
        await axios.post('/api/register', data);
        signIn('credentials', data);
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
        return;
      }
    }

    // if (variant === 'LOGIN') {
    //   try {
    //     const result = await signIn('credentials', {
    //       ...data,
    //       redirect: false,
    //     });
    //     if (result?.error) toast.error('Invalid credentials');
    //     if (result?.ok && !result?.error) {
    //       toast.success('Success!');
    //       router.push('/users');
    //     }
    //   } catch (error) {
    //     toast.error('Something went wrong');
    //   } finally {
    //     setIsLoading(false);
    //     return;
    //   }
    // }
  };

  return (
    <div className="flex flex-col mt-5 w-full relative text-start text-2xl text-white">
      {loginStep === 'TWO' && (
        <p className="text-3xl font-bold text-white mb-10">
          Create your account
        </p>
      )}

      <div
        className={clsx('flex flex-col space-y-6', {
          hidden: loginStep === 'TWO',
        })}
      >
        <Button
          onClick={() => {
            setLoginStep('TWO');
            hiddeContent(true);
          }}
          disabled={getValues('username')}
          variant="secondary"
          className="rounded-full"
        >
          Create Account
        </Button>
      </div>
      <Transition
        show={loginStep === 'TWO'}
        enter="transition-all duration-700"
        enterFrom="opacity-0 translate-x-40"
        enterTo="opacity-100 translate-x-0"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <Input
              label="Email"
              id={'email'}
              register={register}
              errors={errors}
              required
            />
            <Input
              label="Name"
              id={'name'}
              register={register}
              errors={errors}
              required
            />
            <Input
              label="Username"
              id={'username'}
              register={register}
              errors={errors}
              required
            />
            <Input
              label="Password"
              id={'password'}
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="mt-10">
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full w-full font-semibold"
            >
              Sign up
            </Button>
          </div>
        </form>
      </Transition>
    </div>
  );
};

export default SignUpForm;

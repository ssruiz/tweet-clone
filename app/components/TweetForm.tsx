'use client';

import Avatar from './Avatar';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from 'react-hook-form';
import { BiImageAlt } from 'react-icons/bi';
import { Button, Spinner, Textarea } from './ui';
import { Progress } from './ui/progress';
import { useCallback, useState } from 'react';
import { usePosts, useToast } from '../hooks';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import SpinnerNormal from './ui/SpinnerNormal';

const TweetForm = () => {
  const { error, success } = useToast();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const { createPost } = usePosts();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      body: '',
    },
  });

  const bodyValue = watch('body');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data', data);
    // Login
    try {
      setIsFetching(true);
      const result = await createPost({
        data,
      });
      if (result?.error) error('Something went wrong');
      else {
        success('Tweet posted!');
        reset();
        router.refresh();
      }
    } catch (e) {
      error('Something went wrong');
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-4 flex gap-3 flex-col h-fit">
        <Controller
          name="body"
          control={control}
          rules={{ maxLength: 280 }}
          render={({ field }) => (
            <Textarea
              placeholder={'What is happening?!'}
              className="border-0 text-white text-xl focus-visible:ring-0 focus-visible:ring-offset-0 flex h-auto peer resize-none"
              {...field}
              showHr
            />
          )}
        />

        {bodyValue.length > 0 && (
          <Progress
            className={clsx('h-1 w-full', {
              'bg-red-500': (100 * bodyValue.length) / 280 > 100,
            })}
            value={(100 * bodyValue.length) / 280}
            max={(100 * bodyValue.length) / 280}
          />
        )}
        <div className="h-9 flex justify-between items-center">
          <BiImageAlt size={25} className="text-brand hover:text-brand-600" />
          <div className="flex justify-center items-center">
            {!isFetching && (
              <Button
                className="rounded-full px-6 h-8 text-white bg-brand hover:bg-brand-600 cursor-pointer"
                disabled={!bodyValue || isFetching}
              >
                Tweet
              </Button>
            )}
          </div>
          {isFetching && <SpinnerNormal />}
        </div>
      </div>
    </form>
  );
};

export default TweetForm;

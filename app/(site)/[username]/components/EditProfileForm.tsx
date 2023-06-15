'use client';
import { Input, Textarea } from '@/app/components/ui';
import { ProfileUserT } from '@/app/utils/types';
import { HiOutlineX } from 'react-icons/hi';
import { TbCameraPlus } from 'react-icons/tb';

import Image from 'next/image';
import CONSTANTS from '@/app/utils/constants';
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/ui/Spinner';
import useUsers from '@/app/hooks/useUsers';
import { Button } from '@/app/components/ui/button';
import { useToast } from '@/app/hooks';

interface Props {
  user: ProfileUserT;
  onClose: () => void;
}

const EditProfileForm: React.FC<Props> = ({ user, onClose }) => {
  const router = useRouter();
  const { success, error } = useToast();
  const [coverImageFile, setCoverImageFileFile] = useState<File>();
  const [imageFile, setImageFile] = useState<File>();
  const [isSaving, setIsSaving] = useState(false);
  const [temporalBlogImage, setTemporalBlogImage] = useState('');
  const [temporalBlobProfileImage, setTemporalBlobProfileImage] = useState('');
  const { updateUser } = useUsers();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: user.name,
      bio: user.bio,
      location: user.location,
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCoverImageFileFile(e.target.files[0]);
      setTemporalBlogImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleProfileFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
      setTemporalBlobProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSaving(true);
    const result = await updateUser({
      converImage: coverImageFile,
      image: imageFile,
      data,
      user,
    });

    setIsSaving(false);
    if (!result.error) {
      success('User update!');
      onClose();
      router.refresh();
    } else {
      console.log('error', result.error);
      error('Something went wrong');
    }
  };

  return (
    <div className="w-[550px] relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSaving && <Spinner />}
        <div className="w-full flex items-center gap-4 text-white">
          <div onClick={onClose}>
            <HiOutlineX size={20} className="cursor-pointer " />
          </div>
          <h3 className="text-xl font-semibold flex-1">Edit profile</h3>
          <Button
            className="px-8 py-2 rounded-full bg-white text-black hover:bg-gray-300 font-semibold"
            variant="outline"
            disabled={isSaving}
          >
            Save
          </Button>
        </div>
        <div className="h-52 w-full relative mt-4">
          <div className="absolute z-10 bg-gray-800/40 w-full h-full flex items-center justify-center gap-2">
            <div className="">
              <label htmlFor="coverImage">
                <TbCameraPlus
                  size={10}
                  className="text-white bg-gray-950/60 p-4 z-20 w-14 h-14 rounded-full hover:bg-gray-950/50 hover:cursor-pointer hover:text-gray-300 transition"
                />
              </label>
              <input
                className="hidden"
                type="file"
                id="coverImage"
                onChange={handleFileChange}
              />
            </div>
            <HiOutlineX
              size={10}
              className="text-white bg-gray-950/60 p-4 z-20 w-14 h-14 rounded-full hover:bg-gray-950/50 hover:cursor-pointer hover:text-gray-300 transition"
              onClick={() => setTemporalBlogImage('')}
            />
          </div>
          <div className="w-full">
            <Image
              alt="Banner"
              fill
              style={{
                objectFit: 'cover',
              }}
              src={
                temporalBlogImage ||
                user.coverImage ||
                CONSTANTS.userBannerPlaceholder
              }
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="rounded-full h-32 w-32 absolute -bottom-4 border-[2px] border-gray-800 left-5">
            <div className="absolute z-10 bg-gray-800/40 w-full h-full rounded-full flex items-center justify-center">
              <div className="">
                <label htmlFor="profileImage">
                  <TbCameraPlus
                    size={10}
                    className="text-white bg-gray-950/60 p-4 z-20 w-14 h-14 rounded-full hover:bg-gray-950/50 hover:cursor-pointer hover:text-gray-300 transition"
                  />
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="profileImage"
                  onChange={handleProfileFileChange}
                />
              </div>
            </div>
            <Image
              alt="Avatar"
              fill
              style={{
                objectFit: 'cover',
                borderRadius: '100%',
              }}
              src={
                temporalBlobProfileImage ||
                user?.image ||
                CONSTANTS.userImagePlaceholder
              }
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          <Input
            label="Name"
            id="name"
            register={register}
            errors={errors}
            disabled={isSaving}
          />
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder=" "
                floatingLabel
                label="Bio"
                id="bio"
                className="peer resize-none text-white focus:outline-0 pt-6 pl-4 focus:border-brand  border border-gray-800 focus:ring-0 border-solid focus-visible:ring-0 focus-visible:ring-offset-0"
                {...field}
              />
            )}
          />
          {/* <Textarea
            placeholder="Bio"
            id="bio"
            register={register}
            errors={errors}
            disabled={isSaving}
          /> */}
          <Input
            label="Location"
            id="location"
            register={register}
            errors={errors}
            disabled={isSaving}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;

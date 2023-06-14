import axios from 'axios';
import { ProfileUserT, ResponseHook } from './../utils/types/index';
import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

const useUsers = () => {
  const updateUser = useCallback(
    async ({
      user,
      converImage,
      image = undefined,
      data,
    }: {
      user: ProfileUserT;
      converImage: File | undefined | null;
      image: File | undefined | null;
      data: FieldValues;
    }): Promise<ResponseHook> => {
      try {
        let newCoverImage = user.coverImage;
        let newProfileImage = user.image;
        if (converImage) {
          const formData = new FormData();
          formData.append('file', converImage);
          const { data } = await axios.post<{ fileUrl: string }>(
            `/api/upload`,
            formData
          );
          newCoverImage = data.fileUrl;
        }

        if (image) {
          const formData = new FormData();
          formData.append('file', image);
          const { data } = await axios.post<{ fileUrl: string }>(
            `/api/upload`,
            formData
          );
          newProfileImage = data.fileUrl;
        }

        const result = await axios.put(`/api/users/${user.id}`, {
          ...data,
          coverImage: newCoverImage,
          image: newProfileImage,
        });

        return { error: false, message: 'User update' };
      } catch (error) {
        return { error: true, message: 'Error on update' };
      }
    },
    []
  );

  return { updateUser };
};

export default useUsers;

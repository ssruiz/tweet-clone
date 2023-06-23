import axios from 'axios';
import { PostDTO, ProfileUserT, ResponseHook } from './../utils/types/index';
import { useCallback } from 'react';
import { FieldValues } from 'react-hook-form';

const usePosts = () => {
  const createPost = useCallback(
    async ({
      images = undefined,
      data,
    }: {
      images?: File[] | undefined | null;
      data: FieldValues;
    }): Promise<ResponseHook> => {
      try {
        // let newCoverImage = user.coverImage;
        // let newProfileImage = user.image;
        // if (converImage) {
        //   const formData = new FormData();
        //   formData.append('file', converImage);
        //   const { data } = await axios.post<{ fileUrl: string }>(
        //     `/api/upload`,
        //     formData
        //   );
        //   newCoverImage = data.fileUrl;
        // }

        // if (image) {
        //   const formData = new FormData();
        //   formData.append('file', image);
        //   const { data } = await axios.post<{ fileUrl: string }>(
        //     `/api/upload`,
        //     formData
        //   );
        //   newProfileImage = data.fileUrl;
        // }

        await axios.post('/api/post', {
          ...data,
        });

        return { error: false, message: 'Post update' };
      } catch (error) {
        console.log('error', error);
        return { error: true, message: 'Error on update' };
      }
    },
    []
  );

  const likePost = useCallback(
    async ({ postId }: { postId: string }): Promise<ResponseHook> => {
      try {
        await axios.post(`/api/post/like/${postId}`);

        return { error: false, message: 'Post update' };
      } catch (error) {
        console.log('error', error);
        return { error: true, message: 'Error on update' };
      }
    },
    []
  );

  const getPostsPaginated = useCallback(
    async (page: number = 1): Promise<PostDTO[]> => {
      try {
        const { data } = await axios.get<PostDTO[]>(
          `/api/post/paginated?page=${page}`
        );
        console.log('data', data);
        return data;
      } catch (error) {
        console.log('error', error);
        return [];
      }
    },
    []
  );

  return { createPost, likePost, getPostsPaginated };
};

export default usePosts;

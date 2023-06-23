'use client';

import { useInfiniteQuery } from 'react-query';
import { usePosts } from '../hooks';
import { useEffect, useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PostDTO } from '../utils/types';
import { Button } from './ui';
import { useIntersection } from '@mantine/hooks';
import Link from 'next/link';
import TweetPreview from './TweetPreview';
import SpinnerNormal from './ui/SpinnerNormal';

interface Props {
  userId?: string;
}

const PostList: React.FC<Props> = ({ userId }) => {
  const parentRef = useRef(null);
  const [rows, setRows] = useState<PostDTO[]>([]);
  const { getPostsPaginated } = usePosts();
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['posts'],
    async ({ pageParam = 1 }) => {
      const posts = await getPostsPaginated(pageParam);
      return posts;
    },

    {
      getNextPageParam: (_lastGroup, groups) => {
        const result = _lastGroup.length > 0 ? groups.length + 1 : undefined;
        return result;
      },
    }
  );

  const allRows = data ? data.pages.flatMap((d) => d) : [];

  const lastPostRef = useRef<HTMLElement>(null);
  const { entry, ref } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) console.log('intersectin');
    if (entry?.isIntersecting && hasNextPage) fetchNextPage();
  }, [entry]);
  // // const rowVirtualizer = useVirtualizer({
  // //   count: hasNextPage ? rows.length + 1 : rows.length,
  // //   getScrollElement: () => parentRef.current,
  // //   estimateSize: () => 100,
  // //   overscan: 5,
  // // });

  // console.log('hasNextPage', hasNextPage);
  return (
    <div className="flex flex-col">
      {allRows.map((post, index) => {
        console.log('post', post);
        return (
          <Link
            ref={index === allRows.length - 1 ? ref : null}
            key={post.id}
            href={`/${post.User.username}/status/${post.id}`}
          >
            <TweetPreview
              content={post.body}
              image={post.User.image || ''}
              date={post.createdAt}
              postId={post.id}
              likes={post.likeIds.length}
              username={post.User.username!}
              likeByUser={post.likeIds.some((like) => like === userId)}
              name={post.User.name!}
              comments={post.Comment.length}
              rts={0}
              authenticated={userId}
            />
          </Link>
        );
      })}

      {isFetchingNextPage ||
        (isFetching && (
          <div className="flex w-full justify-center mt-5">
            <SpinnerNormal />
          </div>
        ))}
    </div>
  );
};

export default PostList;

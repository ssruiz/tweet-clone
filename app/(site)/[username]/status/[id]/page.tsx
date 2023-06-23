import { getPostById } from '@/app/actions/getPosts';
import getSession from '@/app/actions/getSession';
import Header from '@/app/components/Header';
import TweetPreview from '@/app/components/TweetPreview';
import React from 'react';

interface IParams {
  id: string;
}

const TweetPage = async ({ params }: { params: IParams }) => {
  const session = await getSession();
  const { id } = params;

  const post = await getPostById(id);

  console.log('post', post);

  return (
    <div>
      <Header label="Tweet" subLabel="" canGoBack />

      {post && (
        <TweetPreview
          key={post.id}
          content={post.body}
          image={post.User.image || ''}
          date={post.createdAt}
          postId={post.id}
          likes={post.likeIds.length}
          username={post.User.username!}
          likeByUser={post.likeIds.some((like) => like === session?.user?.id)}
          name={post.User.name!}
          comments={post.Comment.length}
          rts={0}
          authenticated={session?.user.id}
        />
      )}
    </div>
  );
};

export default TweetPage;

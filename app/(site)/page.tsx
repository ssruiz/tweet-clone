import Header from '../components/Header';
import TweetBox from '../components/TweetBox';

import TweetPreview from '../components/TweetPreview';
import getSession from '../actions/getSession';
import { getPosts } from '../actions/getPosts';
import getUserByUsername from '../actions/getUser';

export default async function Home() {
  const session = await getSession();
  const posts = await getPosts();

  return (
    <div className="h-full">
      <Header label="Home" />
      {session && <TweetBox image={session?.user.image} />}

      <div className="flex flex-col">
        {posts.map((post) => (
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
          />
        ))}
      </div>
    </div>
  );
}

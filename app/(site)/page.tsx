import Header from '../components/Header';
import TweetBox from '../components/TweetBox';

import TweetPreview from '../components/TweetPreview';
import getSession from '../actions/getSession';
import { getPosts } from '../actions/getPosts';
import getUserByUsername from '../actions/getUser';
import ThemeChanger from '../components/ThemeChanger';
import Link from 'next/link';
import PostList from '../components/PostList';
import ReactQueryProvider from '../context/ReactQueryProvider';

export default async function Home() {
  const session = await getSession();

  return (
    <div className="h-full relative">
      <ReactQueryProvider>
        <div className="sticky top-0 bg-black/50 z-10 backdrop-blur-xl">
          <Header label="Home" />
          {/* <ThemeChanger /> */}
          {session && <TweetBox image={session?.user.image} />}
        </div>

        <PostList userId={session?.user.id} />
      </ReactQueryProvider>
    </div>
  );
}

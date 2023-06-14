import Header from '@/app/components/Header';
import { Skeleton } from '@/app/components/ui/skeleton';
import { BsImageFill } from 'react-icons/bs';

const Loading = () => {
  return (
    <div className='"flex flex-col text-white'>
      <Header label={'Profile'} subLabel={''} canGoBack />
      <div className="h-52 w-full relative">
        <Skeleton className="w-full h-full bg-gray-800 flex justify-center items-center">
          <BsImageFill size={40} />
        </Skeleton>
        <Skeleton className="bg-gray-800 rounded-full h-40 w-40 absolute -bottom-10 border-[2px] border-gray-800 left-5 items-center flex justify-center">
          <BsImageFill size={40} />
        </Skeleton>
      </div>
      <div className="text-white flex flex-col w-full gap-4 p-4 h-full">
        <div className="flex">
          <div className="flex-1" />
          <Skeleton className="h-12 w-28 rounded-full" />
        </div>

        <div className="w-full flex flex-col gap-2">
          <Skeleton className="bg-gray-600 h-6 w-40 rounded" />
          <Skeleton className="bg-gray-600 h-6 w-28 rounded" />
        </div>

        <Skeleton className="bg-gray-600 h-4 w-44 rounded-full" />

        <div className="flex gap-2 items-center text-gray-500">
          <Skeleton className="bg-gray-600 h-3 w-24 rounded" />
          <Skeleton className="bg-gray-600 h-3 w-24 rounded" />
        </div>

        <div className="flex gap-2 text-sm items-center text-gray-500">
          <Skeleton className="bg-gray-600 h-3 w-24 rounded" />
          <Skeleton className="bg-gray-600 h-3 w-24 rounded" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

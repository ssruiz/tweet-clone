'use client';
import { useParams, useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';

interface Props {
  label: string;
  subLabel?: string;
  canGoBack?: boolean;
}

const Header: React.FC<Props> = ({ label, subLabel, canGoBack }) => {
  const router = useRouter();
  return (
    <div className="border-b p-2 border-gray-700">
      <div className="flex flex-row items-center gap-2">
        {canGoBack && (
          <BiArrowBack
            size={30}
            className="text-white rounded-full hover:bg-gray-800 transition cursor-pointer mr-5"
            onClick={() => router.back()}
          />
        )}
        <div className="flex flex-col h-14 justify-center ml-2">
          <p className="text-white font-semibold text-xl">{label}</p>
          {subLabel && (
            <span className="text-sm font-light text-gray-200">
              {subLabel} tweets
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;

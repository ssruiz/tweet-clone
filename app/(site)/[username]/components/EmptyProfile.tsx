interface Props {
  username: string;
}

const EmptyProfile: React.FC<Props> = ({ username }) => {
  return (
    <div className="text-white flex flex-col w-full gap-4 p-4">
      <div className="w-full text-white flex flex-col mt-10">
        <p className="text-xl font-medium">{`@${username}`}</p>
      </div>
      <div className="w-full p-20 text-white">
        <p className="text-4xl font-bold px-10">
          This account doesn&apos;t exist
        </p>
        <p className="text-base mt-2 font-thin text-gray-500 px-10">
          Try searching for another.
        </p>
      </div>
    </div>
  );
};

export default EmptyProfile;

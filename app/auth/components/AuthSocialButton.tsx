import { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  onClick: () => void;
  text?: string;
}
export const AuthSocialButton: React.FC<Props> = ({
  icon: Icon,
  onClick,
  text,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-full bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-100 focus-outline-offset-0 transition"
    >
      <div className="flex gap-5 items-center">
        <Icon size={30} />
        {text && (
          <span className="text-gray-700 text-sm font-medium">{text}</span>
        )}
      </div>
    </button>
  );
};

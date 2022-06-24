import { BsFillPlayFill } from 'react-icons/bs';

const PlayButton = () => {
  return (
    <button className="flex items-center px-3 py-0.5 text-black bg-white rounded-md md:px-6 md:py-2">
      <BsFillPlayFill className="w-7 h-7" />
      <span className="text-sm md:text-lg">再生</span>
    </button>
  );
};

export default PlayButton;

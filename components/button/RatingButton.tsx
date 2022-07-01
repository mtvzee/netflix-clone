import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from 'react-icons/bs';

const RatingButton = () => {
  const [rating, setRating] = useState<'bad' | 'good' | 'love' | null>(null);

  const handleToggleRating = (ratingArg: 'bad' | 'good' | 'love') => {
    if (rating) {
      setRating(null);
    } else {
      setRating(ratingArg);
    }
  };

  return (
    <button className="relative p-2 border-2 rounded-full border-neutral-400 bg-neutral-700/80 hover:border-neutral-300 group">
      {rating === 'bad' ? (
        <BsHandThumbsDownFill className="w-4 h-4 text-white md:h-6 md:w-6" />
      ) : rating === 'good' ? (
        <BsHandThumbsUpFill className="w-4 h-4 text-white md:h-6 md:w-6" />
      ) : rating === 'love' ? (
        <AiFillHeart className="w-4 h-4 text-white md:h-6 md:w-6" />
      ) : (
        <BsHandThumbsUp className="w-4 h-4 text-white md:h-6 md:w-6" />
      )}
      <div className="absolute flex items-center invisible p-2 space-x-2 transition duration-300 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 top-1/2 group-hover:visible group-hover:opacity-100 bg-neutral-800 left-1/2">
        <button
          className="p-2 rounded-full hover:bg-neutral-700"
          onClick={() => handleToggleRating('bad')}
        >
          {rating === 'bad' ? (
            <BsHandThumbsDownFill className="w-4 h-4 text-white md:h-6 md:w-6" />
          ) : (
            <BsHandThumbsDown className="w-4 h-4 text-white md:h-6 md:w-6" />
          )}
        </button>
        <button
          className="p-2 rounded-full hover:bg-neutral-700"
          onClick={() => handleToggleRating('good')}
        >
          {rating === 'good' ? (
            <BsHandThumbsUpFill className="w-4 h-4 text-white md:h-6 md:w-6" />
          ) : (
            <BsHandThumbsUp className="w-4 h-4 text-white md:h-6 md:w-6" />
          )}
        </button>
        <button
          className="p-2 rounded-full hover:bg-neutral-700"
          onClick={() => handleToggleRating('love')}
        >
          {rating === 'love' ? (
            <AiFillHeart className="w-4 h-4 text-white md:h-6 md:w-6" />
          ) : (
            <AiOutlineHeart className="w-4 h-4 text-white md:h-6 md:w-6" />
          )}
        </button>
      </div>
    </button>
  );
};

export default RatingButton;

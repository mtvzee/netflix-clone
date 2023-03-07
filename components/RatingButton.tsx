import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from 'react-icons/bs';
import styles from '../styles/components/RatingButton.module.css';

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
    <button className={styles.container}>
      {rating === 'bad' ? (
        <BsHandThumbsDownFill className={styles.ratingIcon} />
      ) : rating === 'good' ? (
        <BsHandThumbsUpFill className={styles.ratingIcon} />
      ) : rating === 'love' ? (
        <AiFillHeart className={styles.ratingIcon} />
      ) : (
        <BsHandThumbsUp className={styles.ratingIcon} />
      )}
      <div className={styles.selectRatingContainer}>
        <button
          className={styles.selectRatingBtn}
          onClick={() => handleToggleRating('bad')}
        >
          {rating === 'bad' ? (
            <BsHandThumbsDownFill className={styles.ratingIcon} />
          ) : (
            <BsHandThumbsDown className={styles.ratingIcon} />
          )}
        </button>
        <button
          className={styles.selectRatingBtn}
          onClick={() => handleToggleRating('good')}
        >
          {rating === 'good' ? (
            <BsHandThumbsUpFill className={styles.ratingIcon} />
          ) : (
            <BsHandThumbsUp className={styles.ratingIcon} />
          )}
        </button>
        <button
          className={styles.selectRatingBtn}
          onClick={() => handleToggleRating('love')}
        >
          {rating === 'love' ? (
            <AiFillHeart className={styles.ratingIcon} />
          ) : (
            <AiOutlineHeart className={styles.ratingIcon} />
          )}
        </button>
      </div>
    </button>
  );
};

export default RatingButton;

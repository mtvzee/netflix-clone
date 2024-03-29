import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import { MovieDetails } from '../types/movieDetails';
import { fetchMovieDetails } from '../utils/fetchMovieDetails';
import styles from '../styles/components/Trailer.module.css';

type Props = {
  id: number | null;
  setShowTrailer: Dispatch<SetStateAction<boolean>>;
};

const Trailer = ({ id, setShowTrailer }: Props) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (id != null) {
      fetchMovieDetails(id).then((data) => setMovieDetails(data));
    }
  }, [id]);

  if (!movieDetails?.videos.results[0]?.key) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorMsg}>
          選択した映画のトレイラーがありません。
        </div>
        <button
          className={styles.backBtn}
          onClick={() => setShowTrailer(false)}
        >
          <AiOutlineArrowLeft className={styles.backIcon} />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${movieDetails?.videos.results[0]?.key}`}
        width="100%"
        height="100%"
        playing
        controls
      />
      <button className={styles.backBtn} onClick={() => setShowTrailer(false)}>
        <AiOutlineArrowLeft className={styles.backIcon} />
      </button>
    </div>
  );
};

export default Trailer;

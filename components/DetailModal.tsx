import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MovieDetails } from '../types/movieDetails';
import { fetchMovieDetails } from '../utils/fetchMovieDetails';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import RatingButton from './RatingButton';
import MyListButton from './MyListButton';
import styles from '../styles/components/DetailModal.module.css';

type Props = {
  id: number | null;
  setShowTrailer: Dispatch<SetStateAction<boolean>>;
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
};

const DetailModal = ({ id, setShowTrailer, setShowDetailModal }: Props) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (id != null) {
      fetchMovieDetails(id).then((data) => setMovieDetails(data));
    }
  }, [id]);
  return (
    <div>
      <div className={styles.overlay} onClick={() => setShowDetailModal(false)}>
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.imgWrapper}>
            <button onClick={() => setShowDetailModal(false)}>
              <AiOutlineClose className={styles.closeIcon} />
            </button>
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                movieDetails?.backdrop_path || movieDetails?.poster_path
              }`}
              alt="movie"
              fill
              className={styles.img}
            />
            <div className={styles.backgroundShadow} />
            <div className={styles.imgFeatures}>
              <h1 className={styles.title}>{movieDetails?.title}</h1>
              <div className={styles.buttons}>
                <button
                  className={styles.playBtn}
                  onClick={() => setShowTrailer(true)}
                >
                  <BsFillPlayFill className={styles.playIcon} />
                  <span className={styles.playText}>再生</span>
                </button>
                <MyListButton />
                <RatingButton />
              </div>
            </div>
          </div>

          <div className={styles.detail}>
            <div className={styles.detailLeft}>
              <div className={styles.metaData}>
                <div className={styles.match}>
                  マッチ度:
                  {movieDetails != null &&
                    (movieDetails?.vote_average * 10).toFixed()}
                  %
                </div>
                <span>{movieDetails?.release_date?.slice(0, 4)}</span>
                <span className={styles.quality}>HD</span>
              </div>
              <p className={styles.summary}>{movieDetails?.overview}</p>
            </div>
            <div className={styles.detailRight}>
              <h2>
                <span className={styles.category}>タイトル:</span>
                {movieDetails?.original_title}
              </h2>
              <div>
                <span className={styles.category}>ジャンル:</span>
                {movieDetails?.genres?.map((genre) => genre.name).join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailModal;

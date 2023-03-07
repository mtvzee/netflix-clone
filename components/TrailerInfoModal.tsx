import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MovieDetails } from '../types/movieDetails';
import { TrailerInfo } from '../types/trailerInfo';
import { fetchMovieDetails } from '../utils/fetchMovieDetails';
import styles from '../styles/components/TrailerInfoModal.module.css';
import Image from 'next/image';
import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { TrailerData } from '../types/trailerData';
import { BsFillPlayFill } from 'react-icons/bs';
import RatingButton from './RatingButton';

type Props = {
  id?: number;
  setTrailer: Dispatch<SetStateAction<TrailerData>>;
  setInfoModal: Dispatch<SetStateAction<TrailerInfo>>;
};

const TrailerInfoModal = ({ id, setTrailer, setInfoModal }: Props) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isAddedToMyList, setIsAddedToMyList] = useState(false);

  useEffect(() => {
    if (id != null) {
      fetchMovieDetails(id).then((data) => setMovieDetails(data));
    }
  }, [id]);
  return (
    <div>
      <div
        className={styles.overlay}
        onClick={() => setInfoModal({ show: false, id: id })}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          <div className={styles.imgWrapper}>
            <button onClick={() => setInfoModal({ show: false, id: id })}>
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
                  onClick={() => setTrailer({ show: true, id: id })}
                >
                  <BsFillPlayFill className={styles.playIcon} />
                  <span className={styles.playText}>再生</span>
                </button>
                <button
                  className={styles.myListBtn}
                  onClick={() => setIsAddedToMyList(!isAddedToMyList)}
                >
                  {isAddedToMyList ? (
                    <AiOutlineCheck className={styles.myListIcon} />
                  ) : (
                    <AiOutlinePlus className={styles.myListIcon} />
                  )}
                </button>
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
export default TrailerInfoModal;

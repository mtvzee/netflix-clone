import Image from 'next/image';
import { Movie } from '../types/movie';
import styles from '../styles/components/Thumbnail.module.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BsFillPlayFill } from 'react-icons/bs';
import MyListButton from './MyListButton';
import RatingButton from './RatingButton';
import { BiChevronDown } from 'react-icons/bi';
import { fetchMovieDetails } from '../utils/fetchMovieDetails';
import { MovieDetails } from '../types/movieDetails';
import { TrailerData } from '../types/trailerData';
import { TrailerInfo } from '../types/trailerInfo';

type Props = {
  movie: Movie;
  setTrailer: Dispatch<SetStateAction<TrailerData>>;
  setInfoModal: Dispatch<SetStateAction<TrailerInfo>>;
};
type Position = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

const Thumbnail = ({ movie, setTrailer, setInfoModal }: Props) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnterThumbnail = () => {
    setTimeout(() => {
      setPosition({
        top: ref.current?.getBoundingClientRect().top ?? 0,
        bottom: ref.current?.getBoundingClientRect().bottom ?? 0,
        left: ref.current?.getBoundingClientRect().left ?? 0,
        right: ref.current?.getBoundingClientRect().right ?? 0,
      });
    }, 1000);
  };
  const handleMouseLeaveThumbnail = () => {
    setTimeout(() => {
      setPosition(null);
    }, 1000);
  };

  useEffect(() => {
    if (movie.id != null) {
      fetchMovieDetails(movie.id).then((data) => setMovieDetails(data));
    }
  }, [movie.id]);

  return (
    <div
      className={styles.container}
      ref={ref}
      onMouseEnter={handleMouseEnterThumbnail}
      onMouseLeave={handleMouseLeaveThumbnail}
    >
      <div className={styles.imgWrapper}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.title ?? ''}
          className={styles.img}
          fill
          sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        />
      </div>

      {position && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={styles.modalWrapper}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            // top: `${position.top - (position?.bottom - position?.top) / 2}px`,
            // left: `${position.left - (position?.right - position?.left) / 2}px`,
          }}
        >
          <div className={`${styles.imgWrapper} ${styles.modalImgWrapper}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
              alt={movie.title ?? ''}
              className={styles.img}
              fill
              sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
            />
          </div>
          <div className={styles.modalBottom}>
            <div className={styles.Btns}>
              <div className={styles.leftBtns}>
                <button
                  className={styles.playBtn}
                  onClick={() =>
                    setTrailer({ show: true, id: movieDetails?.id })
                  }
                >
                  <BsFillPlayFill className={styles.playIcon} />
                </button>
                <MyListButton />
                <RatingButton />
              </div>
              <button
                className={styles.detailBtn}
                onClick={() =>
                  setInfoModal({ show: true, id: movieDetails?.id })
                }
              >
                <BiChevronDown className={styles.detailIcon} />
              </button>
            </div>
            <div className={styles.metaData}>
              <div className={styles.match}>
                マッチ度:
                {movieDetails != null &&
                  (movieDetails?.vote_average * 10).toFixed()}
                %
              </div>
              <span className={styles.quality}>HD</span>
            </div>
            <div className={styles.genre}>
              {movieDetails?.genres?.map((genre) => genre.name).join('・')}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Thumbnail;

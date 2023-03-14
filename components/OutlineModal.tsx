import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';
import { Movie } from '../types/movie';
import { MovieDetails } from '../types/movieDetails';
import { Position } from '../types/position';
import { fetchMovieDetails } from '../utils/fetchMovieDetails';
import MyListButton from './MyListButton';
import RatingButton from './RatingButton';
import styles from '../styles/components/OutlineModal.module.css';

type Props = {
  movie: Movie;
  position: Position;
  setSelectedMovieId: Dispatch<SetStateAction<number | null>>;
  setShowTrailer: Dispatch<SetStateAction<boolean>>;
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
};

const OutlineModal = ({
  movie,
  position,
  setSelectedMovieId,
  setShowTrailer,
  setShowDetailModal,
}: Props) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const handleShowTrailer = () => {
    setSelectedMovieId(movie.id);
    setShowTrailer(true);
  };
  const handleShowDetailModal = () => {
    setSelectedMovieId(movie.id);
    setShowDetailModal(true);
  };

  useEffect(() => {
    if (movie.id != null) {
      fetchMovieDetails(movie.id).then((data) => setMovieDetails(data));
    }
  }, [movie.id]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className={styles.modalWrapper}
      style={{
        top: position?.top + position?.height / 2,
        left: position?.left + position?.width / 2,
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
            <button className={styles.playBtn} onClick={handleShowTrailer}>
              <BsFillPlayFill className={styles.playIcon} />
            </button>
            <MyListButton />
            <RatingButton />
          </div>
          <button className={styles.detailBtn} onClick={handleShowDetailModal}>
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
  );
};
export default OutlineModal;

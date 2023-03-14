import Image from 'next/image';
import { Movie } from '../types/movie';
import styles from '../styles/components/Thumbnail.module.css';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import OutlineModal from './OutlineModal';
import { Position } from '../types/position';

type Props = {
  movie: Movie;
  setSelectedMovieId: Dispatch<SetStateAction<number | null>>;
  setShowTrailer: Dispatch<SetStateAction<boolean>>;
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
};

const Thumbnail = ({
  movie,
  setSelectedMovieId,
  setShowTrailer,
  setShowDetailModal,
}: Props) => {
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const { top, left, width, height } = ref.current.getBoundingClientRect();
      setPosition({ top, left, width, height });
    }
    setShowModal(true);
  };

  return (
    <div
      className={styles.container}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowModal(false)}
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

      {showModal && (
        <OutlineModal
          movie={movie}
          position={position}
          setSelectedMovieId={setSelectedMovieId}
          setShowTrailer={setShowTrailer}
          setShowDetailModal={setShowDetailModal}
        />
      )}
    </div>
  );
};

export default Thumbnail;

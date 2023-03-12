import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Movie } from '../types/movie';
import Thumbnail from './Thumbnail';
import styles from '../styles/components/Carousel.module.css';
import { TrailerData } from '../types/trailerData';
import { TrailerInfo } from '../types/trailerInfo';

type Props = {
  title: string;
  movies: Movie[];
  setTrailer: Dispatch<SetStateAction<TrailerData>>;
  setInfoModal: Dispatch<SetStateAction<TrailerInfo>>;
};

const Row = ({ title, movies, setTrailer, setInfoModal }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (direction: string) => {
    setIsScrolled(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollPosition =
        direction === 'left'
          ? scrollLeft - clientWidth * 0.92
          : scrollLeft + clientWidth * 0.92;
      rowRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.carousel}>
        <div className={styles.thumbnails} ref={rowRef}>
          <div className={styles.space} />
          {movies.map((movie) => (
            <Thumbnail
              key={movie.id}
              movie={movie}
              setTrailer={setTrailer}
              setInfoModal={setInfoModal}
            />
          ))}
          <div className={styles.space} />
        </div>
        {isScrolled && (
          <button
            className={`${styles.scrollBtn} ${styles.prevBtn}`}
            onClick={() => handleScroll('left')}
          >
            <BsChevronLeft className={styles.scrollIcon} />
          </button>
        )}
        <button
          className={`${styles.scrollBtn} ${styles.nextBtn}`}
          onClick={() => handleScroll('right')}
        >
          <BsChevronRight className={styles.scrollIcon} />
        </button>
      </div>
    </div>
  );
};

export default Row;

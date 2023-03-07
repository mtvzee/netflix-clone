import Image from 'next/image';
import { Movie } from '../types/movie';
import styles from '../styles/components/Thumbnail.module.css';

type Props = {
  movie: Movie;
};

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className={styles.container}>
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
          // onClick={onOpen}
        />
      </div>

      {/* <ModalDialog id={movie.id} isOpen={isOpen} onClose={onClose} /> */}
    </div>
  );
};

export default Thumbnail;

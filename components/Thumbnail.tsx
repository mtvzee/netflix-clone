import { useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { Movie } from '../types/movie';
import ModalDialog from './ModalDialog';
import styles from '../styles/components/Thumbnail.module.css';

type Props = {
  movie: Movie;
};

const Thumbnail = ({ movie }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.container}>
      <div className={styles.imgWrapper}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.title}
          className={styles.img}
          fill
          onClick={onOpen}
        />
      </div>

      <ModalDialog id={movie.id} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Thumbnail;

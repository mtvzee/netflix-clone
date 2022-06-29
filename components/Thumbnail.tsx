import { useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { Movie } from '../types/movie';
import ModalDialog from './ModalDialog';

type Props = {
  movie: Movie;
};

const Thumbnail = ({ movie }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        className="relative h-28 min-w-[180px] cursor-pointer  hover:scale-105 md:h-36 md:min-w-[260px] rounded-sm overflow-hidden"
        onClick={onOpen}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <ModalDialog id={movie.id} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Thumbnail;

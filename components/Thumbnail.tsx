import Image from 'next/image';
import { Movie } from '../types/movie';

type Props = {
  movie: Movie;
};

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer  hover:scale-105 md:h-36 md:min-w-[260px] rounded-sm overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        alt={movie.title}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Thumbnail;

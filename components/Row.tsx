import { useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Movie } from '../types/movie';
import Thumbnail from './Thumbnail';

type Props = {
  title: string;
  movies: Movie[];
};

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (direction: string) => {
    setIsScrolled(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollPosition =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="space-y-1">
      <h2 className="lg:text-lg">{title}</h2>
      <div className="relative group">
        {isScrolled && (
          <button
            className="absolute left-0 z-10 invisible w-6 h-full -translate-y-1/2 opacity-0 top-1/2 hover:bg-black/60 bg-black/40 group-hover:visible group-hover:opacity-100 lg:w-12"
            onClick={() => handleScroll('left')}
          >
            <BsChevronLeft className="w-4 h-full m-auto transition hover:scale-150 lg:w-8" />
          </button>
        )}
        <div
          className="flex items-center space-x-0.5 overflow-x-hidden md:space-x-2"
          ref={rowRef}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <button
          className="absolute right-0 z-10 invisible w-6 h-full -translate-y-1/2 opacity-0 top-1/2 hover:bg-black/60 bg-black/40 group-hover:visible group-hover:opacity-100 lg:w-12"
          onClick={() => handleScroll('right')}
        >
          <BsChevronRight className="w-4 h-full m-auto transition hover:scale-150 lg:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Row;

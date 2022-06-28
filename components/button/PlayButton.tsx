import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import ReactPlayer from 'react-player';
import { MovieDetails } from '../../types/movieDetails';
import { fetchMovieDetails } from '../../utils/fetchMovieDetails';

type Props = {
  // movieDetails: MovieDetails | null;
  id?: number;
};

const PlayButton = ({ id }: Props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  useEffect(() => {
    if (id != null) {
      fetchMovieDetails(id).then((data) => setMovieDetails(data));
    }
  }, [id]);

  return (
    <div>
      <button
        className="flex items-center px-3 py-0.5 text-black bg-white rounded-md md:px-6 md:py-2 hover:opacity-70"
        onClick={() => setIsOpened(true)}
      >
        <BsFillPlayFill className="w-7 h-7" />
        <span className="text-sm md:text-lg">再生</span>
      </button>
      {isOpened && (
        <div className="fixed inset-0 z-40 w-screen h-screen">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${movieDetails?.videos.results[0].key}`}
            width="100%"
            height="100%"
            // style={{
            //   position: 'absolute',
            //   top: '0',
            //   left: '0',
            // }}
            playing
            controls
            // playIcon={<button>Play</button>}
            // muted={muted}
            // controls={true}
            // config={{
            //   youtube: {
            //     playerVars: { showinfo: 1 },
            //   },
            // }}
          />
          <button
            className="absolute z-50 top-16 left-5 "
            onClick={() => setIsOpened(false)}
          >
            <AiOutlineArrowLeft className="w-8 h-8 text-white md:h-14 md:w-14" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayButton;

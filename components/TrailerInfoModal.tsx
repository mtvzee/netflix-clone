import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MovieDetails } from '../types/movieDetails';
import { TrailerInfo } from '../types/trailerInfo';
import { fetchMovieDetails } from '../utils/fetchMovieDetails';
import styles from '../styles/components/TrailerInfoModal.module.css';
import Image from 'next/image';
import { AiOutlineCheck, AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import RatingButton from './button/RatingButton';
import Trailer from './Trailer';
import { TrailerData } from '../types/trailerData';
import { BsFillPlayFill } from 'react-icons/bs';

type Props = {
  id?: number;
  setTrailer: Dispatch<SetStateAction<TrailerData>>;
  setInfoModal: Dispatch<SetStateAction<TrailerInfo>>;
};

const TrailerInfoModal = ({ id, setTrailer, setInfoModal }: Props) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isAddedToMyList, setIsAddedToMyList] = useState(false);

  useEffect(() => {
    if (id != null) {
      fetchMovieDetails(id).then((data) => setMovieDetails(data));
    }
  }, [id]);
  return (
    <div>
      <div className={styles.overlay}>
        <div className={styles.container}>
          <div className={styles.imgWrapper}>
            <button onClick={() => setInfoModal({ show: false, id: id })}>
              <AiOutlineClose className={styles.closeIcon} />
            </button>
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                movieDetails?.backdrop_path || movieDetails?.poster_path
              }`}
              alt="movie"
              fill
              className={styles.img}
              // className="relative  h-[30vh] md:h-[40vh] lg:h-[50vh]"
            />
            <div className={styles.backgroundShadow} />
            <div className={styles.imgFeatures}>
              <h1 className={styles.title}>{movieDetails?.title}</h1>
              <div className={styles.buttons}>
                <button
                  className={styles.playBtn}
                  onClick={() => setTrailer({ show: true, id: id })}
                >
                  <BsFillPlayFill className={styles.playIcon} />
                  <span className={styles.playText}>再生</span>
                </button>
                <button
                  className="p-2 border-2 rounded-full border-neutral-400 bg-neutral-700/80 hover:border-neutral-300"
                  onClick={() => setIsAddedToMyList(!isAddedToMyList)}
                >
                  {isAddedToMyList ? (
                    <AiOutlineCheck className="w-4 h-4 text-white md:h-6 md:w-6" />
                  ) : (
                    <AiOutlinePlus className="w-4 h-4 text-white md:h-6 md:w-6" />
                  )}
                </button>
                <RatingButton />
              </div>
            </div>
          </div>

          <div className="flex px-10 pt-2 space-x-6 text-white md:space-x-8">
            <div className="space-y-6 basis-3/5">
              <div className="space-x-2 md:flex md:items-center">
                <p className="text-lg text-green-400">
                  マッチ度:
                  {movieDetails != null && movieDetails?.vote_average * 10}%
                </p>
                <span>{movieDetails?.release_date?.slice(0, 4)}</span>
                <span className="px-2 text-sm border rounded">HD</span>
              </div>
              <p>{movieDetails?.overview}</p>
            </div>
            <div className="space-y-6 basis-2/5">
              <h2>
                <span className="text-gray-400">タイトル:</span>
                {movieDetails?.original_title}
              </h2>
              <div>
                <span className="text-gray-400">ジャンル:</span>
                {movieDetails?.genres?.map((genre) => genre.name).join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrailerInfoModal;

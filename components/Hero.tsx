import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './button/PlayButton';
import { MovieDetails } from '../types/movieDetails';

type Props = {
  comedy: Movie[];
};

const Hero = ({ comedy }: Props) => {
  const [hero, setHero] = useState<Movie | null>(null);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  // ヒーローに表示する映画情報をランダムで取得する
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * comedy.length);
    comedy[randomNum].overview !== '' && setHero(comedy[randomNum]);
  }, [comedy]);

  // 映画情報の詳細をフェッチ
  useEffect(() => {
    const fetchMovieDetails = async (id: number) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ja-JP&append_to_response=videos`
      );
      const data = await res.json();
      return data;
    };
    if (hero != null) {
      fetchMovieDetails(hero.id).then((data) => {
        setMovieDetails(data);
      });
    }
  }, [hero]);

  return (
    <>
      <div className="absolute top-0 h-[35vh] md:h-[50vh] lg:h-[75vh] xl:h-[85vh] 2xl:h-screen w-screen min-h-[300px]">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            hero?.backdrop_path || hero?.poster_path
          }`}
          alt={hero?.original_title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute flex flex-col pt-24 pl-6 space-y-3 lg:pl-10 xl:pl-16 md:pt-36 xl:pt-60 lg:space-y-5">
        <h1 className="max-w-md text-3xl font-bold lg:text-5xl xl:text-7xl lg:max-w-xl">
          {hero?.title || hero?.original_title}
        </h1>
        <p className="max-w-xs text-xs text-neutral-100 md:text-md lg:max-w-lg lg:text-lg">
          {hero?.overview.slice(0, 100)}
          {hero?.overview != null && hero?.overview.length > 100 && '...'}
        </p>
        <div className="flex items-center space-x-2">
          <PlayButton movieDetails={movieDetails} />
          <button className="flex items-center px-3 py-1.5 space-x-2 rounded-md bg-gray-700/70 md:px-6 md:py-2">
            <AiOutlineInfoCircle className="w-6 h-6" />
            <span className="text-sm md:text-lg">もっと見る</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;

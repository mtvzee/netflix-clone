import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from '../styles/components/Hero.module.css';
import { BsFillPlayFill } from 'react-icons/bs';

type Props = {
  scienceFiction: Movie[];
  setSelectedMovieId: Dispatch<SetStateAction<number | null>>;
  setShowTrailer: Dispatch<SetStateAction<boolean>>;
  setShowDetailModal: Dispatch<SetStateAction<boolean>>;
};

const Hero = ({
  scienceFiction,
  setSelectedMovieId,
  setShowTrailer,
  setShowDetailModal,
}: Props) => {
  const [hero, setHero] = useState<Movie | null>(null);

  // ヒーローイメージに表示する映画情報をランダムで取得する
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * scienceFiction.length);
    scienceFiction[randomNum].overview !== '' &&
      setHero(scienceFiction[randomNum]);
  }, [scienceFiction]);

  useEffect(() => {
    if (hero?.id) {
      setSelectedMovieId(hero?.id);
    }
  }, [setSelectedMovieId, hero?.id]);

  return (
    <div className={styles.container}>
      <Image
        src={`https://image.tmdb.org/t/p/original/${
          hero?.backdrop_path || hero?.poster_path
        }`}
        alt={hero?.original_title ?? ''}
        className={styles.heroImage}
        priority
        width={3000}
        height={2000}
      />
      <div className={styles.info}>
        <h1 className={styles.title}>{hero?.title || hero?.original_title}</h1>
        <p className={styles.description}>
          {hero?.overview.slice(0, 100)}
          {hero?.overview != null && hero?.overview.length > 100 && '...'}
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.playBtn}
            onClick={() => setShowTrailer(true)}
          >
            <BsFillPlayFill className={styles.playIcon} />
            <span className={styles.playText}>再生</span>
          </button>
          <button
            className={styles.infoBtn}
            onClick={() => setShowDetailModal(true)}
          >
            <AiOutlineInfoCircle className={styles.infoIcon} />
            <span className={styles.infoText}>もっと見る</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

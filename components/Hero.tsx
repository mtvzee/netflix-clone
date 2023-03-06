import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from '../styles/components/Hero.module.css';
import { BsFillPlayFill } from 'react-icons/bs';
import { TrailerData } from '../types/trailerData';
import { TrailerInfo } from '../types/trailerInfo';

type Props = {
  scienceFiction: Movie[];
  setTrailer: Dispatch<SetStateAction<TrailerData>>;
  setInfoModal: Dispatch<SetStateAction<TrailerInfo>>;
};

const Hero = ({
  scienceFiction,
  setTrailer: setTrailer,
  setInfoModal: setInfoModal,
}: Props) => {
  const [hero, setHero] = useState<Movie | null>(null);

  // ヒーローイメージに表示する映画情報をランダムで取得する
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * scienceFiction.length);
    scienceFiction[randomNum].overview !== '' &&
      setHero(scienceFiction[randomNum]);
  }, [scienceFiction, setTrailer]);

  useEffect(() => {
    setTrailer({ show: false, id: hero?.id });
  }, [setTrailer, hero?.id]);

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
          {/* <PlayButton id={hero?.id} />  */}
          <button
            className={styles.playBtn}
            onClick={() => setTrailer({ show: true, id: hero?.id })}
          >
            <BsFillPlayFill className={styles.playIcon} />
            <span className={styles.playText}>再生</span>
          </button>
          <button
            className={styles.infoBtn}
            onClick={() => setInfoModal({ show: true, id: hero?.id })}
          >
            <AiOutlineInfoCircle className={styles.infoIcon} />
            <span className={styles.infoText}>もっと見る</span>
          </button>
          {/* <ModalDialog id={hero?.id} isOpen={isOpen} onClose={onClose} /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;

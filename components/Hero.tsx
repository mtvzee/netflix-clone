import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './button/PlayButton';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModalDialog from './ModalDialog';
import styles from '../styles/components/Hero.module.css';

type Props = {
  scienceFiction: Movie[];
};

const Hero = ({ scienceFiction }: Props) => {
  const [hero, setHero] = useState<Movie | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ヒーローイメージに表示する映画情報をランダムで取得する
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * scienceFiction.length);
    scienceFiction[randomNum].overview !== '' &&
      setHero(scienceFiction[randomNum]);
  }, [scienceFiction]);

  return (
    <div className={styles.container}>
      <Image
        src={`https://image.tmdb.org/t/p/original/${
          hero?.backdrop_path || hero?.poster_path
        }`}
        alt={hero?.original_title ?? ''}
        className={styles.heroImage}
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
          <PlayButton id={hero?.id} />
          <Button
            onClick={onOpen}
            bg="gray.600"
            opacity="0.8"
            size={{ base: 'sm', md: 'lg' }}
            gap="1"
            _hover={{ opacity: '.6' }}
          >
            <AiOutlineInfoCircle className="w-6 h-6" />
            <span className="text-sm md:text-lg">もっと見る</span>
          </Button>
          <ModalDialog id={hero?.id} isOpen={isOpen} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default Hero;

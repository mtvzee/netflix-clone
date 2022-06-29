import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './button/PlayButton';
import { Button, useDisclosure } from '@chakra-ui/react';
import ModalDialog from './ModalDialog';

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
    <>
      <div className="absolute top-0 h-[35vh] md:h-[50vh] lg:h-[75vh] xl:h-[85vh] 2xl:h-screen w-screen min-h-[300px] left-0 -z-10">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            hero?.backdrop_path || hero?.poster_path
          }`}
          alt={hero?.original_title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col space-y-3 py-14 md:py-28 lg:py-36 xl:pt-60 lg:space-y-5">
        <h1 className="max-w-md text-3xl font-bold lg:text-5xl xl:text-7xl lg:max-w-xl">
          {hero?.title || hero?.original_title}
        </h1>
        <p className="max-w-xs text-xs text-neutral-100 md:text-md lg:max-w-lg lg:text-lg">
          {hero?.overview.slice(0, 100)}
          {hero?.overview != null && hero?.overview.length > 100 && '...'}
        </p>
        <div className="flex items-center space-x-2">
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
    </>
  );
};

export default Hero;

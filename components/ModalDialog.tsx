import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import { MovieDetails } from '../types/movieDetails';
import { fetchMovieDetails } from '../utils/fetchMovieDetails';
import PlayButton from './button/PlayButton';
import RatingButton from './button/RatingButton';

type Props = {
  id?: number;
  isOpen: boolean;
  onClose: () => void;
};

const ModalDialog = ({ id, isOpen, onClose }: Props) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isAddedToMyList, setIsAddedToMyList] = useState(false);

  useEffect(() => {
    if (id != null) {
      fetchMovieDetails(id).then((data) => setMovieDetails(data));
    }
  }, [id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ sm: 'lg', md: '4xl' }}>
      <ModalOverlay />
      <ModalContent h="full" overflow="hidden" bg="black">
        <ModalCloseButton
          borderRadius="full"
          color="white"
          zIndex="1"
          bg="blackAlpha.900"
          _hover={{ opacity: 'none' }}
        />
        <ModalBody p="0">
          <div className="relative  h-[30vh] md:h-[40vh] lg:h-[50vh]">
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                movieDetails?.backdrop_path || movieDetails?.poster_path
              }`}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="absolute top-[12%] z-40 text-4xl text-white left-10 tracking-tighter font-bold md:top-1/4 md:text-7xl">
            {movieDetails?.title}
          </h1>
          <div className="absolute z-40 flex items-center space-x-3 top-[20%] left-10 md:top-[40%]">
            <PlayButton id={id} />
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDialog;

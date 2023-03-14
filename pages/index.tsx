import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { requests } from '../constants';
import { Movie } from '../types/movie';
import styles from '../styles/pages/Home.module.css';
import Footer from '../components/Footer';
import { useState } from 'react';
import Trailer from '../components/Trailer';
import TrailerInfoModal from '../components/DetailModal';
import DetailModal from '../components/DetailModal';

type Props = {
  trending: Movie[];
  adventure: Movie[];
  animation: Movie[];
  comedy: Movie[];
  documentary: Movie[];
  romance: Movie[];
  scienceFiction: Movie[];
};

const Home: NextPage<Props> = ({
  trending,
  adventure,
  animation,
  comedy,
  documentary,
  romance,
  scienceFiction,
}) => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <div>
      <Head>
        <title>ホーム - MovieClone</title>
      </Head>
      <Header />
      <main>
        <Hero
          scienceFiction={scienceFiction}
          setSelectedMovieId={setSelectedMovieId}
          setShowTrailer={setShowTrailer}
          setShowDetailModal={setShowDetailModal}
        />
        <div>
          <Carousel
            title="人気急上昇の作品"
            movies={trending}
            setSelectedMovieId={setSelectedMovieId}
            setShowTrailer={setShowTrailer}
            setShowDetailModal={setShowDetailModal}
          />
          <Carousel
            title="アドベンチャー"
            movies={adventure}
            setSelectedMovieId={setSelectedMovieId}
            setShowTrailer={setShowTrailer}
            setShowDetailModal={setShowDetailModal}
          />
          <Carousel
            title="アニメ"
            movies={animation}
            setSelectedMovieId={setSelectedMovieId}
            setShowTrailer={setShowTrailer}
            setShowDetailModal={setShowDetailModal}
          />
          <Carousel
            title="コメディ"
            movies={comedy}
            setSelectedMovieId={setSelectedMovieId}
            setShowTrailer={setShowTrailer}
            setShowDetailModal={setShowDetailModal}
          />
          <Carousel
            title="ドキュメンタリー"
            movies={documentary}
            setSelectedMovieId={setSelectedMovieId}
            setShowTrailer={setShowTrailer}
            setShowDetailModal={setShowDetailModal}
          />
          <Carousel
            title="ラブロマンス"
            movies={romance}
            setSelectedMovieId={setSelectedMovieId}
            setShowTrailer={setShowTrailer}
            setShowDetailModal={setShowDetailModal}
          />
          <Carousel
            title="サイエンスフィクション"
            movies={scienceFiction}
            setSelectedMovieId={setSelectedMovieId}
            setShowTrailer={setShowTrailer}
            setShowDetailModal={setShowDetailModal}
          />
        </div>
      </main>
      <Footer />
      {showTrailer && (
        <Trailer id={selectedMovieId} setShowTrailer={setShowTrailer} />
      )}
      {showDetailModal && (
        <DetailModal
          id={selectedMovieId}
          setShowTrailer={setShowTrailer}
          setShowDetailModal={setShowDetailModal}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [
    trending,
    adventure,
    animation,
    comedy,
    documentary,
    romance,
    scienceFiction,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchAdventure).then((res) => res.json()),
    fetch(requests.fetchAnimation).then((res) => res.json()),
    fetch(requests.fetchComedy).then((res) => res.json()),
    fetch(requests.fetchDocumentary).then((res) => res.json()),
    fetch(requests.fetchRomance).then((res) => res.json()),
    fetch(requests.fetchSF).then((res) => res.json()),
  ]);
  return {
    props: {
      trending: trending.results,
      adventure: adventure.results,
      animation: animation.results,
      comedy: comedy.results,
      documentary: documentary.results,
      romance: romance.results,
      scienceFiction: scienceFiction.results,
    },
  };
};

export default Home;

import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import { requests } from '../constants';
import { Movie } from '../types/movie';
import styles from '../styles/pages/Home.module.css';
import Footer from '../components/Footer';

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
  return (
    <div>
      <Head>
        <title>ホーム - NetflixClone</title>
      </Head>
      <Header />
      <main>
        <Hero scienceFiction={scienceFiction} />
        <div>
          <Carousel title="人気急上昇の作品" movies={trending} />
          <Carousel title="アドベンチャー" movies={adventure} />
          <Carousel title="アニメ" movies={animation} />
          <Carousel title="コメディ" movies={comedy} />
          <Carousel title="ドキュメンタリー" movies={documentary} />
          <Carousel title="ラブロマンス" movies={romance} />
          <Carousel title="サイエンスフィクション" movies={scienceFiction} />
        </div>
      </main>
      <Footer />
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

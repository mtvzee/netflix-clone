import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Row from '../components/Row';
import { requests } from '../constants';
import { Movie } from '../types/movie';

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
    <div className="h-screen text-white ">
      <Head>
        <title>ホーム - NetflixClone</title>
      </Head>
      <Header />
      <main className="pl-6 lg:pl-10 xl:pl-16">
        <Hero scienceFiction={scienceFiction} />
        <div className="relative space-y-5 md:space-y-8">
          <Row title="人気急上昇の作品" movies={trending} />
          <Row title="アドベンチャー" movies={adventure} />
          <Row title="アニメ" movies={animation} />
          <Row title="コメディ" movies={comedy} />
          <Row title="ドキュメンタリー" movies={documentary} />
          <Row title="ラブロマンス" movies={romance} />
          <Row title="サイエンスフィクション" movies={scienceFiction} />
        </div>
      </main>
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

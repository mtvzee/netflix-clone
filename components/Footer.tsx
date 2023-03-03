import Link from 'next/link';
import styles from '../styles/components/Footer.module.css';
import { FaFacebookF } from 'react-icons/fa';
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from 'react-icons/ai';

const linkTitles = [
  '音声ガイド',
  'ヘルプセンター',
  'プリペイド・ギフトカード',
  'メディアセンター',
  'IR:投資家情報（英語）',
  '採用情報（英語）',
  'Netflixショップ',
  '利用規約',
  'プライバシー',
  '法的事項',
  'Cookieの設定',
  'Netflix企業情報',
  'お問い合せ',
  '特定商取引に基づく表示',
];

const Footer = () => {
  return (
    <footer className={styles.container}>
      <ul className={styles.snsLinks}>
        <li>
          <Link href="/">
            <FaFacebookF className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <AiOutlineInstagram className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <AiOutlineTwitter className={styles.icon} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <AiFillYoutube className={styles.icon} />
          </Link>
        </li>
      </ul>
      <ul className={styles.infoLinks}>
        {linkTitles.map((title) => (
          <li key={title} className={styles.infoItem}>
            <Link href="/" className={styles.infoLink}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <button className={styles.serviceCode}>サービスコード</button>
      <div className={styles.copyright}>© 1997-2023 NetflixClone, Inc.</div>
    </footer>
  );
};
export default Footer;

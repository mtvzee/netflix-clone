import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi';
import DropdownMenu from './DropdownMenu';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';
import styles from '../styles/components/Header.module.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled && styles.isScrolled}`}>
      <div className={styles.container}>
        <div className={styles.leftBox}>
          <div className={styles.logo}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="netflix-logo"
              fill
            />
          </div>
          <DropdownMenu />
          <ul className={styles.menuNav}>
            <li>
              <Link href="/" className={styles.headerLInk}>
                ホーム
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.headerLink}>
                TV番組・ドラマ
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.headerLink}>
                映画
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.headerLink}>
                新作&人気作
              </Link>
            </li>
            <li>
              <Link href="/" className={styles.headerLink}>
                マイリスト
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.rightBox}>
          <SearchBar />
          <BiBell className={styles.bellIcon} />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

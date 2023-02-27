import Link from 'next/link';
import { GoTriangleDown } from 'react-icons/go';
import styles from '../styles/components/DropdownMenu.module.css';

const DropdownMenu = () => {
  return (
    <div className={styles.container}>
      <div
        // className="relative flex items-center space-x-1 cursor-pointer lg:hidden"
        className={styles.menuIcon}
      >
        <span className={styles.title}>メニュー</span>
        <GoTriangleDown />
      </div>
      <ul className={styles.links}>
        <li>
          <Link href="/" className={styles.menuItem}>
            ホーム
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.menuItem}>
            TV番組・ドラマ
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.menuItem}>
            映画
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.menuItem}>
            新作&人気作
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.menuItem}>
            マイリスト
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;

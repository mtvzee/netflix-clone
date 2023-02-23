import Link from 'next/link';
import { GoTriangleDown } from 'react-icons/go';
import styles from '../styles/components/DropdownMenu.module.css';

const DropdownMenu = () => {
  return (
    <div className={styles.dropdownMenu}>
      <div className="relative flex items-center space-x-1 cursor-pointer lg:hidden">
        <span className="text-[10px]">メニュー</span>
        <GoTriangleDown />
      </div>
      <ul className={styles.dropdownMenuLinks}>
        <li>
          <Link href="/" className={`${styles.dropdownMenuLink} border-t-2`}>
            ホーム
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.dropdownMenuLink}>
            TV番組・ドラマ
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.dropdownMenuLink}>
            映画
          </Link>
        </li>
        <li>
          <Link href="/" className={styles.dropdownMenuLink}>
            新作&人気作
          </Link>
        </li>
        <li>
          <Link href="/" className="dropdownMenuLink">
            マイリスト
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;

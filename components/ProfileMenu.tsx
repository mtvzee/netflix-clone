import { AiOutlineUser } from 'react-icons/ai';
import { GoTriangleDown } from 'react-icons/go';
import { BiHelpCircle } from 'react-icons/bi';
import { MdOutlineEdit } from 'react-icons/md';
import Avatar from './Avatar';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import styles from '../styles/components/ProfileMenu.module.css';

const ProfileMenu = () => {
  const router = useRouter();
  const handleLogOut = () => {
    signOut(auth).then(() => router.push('/signup'));
  };
  return (
    <div className={styles.menu}>
      <div className={styles.menuIcon}>
        <Avatar src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" />
        <GoTriangleDown className={styles.triangle} />
      </div>

      <div className={styles.container}>
        <ul className={styles.accounts}>
          <li className={styles.accountItem}>
            <Avatar src="/unknown.jpg" />
            <span className={styles.text}>ゲスト</span>
          </li>
        </ul>
        <ul className={styles.subMenu}>
          <li className={styles.subMenuItem}>
            <MdOutlineEdit className={styles.icon} />
            <span className={styles.text}>プロフィールの管理</span>
          </li>
          <li className={styles.subMenuItem}>
            <AiOutlineUser className={styles.icon} />
            <span className={styles.text}>アカウント</span>
          </li>
          <li className={styles.subMenuItem}>
            <BiHelpCircle className={styles.icon} />
            <span className={styles.text}>ヘルプセンター</span>
          </li>
        </ul>
        <ul className={styles.logout}>
          <li className={styles.logoutItem} onClick={handleLogOut}>
            <span className={styles.text}>ログアウト</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;

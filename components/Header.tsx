import Image from 'next/image';
import Link from 'next/link';
import { AiFillBell, AiOutlineSearch } from 'react-icons/ai';
import DropdownMenu from './DropdownMenu';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  return (
    <div className="fixed top-0 flex items-center justify-between w-full px-6 py-2 bg-gradient-to-b from-black/60 to-transparent lg:px-10 xl:px-16 z-30">
      <div className="flex items-center space-x-7">
        <div className="relative h-8 w-14 lg:w-20 lg:h-12">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix-logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <DropdownMenu />
        <ul className="items-center hidden space-x-5 lg:flex">
          <li>
            <Link href="/">
              <a className="text-white headerLink">ホーム</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="headerLink">TV番組・ドラマ</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="headerLink">映画</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="headerLink">新作&人気作</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="headerLink">マイリスト</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-5">
        <AiOutlineSearch className="cursor-pointer w-7 h-7" />
        <AiFillBell className="cursor-pointer w-7 h-7" />
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Header;

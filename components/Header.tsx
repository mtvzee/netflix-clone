import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BiBell } from 'react-icons/bi';
import DropdownMenu from './DropdownMenu';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';

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
    <header
      className={`fixed top-0 z-10 h-[41px] md:h-[68px] flex items-center justify-between w-full px-6 md:px-10 xl:px-16 ${
        isScrolled && 'bg-black'
      }`}
    >
      <div className="flex items-center space-x-5">
        <div className="relative w-[60px] h-[20px] md:w-[92px] md:h-[25px]">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix-logo"
            fill
            className="object-contain"
          />
        </div>
        <DropdownMenu />
        <ul className="items-center hidden space-x-5 lg:flex">
          <li>
            <Link href="/" className="text-white headerLink">
              ホーム
            </Link>
          </li>
          <li>
            <Link href="/" className="headerLink">
              TV番組・ドラマ
            </Link>
          </li>
          <li>
            <Link href="/" className="headerLink">
              映画
            </Link>
          </li>
          <li>
            <Link href="/" className="headerLink">
              新作&人気作
            </Link>
          </li>
          <li>
            <Link href="/" className="headerLink">
              マイリスト
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-6">
        <SearchBar />
        <BiBell className="cursor-pointer w-7 h-7" />
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;

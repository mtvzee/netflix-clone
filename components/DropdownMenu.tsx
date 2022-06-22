import Link from 'next/link';
import { GoTriangleDown } from 'react-icons/go';

const DropdownMenu = () => {
  return (
    <div className="relative cursor-pointer group">
      <div className="flex items-center space-x-1 lg:hidden">
        <span>メニュー</span>
        <GoTriangleDown />
      </div>
      <ul className="absolute invisible transition duration-300 opacity-0 top-5 -left-24 w-72 group-hover:opacity-100 group-hover:visible">
        <li className="h-10 border-b-2"></li>
        <li>
          <Link href="/">
            <a className="border-t-2 dropdownMenu">ホーム</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className="dropdownMenu">TV番組・ドラマ</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className="dropdownMenu">映画</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className="dropdownMenu">新作&人気作</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a className="dropdownMenu">マイリスト</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;

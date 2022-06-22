import { AiOutlineUser } from 'react-icons/ai';
import { GoTriangleDown } from 'react-icons/go';
import { BiHelpCircle } from 'react-icons/bi';
import { MdOutlineEdit } from 'react-icons/md';
import Avatar from './Avatar';

const ProfileMenu = () => {
  return (
    <div className="relative flex items-center space-x-3 group">
      <Avatar src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41" />
      <GoTriangleDown className="hidden transition duration-300 lg:block group-hover:rotate-180" />
      <ul className="absolute invisible transition duration-300 opacity-0 -left-48 w-52 top-16 group-hover:opacity-100 group-hover:visible">
        <li className="flex items-center px-2 space-x-2 profileMenu">
          <Avatar src="/unknown.jpg" />
          <span>ゲスト</span>
        </li>
        <li className="flex items-center px-2 space-x-2 profileMenu">
          <MdOutlineEdit className="w-8 h-8" />
          <span>プロフィールの管理</span>
        </li>
        <li className="flex items-center px-2 space-x-2 border-t profileMenu">
          <AiOutlineUser className="w-8 h-8" />
          <span>アカウント</span>
        </li>
        <li className="flex items-center px-2 space-x-2 profileMenu">
          <BiHelpCircle className="w-8 h-8" />
          <span>ヘルプセンター</span>
        </li>
        <li className="border-t profileMenu">ログアウト</li>
      </ul>
    </div>
  );
};

export default ProfileMenu;

import { useState } from 'react';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import styles from '../styles/components/MyListButton.module.css';

const MyListButton = () => {
  const [isAddedToMyList, setIsAddedToMyList] = useState(false);

  return (
    <button
      className={styles.myListBtn}
      onClick={() => setIsAddedToMyList(!isAddedToMyList)}
    >
      {isAddedToMyList ? (
        <AiOutlineCheck className={styles.myListIcon} />
      ) : (
        <AiOutlinePlus className={styles.myListIcon} />
      )}
    </button>
  );
};
export default MyListButton;

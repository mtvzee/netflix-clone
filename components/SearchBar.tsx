import { AiOutlineSearch } from 'react-icons/ai';
import styles from '../styles/components/SearchBar.module.css';

const SearchBar = () => {
  return (
    <form className={styles.searchBar} onSubmit={(e) => e.preventDefault()}>
      <input
        className={styles.input}
        type="search"
        placeholder="タイトル、人名、ジャンル"
      />
      <AiOutlineSearch className={styles.icon} />
    </form>
  );
};
export default SearchBar;

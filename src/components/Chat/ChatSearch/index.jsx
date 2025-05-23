import { useState } from 'react';
import styles from './ChatSearch.module.css';

const ChatSearch = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value); 
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search chats ... "
        className={styles.searchInput}
      />
    </div>
  );
};

export default ChatSearch;

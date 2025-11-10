import React, { useCallback } from 'react';
import styles from '../styles/SearchBar.module.css';

function SearchBar({ searchTerm, onSearchChange }) {
  console.log('Render: SearchBar');

  const handleChange = useCallback(
    (e) => onSearchChange(e.target.value),
    [onSearchChange]
  );

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default React.memo(SearchBar);

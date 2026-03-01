import React from 'react';
import styles from './SearchBar.module.scss';
import TextInput from '../../common/TextInput/TextInput';

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

const SearchBar = ({ searchText, onSearchTextChange }: SearchBarProps) => {
  return (
    <div className={styles.searchBar}>
      <TextInput
        placeholder={'Search for a song'}
        onChange={onSearchTextChange}
        value={searchText}
        inputClassName={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;

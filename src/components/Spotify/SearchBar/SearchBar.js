import React, { useState, useEffect } from 'react';
import { func } from 'prop-types';
import useDebounce from '../../../hooks/useDebounce';
import styles from './SearchBar.module.scss';
import TextInput from '../../common/TextInput/TextInput';

const SearchBar = ({ search }) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    search(searchText);
  }, [debouncedSearchText, search]) // eslint-disable-line

  return (
    <div className={styles.searchBar}>
      <TextInput
        placeholder={'Search for a song'}
        onChange={setSearchText}
        value={searchText}
      />
    </div>
  );
};

SearchBar.propTypes = {
  search: func
};

export default SearchBar;

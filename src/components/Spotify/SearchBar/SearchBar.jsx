import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../../slices/spotify';
import useDebounce from '../../../hooks/useDebounce';
import styles from './SearchBar.module.scss';
import TextInput from '../../common/TextInput/TextInput';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    dispatch(search(searchText));
  }, [debouncedSearchText, dispatch]) // eslint-disable-line

  return (
    <div className={styles.searchBar}>
      <TextInput
        placeholder={'Search for a song'}
        onChange={setSearchText}
        value={searchText}
        inputClassName={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;

import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
import styles from './SongSelection.module.scss';

interface SongSelectionProps {
  height?: number;
}

const SongSelection = ({ height }: SongSelectionProps) => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.songSelection} style={{ height }}>
      <SearchBar searchText={searchText} onSearchTextChange={setSearchText} />
      <TrackList searchText={searchText} />
    </div>
  );
};

export default SongSelection;

import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
import styles from './SongSelection.module.scss';

interface SongSelectionProps {
  height?: number;
}

const SongSelection = ({ height }: SongSelectionProps) => {
  return (
    <div className={styles.songSelection} style={{ height }}>
      <SearchBar />
      <TrackList />
    </div>
  );
};

export default SongSelection;

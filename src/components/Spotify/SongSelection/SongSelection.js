import React from 'react';
import { number } from 'prop-types';
import SearchBar from '../SearchBar/container';
import TrackList from '../TrackList/container';
import styles from './SongSelection.module.scss';

const SongSelection = ({ height }) => {
  return (
    <div className={styles.songSelection} style={{ height }}>
      <SearchBar />
      <TrackList />
    </div>
  );
};

SongSelection.propTypes = {
  height: number
};

export default SongSelection;

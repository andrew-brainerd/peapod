import React, { useState, useRef } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
import styles from './SongSelection.module.scss';

const SongSelection = () => {
  const [searchText, setSearchText] = useState('');
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setIsResultsOpen(false));

  return (
    <div ref={containerRef} className={styles.songSelection}>
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(text) => {
          setSearchText(text);
          setIsResultsOpen(!!text);
        }}
      />
      {isResultsOpen && searchText && (
        <div className={styles.resultsOverlay}>
          <TrackList searchText={searchText} />
        </div>
      )}
    </div>
  );
};

export default SongSelection;

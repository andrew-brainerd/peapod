import React, { useState, useRef } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import SearchBar from '../SearchBar/SearchBar';
import TrackList from '../TrackList/TrackList';
const SongSelection = () => {
  const [searchText, setSearchText] = useState('');
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setIsResultsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <SearchBar
        searchText={searchText}
        onSearchTextChange={(text) => {
          setSearchText(text);
          setIsResultsOpen(!!text);
        }}
      />
      {isResultsOpen && searchText && (
        <div className="bg-primary border border-gray-75 rounded-[5px] left-0 max-h-[400px] overflow-y-auto absolute right-0 top-full z-10">
          <TrackList searchText={searchText} />
        </div>
      )}
    </div>
  );
};

export default SongSelection;

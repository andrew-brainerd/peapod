import React from 'react';
import TextInput from '../../common/TextInput/TextInput';

interface SearchBarProps {
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

const SearchBar = ({ searchText, onSearchTextChange }: SearchBarProps) => {
  return (
    <div className="mt-2.5">
      <TextInput
        placeholder={'Search for a song'}
        onChange={onSearchTextChange}
        value={searchText}
        inputClassName="border border-gray-75"
      />
    </div>
  );
};

export default SearchBar;

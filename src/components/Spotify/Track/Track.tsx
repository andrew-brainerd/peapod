import React from 'react';
import { isMobile } from 'react-device-detect';
import type { Artist } from '../../../types';
import noop from '../../../utils/noop';

interface TrackProps {
  className?: string;
  artists?: Artist[];
  name?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

const getPrimaryArtist = (artists: Artist[]) => (artists[0] || {}).name;

const Track = ({ className, name, artists, onClick }: TrackProps) => {
  const artist = getPrimaryArtist(artists || []);

  return (
    <div
      className={`text-[2em] py-[13px] text-left transition-all duration-300 select-none ${onClick ? 'cursor-pointer' : ''} ${!isMobile ? 'hover:pl-[15px]' : ''} ${className || ''}`}
      onClick={onClick || noop}
    >
      <span className="mr-2.5">{name}</span>
      <span className="text-[0.5em] opacity-70">{artist}</span>
    </div>
  );
};

export default Track;

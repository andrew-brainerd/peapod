import React from 'react';
import { isMobile } from 'react-device-detect';
import type { Artist } from '../../../types';
import noop from '../../../utils/noop';
import styles from './Track.module.scss';

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
      className={[
        styles.track,
        onClick ? styles.hasAction : '',
        isMobile ? styles.isMobile : '',
        className || ''
      ].join(' ')}
      onClick={onClick || noop}
    >
      <span className={styles.name}>{name}</span>
      <span className={styles.artist}>{artist}</span>
    </div>
  );
};

export default Track;

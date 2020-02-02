import React from 'react';
import { string, array, func } from 'prop-types';
import noop from '../../../utils/noop';
import styles from './Track.module.scss';

const getPrimaryArtist = artists => (artists[0] || {}).name;

const Track = ({ className, name, artists, onClick }) => {
  const artist = getPrimaryArtist(artists);

  return (
    <div
      className={[
        styles.track,
        onClick ? styles.hasAction : '',
        className || ''
      ].join(' ')}
      onClick={onClick || noop}
    >
      <span className={styles.name}>{name}</span>
      <span className={styles.artist}>{artist}</span>
    </div>
  );
};

Track.propTypes = {
  className: string,
  artists: array,
  name: string,
  onClick: func
};

export default Track;

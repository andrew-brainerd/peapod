import React from 'react';
import { array, object } from 'prop-types';
import { reverse } from 'ramda';
import Track from '../../Track/Track';
import styles from './PlayList.module.scss';

const PlayList = ({ tracks, currentTrack }) => {
  return (
    <div className={styles.playList}>
      <div className={styles.trackList}>
        {reverse(tracks).map((track, t) => {
          return (currentTrack || {}).name !== track.name &&
            <Track key={t} className={styles.track} {...track} />;
        })}
      </div>
    </div>
  );
};

PlayList.propTypes = {
  tracks: array,
  currentTrack: object
};

export default PlayList;

import React from 'react';
import { number, object, array } from 'prop-types';
import { reverse } from 'ramda';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayQueue.module.scss';

const PlayQueue = ({ height, currentTrack, queue }) => {
  const PLAYLIST_PADDING = 200;

  return (
    <div className={styles.playQueue} style={{ height: height - PLAYLIST_PADDING }}>
      <div className={styles.trackList}>
        {reverse(queue).map((track, t) => {
          return (currentTrack || {}).name !== track.name &&
            <Track key={t} className={styles.track} {...track} />;
        })}
      </div>
    </div>
  );
};

PlayQueue.propTypes = {
  height: number,
  currentTrack: object,
  queue: array
};

export default PlayQueue;

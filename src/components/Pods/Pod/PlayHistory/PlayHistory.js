import React from 'react';
import { number, object, array } from 'prop-types';
import { reverse } from 'ramda';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayHistory.module.scss';

const PlayHistory = ({ height, currentTrack, history }) => {
  const PLAYLIST_PADDING = 200;

  return (
    <div className={styles.playHistory} style={{ height: height - PLAYLIST_PADDING }}>
      <div className={styles.trackList}>
        {reverse(history).map((track, t) => {
          return (currentTrack || {}).name !== track.name &&
            <Track key={t} className={styles.track} {...track} />;
        })}
      </div>
    </div>
  );
};

PlayHistory.propTypes = {
  height: number,
  currentTrack: object,
  history: array
};

export default PlayHistory;

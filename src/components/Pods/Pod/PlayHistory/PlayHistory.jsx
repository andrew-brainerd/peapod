import React from 'react';
import { number, object } from 'prop-types';
import { useSelector } from 'react-redux';
import { getPlayHistory } from '../../../../slices/pods';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayHistory.module.scss';

const PlayHistory = ({ height, currentTrack }) => {
  const history = useSelector(getPlayHistory);
  const PLAYLIST_PADDING = 200;

  return (
    <div className={styles.playHistory} style={{ height: height - PLAYLIST_PADDING }}>
      <div className={styles.trackList}>
        {[...history].reverse().map((track, t) => {
          return (currentTrack || {}).name !== track.name &&
            <Track key={t} className={styles.track} {...track} />;
        })}
      </div>
    </div>
  );
};

PlayHistory.propTypes = {
  height: number,
  currentTrack: object
};

export default PlayHistory;

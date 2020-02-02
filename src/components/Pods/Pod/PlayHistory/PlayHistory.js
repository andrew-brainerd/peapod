import React from 'react';
import { array, func } from 'prop-types';
import { isEmpty, reverse } from 'ramda';
import usePollingEffect from '../../../../hooks/usePollingEffect';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayHistory.module.scss';

const PlayHistory = ({ height, history, getHistory }) => {
  usePollingEffect(() => {
    // getHistory();
  }, [getHistory], 7500);

  !isEmpty(history) && console.log(`Play History: %o`, history);

  const PLAYLIST_PADDING = 200;

  return (
    <div className={styles.playHistory} style={{ height: height - PLAYLIST_PADDING }}>
      <div className={styles.trackList}>
        {reverse(history).map((track, t) => {
          return <Track key={t} className={styles.track} {...track} />;
          //(currentTrack || {}).name !== track.name &&
        })}
      </div>
    </div>
  );
};

PlayHistory.propTypes = {
  history: array,
  getHistory: func
};

export default PlayHistory;

import React from 'react';
import { number, array, object } from 'prop-types';
import { reverse } from 'ramda';
import Track from '../../Track/Track';
import styles from './PlayList.module.scss';

const PlayList = ({ height, tracks, currentTrack }) => {
  const PLAYLIST_PADDING = 200;

  return (
    <div className={styles.playList} style={{ height: height - PLAYLIST_PADDING }}>
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
  height: number,
  tracks: array,
  currentTrack: object
};

export default PlayList;

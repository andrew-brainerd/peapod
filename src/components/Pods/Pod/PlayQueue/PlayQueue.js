import React from 'react';
import { number, object, array, func } from 'prop-types';
import { reverse } from 'ramda';
import Button from '../../../common/Button/Button';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayQueue.module.scss';

const PlayQueue = ({ height, currentTrack, queue, play }) => {
  const PLAYLIST_PADDING = 200;

  const playUris = queue.map(({ uri }) => uri);

  return (
    <div className={styles.playQueue} style={{ height: height - PLAYLIST_PADDING }}>
      <Button
        className={styles.startButton}
        text={'Start Playing Queue'}
        onClick={() => play({ uris: playUris })}
        disabled={!queue}
      />
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
  queue: array,
  play: func.isRequired
};

export default PlayQueue;

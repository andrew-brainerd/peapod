import React from 'react';
import { number, object } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getPlayQueue, getIsPodOwner } from '../../../../slices/pods';
import { play } from '../../../../slices/spotify';
import Button from '../../../common/Button/Button';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayQueue.module.scss';

const PlayQueue = ({ height, currentTrack }) => {
  const dispatch = useDispatch();
  const queue = useSelector(getPlayQueue);
  const isPodOwner = useSelector(getIsPodOwner);
  const PLAYLIST_PADDING = 200;

  const playUris = queue.map(({ uri }) => uri);

  return (
    <div className={styles.playQueue} style={{ height: height - PLAYLIST_PADDING }}>
      {isPodOwner &&
        <Button
          className={styles.startButton}
          text={'Start Playing Queue'}
          onClick={() => dispatch(play({ uris: playUris }))}
          disabled={!queue}
        />
      }
      <div className={styles.trackList}>
        {[...queue].reverse().map((track, t) => {
          return (currentTrack || {}).name !== track.name &&
            <Track key={t} className={styles.track} {...track} />;
        })}
      </div>
    </div>
  );
};

PlayQueue.propTypes = {
  height: number,
  currentTrack: object
};

export default PlayQueue;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../store/configureStore';
import { getPlayQueue, getIsPodOwner } from '../../../../slices/pods';
import { play } from '../../../../slices/spotify';
import type { SpotifyTrack } from '../../../../types';
import Button from '../../../common/Button/Button';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayQueue.module.scss';

interface PlayQueueProps {
  height?: number;
  currentTrack?: SpotifyTrack;
}

const PlayQueue = ({ height = 0, currentTrack }: PlayQueueProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const queue = useSelector(getPlayQueue);
  const isPodOwner = useSelector(getIsPodOwner);
  const PLAYLIST_PADDING = 200;

  const playUris = queue.map(({ uri }: SpotifyTrack) => uri);

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
        {[...queue].reverse().map((track: SpotifyTrack, t: number) => {
          return (currentTrack || {} as SpotifyTrack).name !== track.name &&
            <Track key={t} className={styles.track} {...track} />;
        })}
      </div>
    </div>
  );
};

export default PlayQueue;

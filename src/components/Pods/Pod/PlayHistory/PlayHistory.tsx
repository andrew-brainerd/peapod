import React from 'react';
import { usePod } from '../../../../queries/pods';
import type { SpotifyTrack } from '../../../../types';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayHistory.module.scss';

interface PlayHistoryProps {
  podId?: string;
}

const PlayHistory = ({ podId }: PlayHistoryProps) => {
  const { data: pod } = usePod(podId);
  const history = pod?.history ?? [];

  return (
    <div className={styles.playHistory}>
      <div className={styles.trackList}>
        {[...history].reverse().map((track: SpotifyTrack, t: number) => (
          <Track key={t} className={styles.track} {...track} />
        ))}
      </div>
    </div>
  );
};

export default PlayHistory;

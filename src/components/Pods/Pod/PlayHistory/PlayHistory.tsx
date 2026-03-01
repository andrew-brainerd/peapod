import React from 'react';
import { usePod } from '../../../../queries/pods';
import type { SpotifyTrack } from '../../../../types';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayHistory.module.scss';

interface PlayHistoryProps {
  height?: number;
  currentTrack?: SpotifyTrack;
  podId?: string;
}

const PlayHistory = ({ height = 0, currentTrack, podId }: PlayHistoryProps) => {
  const { data: pod } = usePod(podId);
  const history = pod?.history ?? [];
  const PLAYLIST_PADDING = 200;

  return (
    <div className={styles.playHistory} style={{ height: height - PLAYLIST_PADDING }}>
      <div className={styles.trackList}>
        {[...history].reverse().map((track: SpotifyTrack, t: number) => {
          return (currentTrack || {} as SpotifyTrack).name !== track.name &&
            <Track key={t} className={styles.track} {...track} />;
        })}
      </div>
    </div>
  );
};

export default PlayHistory;

import React from 'react';
import { useSelector } from 'react-redux';
import { getPlayHistory } from '../../../../slices/pods';
import type { SpotifyTrack } from '../../../../types';
import Track from '../../../Spotify/Track/Track';
import styles from './PlayHistory.module.scss';

interface PlayHistoryProps {
  height?: number;
  currentTrack?: SpotifyTrack;
}

const PlayHistory = ({ height = 0, currentTrack }: PlayHistoryProps) => {
  const history = useSelector(getPlayHistory);
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

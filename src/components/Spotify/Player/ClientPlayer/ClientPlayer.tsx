import React from 'react';
import TrackProgress from '../TrackProgress/TrackProgress';
import Loading from '../../../common/Loading/Loading';
import type { NowPlaying } from '../../../../types';
import styles from './ClientPlayer.module.scss';

interface ClientPlayerProps {
  height?: number;
  isPlaying?: boolean;
  trackName?: string;
  nowPlaying?: NowPlaying;
  albumArt?: string;
}

const ClientPlayer = ({ height, isPlaying, trackName, nowPlaying, albumArt }: ClientPlayerProps) => {
  return (
    <div className={styles.clientPlayer} style={{ height }}>
      {isPlaying ? (
        <div className={styles.nowPlaying}>
          <div className={styles.trackInfo}>
            <div className={styles.trackName}>{trackName}</div>
            <TrackProgress nowPlaying={nowPlaying} />
          </div>
          <div className={styles.albumArt}>
            <img src={albumArt} alt={'Album Art'} />
          </div>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <Loading altText={'Loading Now Playing...'} />
        </div>
      )}
    </div>
  );
};

export default ClientPlayer;

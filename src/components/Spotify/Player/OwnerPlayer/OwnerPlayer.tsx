import React from 'react';
import TrackProgress from '../TrackProgress/TrackProgress';
import Controls from '../Controls/Controls';
import Devices from '../../Devices/Devices';
import PodMembers from '../../../Pods/Pod/PodMembers/PodMembers';
import type { NowPlaying } from '../../../../types';
import styles from './OwnerPlayer.module.scss';

interface OwnerPlayerProps {
  isPlaying?: boolean;
  trackName?: string;
  nowPlaying?: NowPlaying;
  albumArt?: string;
}

const OwnerPlayer = ({ isPlaying, trackName, nowPlaying, albumArt }: OwnerPlayerProps) => {
  return (
    <div className={styles.ownerPlayer}>
      {isPlaying ? (
        <div className={styles.nowPlaying}>
          <div className={styles.trackInfo}>
            <div className={styles.trackName}>{trackName}</div>
            <TrackProgress nowPlaying={nowPlaying} />
          </div>
          <Controls className={styles.activeControls} isPlaying={isPlaying} />
          <div className={styles.albumArt}>
            <img src={albumArt} alt={'Album Art'} />
          </div>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <Controls isPlaying={isPlaying} />
        </div>
      )}
      <div className={styles.details}>
        <Devices />
        <PodMembers />
      </div>
    </div>
  );
};

export default OwnerPlayer;

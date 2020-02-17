import React from 'react';
import { number, bool, string, object } from 'prop-types';
import TrackProgress from '../TrackProgress/TrackProgress';
import Controls from '../Controls/container';
import Devices from '../../Devices/container';
import styles from './OwnerPlayer.module.scss';

const OwnerPlayer = ({ height, isPlaying, trackName, nowPlaying, albumArt }) => {
  return (
    <div className={styles.ownerPlayer} style={{ height }}>
      {isPlaying ?
        <div className={styles.nowPlaying}>
          <div className={styles.trackInfo}>
            <div className={styles.trackName}>
              {trackName}
            </div>
            <TrackProgress nowPlaying={nowPlaying} />
          </div>
          <Controls className={styles.activeControls} isPlaying={isPlaying} />
          <div className={styles.albumArt}>
            <img src={albumArt} alt={'Album Art'} />
          </div>
        </div> :
        <div className={styles.emptyPlayer}>
          <Controls isPlaying={isPlaying} />
        </div>}
      <Devices />
    </div>
  );
};

OwnerPlayer.propTypes = {
  height: number,
  isPlaying: bool,
  trackName: string,
  nowPlaying: object,
  albumArt: string
};

export default OwnerPlayer;

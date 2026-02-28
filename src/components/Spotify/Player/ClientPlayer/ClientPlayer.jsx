import React from 'react';
import { number, bool, string, object } from 'prop-types';
import TrackProgress from '../TrackProgress/TrackProgress';
import Loading from '../../../common/Loading/Loading';
import styles from './ClientPlayer.module.scss';

const ClientPlayer = ({ height, isPlaying, trackName, nowPlaying, albumArt }) => {
  return (
    <div className={styles.clientPlayer} style={{ height }}>
      {isPlaying ?
        <div className={styles.nowPlaying}>
          <div className={styles.trackInfo}>
            <div className={styles.trackName}>
              {trackName}
            </div>
            <TrackProgress nowPlaying={nowPlaying} />
          </div>
          <div className={styles.albumArt}>
            <img src={albumArt} alt={'Album Art'} />
          </div>
        </div> :
        <div className={styles.emptyPlayer}>
          <Loading altText={'Loading Now Playing...'} />
        </div>}
    </div>
  );
};

ClientPlayer.propTypes = {
  height: number,
  isPlaying: bool,
  trackName: string,
  nowPlaying: object,
  albumArt: string
};

export default ClientPlayer;

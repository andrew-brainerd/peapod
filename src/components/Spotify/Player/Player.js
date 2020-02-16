import React, { useState } from 'react';
import { bool, object, string, number, func } from 'prop-types';
import usePrevious from '../../../hooks/usePrevious';
import usePollingEffect from '../../../hooks/usePollingEffect';
import {
  getIsPlaying,
  getNowPlayingItem,
  getTrackImages
} from '../../../selectors/player';
import { TRACK } from '../../../constants/spotify';
import TrackProgress from './TrackProgress/TrackProgress';
import Controls from './Controls/container';
import Devices from '../Devices/container';
import styles from './Player.module.scss';

const Player = ({
  hasAuth,
  isLoading,
  nowPlaying,
  height,
  isPodOwner,
  getMyNowPlaying,
  addToPlayHistory,
}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isPlaying = getIsPlaying(nowPlaying);
  const nowPlayingItem = getNowPlayingItem(nowPlaying);
  const { type, name } = nowPlayingItem;
  const trackImages = getTrackImages(nowPlaying);
  const prevName = usePrevious(name);

  if (prevName !== name) {
    name && addToPlayHistory(nowPlayingItem);
  }

  const albumArt = (trackImages[1] || {}).url;

  usePollingEffect(() => {
    if (hasAuth) {
      setIsInitialLoad(false);
      isPodOwner && getMyNowPlaying();
    }
  }, [hasAuth, isPodOwner, getMyNowPlaying], isPodOwner ? 5000 : null);

  const PLAYER_PADDING = 200;
  const playerHeight = height - PLAYER_PADDING;

  return (isInitialLoad && isLoading) || !hasAuth ?
    <div className={styles.loading}>Loading Player...</div> :
    <div className={styles.player} style={{ height: playerHeight }}>
      {isPlaying ?
        <div className={styles.nowPlaying}>
          <div className={styles.trackInfo}>
            {type === TRACK &&
              <div className={styles.trackName}>
                {name}
              </div>}
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
    </div>;
};

Player.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  nowPlaying: object,
  podId: string,
  height: number,
  isPodCreator: bool,
  getMyNowPlaying: func.isRequired,
  addToPlayHistory: func.isRequired,
  getPod: func.isRequired
};

Player.defaultProps = {
  isLoading: true
};

export default Player;

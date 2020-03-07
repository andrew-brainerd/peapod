import React, { useState } from 'react';
import { bool, object, string, number, func } from 'prop-types';
import usePrevious from '../../../hooks/usePrevious';
import usePollingEffect from '../../../hooks/usePollingEffect';
import {
  getIsPlaying,
  getNowPlayingItem,
  getTrackImages
} from '../../../selectors/player';
import styles from './Player.module.scss';
import OwnerPlayer from './OwnerPlayer/OwnerPlayer';
import ClientPlayer from './ClientPlayer/ClientPlayer';

const Player = ({
  hasAuth,
  isVisible,
  isLoading,
  nowPlaying,
  height,
  isPodOwner,
  getMyNowPlaying,
  addToPlayHistory
}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isPlaying = getIsPlaying(nowPlaying);
  const nowPlayingItem = getNowPlayingItem(nowPlaying);
  const { name } = nowPlayingItem;
  const albumArt = (getTrackImages(nowPlaying)[1] || {}).url;
  const prevName = usePrevious(name);

  if (prevName !== name) {
    isPodOwner && name && addToPlayHistory(nowPlayingItem);
  }

  usePollingEffect(() => {
    if (hasAuth) {
      setIsInitialLoad(false);
      isPodOwner && getMyNowPlaying();
    }
  }, [hasAuth, isPodOwner, getMyNowPlaying], isPodOwner ? 5000 : null);

  const PLAYER_PADDING = 200;
  const playerHeight = height - PLAYER_PADDING;

  return (
    <div className={[
      styles.player,
      !isVisible ? styles.hidden : ''
    ].join(' ')}>
      {(isInitialLoad && isLoading) || !hasAuth ?
        <div className={styles.loading}>Loading Player...</div> :
        isPodOwner ?
          <OwnerPlayer
            height={playerHeight}
            isPlaying={isPlaying}
            trackName={name}
            nowPlaying={nowPlaying}
            albumArt={albumArt}
          /> :
          <ClientPlayer
            isPlaying={isPlaying}
            trackName={name}
            nowPlaying={nowPlaying}
            albumArt={albumArt}
          />
      }
    </div>
  );
};

Player.propTypes = {
  hasAuth: bool,
  isVisible: bool,
  isLoading: bool,
  nowPlaying: object,
  podId: string,
  height: number,
  isPodOwner: bool,
  isPodCreator: bool,
  getMyNowPlaying: func.isRequired,
  addToPlayHistory: func.isRequired,
  getPod: func.isRequired
};

Player.defaultProps = {
  isVisible: false,
  isLoading: true,
  nowPlaying: {}
};

export default Player;

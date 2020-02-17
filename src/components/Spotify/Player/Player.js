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
  const { name } = nowPlayingItem;
  const albumArt = (getTrackImages(nowPlaying)[1] || {}).url;
  const prevName = usePrevious(name);

  if (prevName !== name) {
    name && addToPlayHistory(nowPlayingItem);
  }

  console.log(`Player Now Playing: %o`, nowPlaying);

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
      />;
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
  isLoading: true,
  nowPlaying: {}
};

export default Player;

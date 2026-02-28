import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/configureStore';
import usePrevious from '../../../hooks/usePrevious';
import usePollingEffect from '../../../hooks/usePollingEffect';
import { getAccessToken, getIsLoadingNowPlaying, getNowPlaying, getMyNowPlaying } from '../../../slices/spotify';
import { getIsPodOwner, addTrackToPlayHistory } from '../../../slices/pods';
import {
  getIsPlaying,
  getNowPlayingItem,
  getTrackImages
} from '../../../selectors/player';
import styles from './Player.module.scss';
import OwnerPlayer from './OwnerPlayer/OwnerPlayer';
import ClientPlayer from './ClientPlayer/ClientPlayer';

interface PlayerProps {
  isVisible?: boolean;
  height?: number;
}

const Player = ({ isVisible = false, height = 0 }: PlayerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const hasAuth = !!useSelector(getAccessToken);
  const isLoading = useSelector(getIsLoadingNowPlaying);
  const nowPlaying = useSelector(getNowPlaying);
  const isPodOwner = useSelector(getIsPodOwner);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isPlaying = getIsPlaying(nowPlaying);
  const nowPlayingItem = getNowPlayingItem(nowPlaying);
  const { name } = nowPlayingItem;
  const albumArt = (getTrackImages(nowPlaying)[1] || {} as { url?: string }).url;
  const prevName = usePrevious(name);

  if (prevName !== name) {
    isPodOwner && name && dispatch(addTrackToPlayHistory(nowPlayingItem));
  }

  usePollingEffect(() => {
    if (hasAuth) {
      setIsInitialLoad(false);
      isPodOwner && dispatch(getMyNowPlaying());
    }
  }, [hasAuth, isPodOwner, dispatch], isPodOwner ? 5000 : null);

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

export default Player;

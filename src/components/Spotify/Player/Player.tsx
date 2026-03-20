import React, { useEffect, useRef } from 'react';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useSyncStore } from '../../../stores/syncStore';
import { useNowPlaying } from '../../../queries/spotify';
import { useAddToHistoryMutation } from '../../../queries/pods';
import { getIsPlaying, getNowPlayingItem, getTrackImages } from '../../../selectors/player';
import styles from './Player.module.scss';
import OwnerPlayer from './OwnerPlayer/OwnerPlayer';
import ClientPlayer from './ClientPlayer/ClientPlayer';
import type { NowPlaying } from '../../../types';

interface PlayerProps {
  isVisible?: boolean;
  height?: number;
  isPodOwner: boolean;
  podId?: string;
}

const Player = ({ isVisible = false, height = 0, isPodOwner, podId }: PlayerProps) => {
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const updateClients = useSyncStore((state) => state.updateClients);
  const { data: nowPlaying = {} as NowPlaying, isLoading } = useNowPlaying(accessToken, isPodOwner);
  const addToHistory = useAddToHistoryMutation(podId);

  const isPlaying = getIsPlaying(nowPlaying);
  const nowPlayingItem = getNowPlayingItem(nowPlaying);
  const { name } = nowPlayingItem;
  const albumArt = (getTrackImages(nowPlaying)[1] || ({} as { url?: string })).url;
  const prevNameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (prevNameRef.current !== undefined && prevNameRef.current !== name && isPodOwner && name) {
      addToHistory.mutate(nowPlayingItem);
    }
    prevNameRef.current = name;
  }, [name]);

  useEffect(() => {
    if (isPodOwner && nowPlaying && Object.keys(nowPlaying).length > 0) {
      updateClients(nowPlaying);
    }
  }, [nowPlaying, isPodOwner, updateClients]);

  const PLAYER_PADDING = 200;
  const playerHeight = height - PLAYER_PADDING;

  return (
    <div className={[styles.player, !isVisible ? styles.hidden : ''].join(' ')}>
      {(isLoading && !nowPlaying?.item) || !accessToken ? (
        <div className={styles.loading}>Loading Player...</div>
      ) : isPodOwner ? (
        <OwnerPlayer
          height={playerHeight}
          isPlaying={isPlaying}
          trackName={name}
          nowPlaying={nowPlaying}
          albumArt={albumArt}
        />
      ) : (
        <ClientPlayer isPlaying={isPlaying} trackName={name} nowPlaying={nowPlaying} albumArt={albumArt} />
      )}
    </div>
  );
};

export default Player;

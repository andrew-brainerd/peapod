import React, { useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import useBeforeUnload from '../../../hooks/useBeforeUnload';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../../constants/pods';
import { usePodsStore } from '../../../stores/podsStore';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useSyncStore } from '../../../stores/syncStore';
import { useProfile, usePlaylists } from '../../../queries/spotify';
import { usePod, useConnectToPodMutation } from '../../../queries/pods';
import Header from '../../common/Header/Header';
import PodHeader from './PodHeader/PodHeader';
import SongSelection from '../../Spotify/SongSelection/SongSelection';
import Player from '../../Spotify/Player/Player';
import PlayQueue from './PlayQueue/PlayQueue';
import PlayHistory from './PlayHistory/PlayHistory';
import styles from './Pod.module.scss';

interface PodProps {
  view: string;
}

const Pod = ({ view }: PodProps) => {
  const { podId } = useParams({ strict: false }) as { podId: string };
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const { data: profile } = useProfile(accessToken);
  const userId = profile?.id;
  const { data: pod } = usePod(podId);
  const isConnecting = usePodsStore((state) => state.isConnecting);
  const isConnected = usePodsStore((state) => state.isConnected);
  const disconnectFromPod = usePodsStore((state) => state.disconnectFromPod);
  const isSyncing = useSyncStore((state) => state.isSyncing);
  const connectClient = useSyncStore((state) => state.connectClient);
  const connectToPod = useConnectToPodMutation();
  const height = window.innerHeight;
  const podHeight = height - 50;

  const isPodOwner = !!pod?.createdBy && !!userId && pod.createdBy.id === userId;

  usePlaylists(accessToken, userId ?? undefined);

  useEffect(() => {
    if (!!pod && !!pod.createdBy && !!userId && !isPodOwner && !isSyncing) {
      console.log('%cConnecting to Pod as Client...', 'color: cyan');
      connectClient(podId!);
    } else if (isPodOwner && !isConnected && !isConnecting && userId && profile) {
      console.log('%cConnecting to Pod as Owner...', 'color: cyan');
      connectToPod.mutate({ podId: podId!, user: profile });
    }
  }, [podId, pod, userId, isPodOwner, isConnected, isConnecting, isSyncing, connectClient]);

  useBeforeUnload(() => {
    if (isSyncing) {
      console.log('%cDisconnecting from Pusher channel...', 'color: cyan');
    } else {
      console.log('%cPod owner leaving...', 'color: cyan');
    }
    disconnectFromPod(podId);
  });

  return (
    <>
      <Header isMinimal />
      <div className={styles.pod} style={{ height: podHeight }}>
        <PodHeader podId={podId} userId={userId ?? undefined} view={view} />
        <div className={styles.content}>
          {view === SEARCH ? <SongSelection /> : null}
          <Player height={podHeight} isVisible={view === NOW_PLAYING} isPodOwner={isPodOwner} podId={podId} />
          {view === PLAY_QUEUE ? <PlayQueue height={podHeight} podId={podId} /> : null}
          {view === PLAY_HISTORY ? <PlayHistory height={podHeight} podId={podId} /> : null}
        </div>
      </div>
    </>
  );
};

export default Pod;

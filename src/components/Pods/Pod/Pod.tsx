import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/configureStore';
import { useParams } from '@tanstack/react-router';
import useBeforeUnload from '../../../hooks/useBeforeUnload';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../../constants/pods';
import { getIsConnectingToPod, getIsConnectedToPod, disconnectFromPod } from '../../../slices/pods';
import { getAccessToken } from '../../../slices/spotify';
import { getIsSyncing, connectClient } from '../../../slices/sync';
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
  const dispatch = useDispatch<AppDispatch>();
  const { podId } = useParams({ strict: false }) as { podId: string };
  const accessToken = useSelector(getAccessToken);
  const { data: profile } = useProfile(accessToken);
  const userId = profile?.id;
  const { data: pod } = usePod(podId);
  const isConnecting = useSelector(getIsConnectingToPod);
  const isConnected = useSelector(getIsConnectedToPod);
  const isSyncing = useSelector(getIsSyncing);
  const connectToPod = useConnectToPodMutation();
  const height = window.innerHeight;
  const podHeight = height - 50;

  const isPodOwner = !!pod?.createdBy && !!userId && pod.createdBy.id === userId;

  usePlaylists(accessToken, userId ?? undefined);

  useEffect(() => {
    if (!!pod && !!pod.createdBy && !!userId && !isPodOwner && !isSyncing) {
      console.log('%cConnecting to Pod as Client...', 'color: cyan');
      dispatch(connectClient(podId!));
    } else if (isPodOwner && !isConnected && !isConnecting && userId && profile) {
      console.log('%cConnecting to Pod as Owner...', 'color: cyan');
      connectToPod.mutate({ podId: podId!, user: profile });
    }
  }, [podId, pod, userId, isPodOwner, isConnected, isConnecting, isSyncing, dispatch]);

  useBeforeUnload(() => {
    if (isSyncing) {
      console.log('%cDisconnecting from Pusher channel...', 'color: cyan');
    } else {
      console.log('%cPod owner leaving...', 'color: cyan');
    }
    dispatch(disconnectFromPod(podId));
  });

  return (
    <>
      <Header isMinimal />
      <div className={styles.pod} style={{ height: podHeight }}>
        <PodHeader
          podId={podId}
          userId={userId ?? undefined}
          view={view}
        />
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

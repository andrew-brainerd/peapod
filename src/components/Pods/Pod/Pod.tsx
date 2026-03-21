import React, { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { isDefined } from '../../../utils/validation';
import { MEMBER_ADDED } from '../../../constants/sync';
import useBeforeUnload from '../../../hooks/useBeforeUnload';
import { usePodsStore } from '../../../stores/podsStore';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useSyncStore } from '../../../stores/syncStore';
import { useProfile, usePlaylists } from '../../../queries/spotify';
import { usePod, useAddMemberMutation, useConnectToPodMutation } from '../../../queries/pods';
import Header from '../../common/Header/Header';
import PodHeader from './PodHeader/PodHeader';
import SongSelection from '../../Spotify/SongSelection/SongSelection';
import Player from '../../Spotify/Player/Player';
import PodSidebar from './PodSidebar/PodSidebar';
import InviteModal from './InviteModal/InviteModal';
import styles from './Pod.module.scss';

const Pod = () => {
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
  const { connectToPusher, triggerUpdate } = useSyncStore();
  const connectToPod = useConnectToPodMutation();
  const addMember = useAddMemberMutation();
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const isPodOwner = !!pod?.createdBy && !!userId && pod.createdBy.id === userId;

  usePlaylists(accessToken, userId ?? undefined);

  // Auto-join: add user as pod member on mount
  useEffect(() => {
    if (isDefined(podId) && !!userId && profile) {
      addMember.mutate({ podId: podId!, user: profile });
    }
  }, [podId, userId]);

  // Listen for new members joining
  useEffect(() => {
    if (isDefined(podId) && !!userId) {
      connectToPusher(podId!, MEMBER_ADDED, triggerUpdate);
    }
  }, [podId, userId, connectToPusher, triggerUpdate]);

  // Connect as owner or client
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
      <div className={styles.pod}>
        <PodHeader onInviteClick={() => setIsInviteOpen(true)} />
        <SongSelection />
        <div className={styles.main}>
          <Player isPodOwner={isPodOwner} podId={podId} />
          <PodSidebar podId={podId} />
        </div>
      </div>
      <InviteModal isOpen={isInviteOpen} podId={podId} closeModal={() => setIsInviteOpen(false)} />
    </>
  );
};

export default Pod;

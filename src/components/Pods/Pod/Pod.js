import React, { useState, useEffect } from 'react';
import { func, string, shape, oneOf, bool, number } from 'prop-types';
import usePrevious from '../../../hooks/usePrevious';
import useBeforeUnload from '../../../hooks/useBeforeUnload';
import usePollingEffect from '../../../hooks/usePollingEffect';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../../constants/pods';
import Header from '../../common/Header/container';
import PodHeader from './PodHeader/container';
import SongSelection from '../../Spotify/SongSelection/container';
import Player from '../../Spotify/Player/container';
import PlayQueue from './PlayQueue/container';
import PlayHistory from './PlayHistory/container';
import InviteModal from './InviteModal/container';
import styles from './Pod.module.scss';

const getPodId = pathname => pathname.split('/')[2];

const Pod = ({
  pathname,
  pod,
  userId,
  isPodOwner,
  isConnecting,
  isConnected,
  isSyncing,
  height,
  view,
  getPod,
  connectClient,
  connectToPod,
  disconnectFromPod,
  getMyPlaylists
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const podId = getPodId(pathname);
  const prevPodId = usePrevious(getPodId(pathname));
  const podHeight = height - 50;
  const { name } = pod || {};

  useEffect(() => {
    if (!!pod && !!pod.createdBy && !!userId && !isPodOwner && !isSyncing) {
      console.log('%cConnecting to Pod as Client...', 'color: cyan');
      connectClient(podId);
    } else if (isPodOwner && !isConnected && !isConnecting && userId) {
      console.log('%cConnecting to Pod as Owner...', 'color: cyan');
      connectToPod(podId);
    }
  }, [podId, pod, userId, isPodOwner, isConnected, isConnecting, isSyncing, connectClient, connectToPod]);

  useEffect(() => {
    podId && podId !== prevPodId && getPod(podId);
  }, [podId, prevPodId, getPod]);

  usePollingEffect(() => {
    podId && getPod(podId);
  }, [podId, getPod], 5000);

  useBeforeUnload(() => {
    if (isSyncing) {
      console.log('%cDisconnecting from Pusher channel...', 'color: cyan');
    } else {
      console.log('%cPod owner leaving...', 'color: cyan');
    }
    disconnectFromPod(podId);
  });

  useEffect(() => {
    userId && getMyPlaylists(userId);
  }, [userId, getMyPlaylists]);

  return (
    <>
      <Header isMinimal />
      <div className={styles.pod} style={{ height: podHeight }}>
        <PodHeader
          podId={podId}
          podName={name}
          userId={userId}
          view={view}
          openModal={() => setIsModalOpen(true)}
        />
        <div className={styles.content}>
          {view === SEARCH ? <SongSelection /> : null}
          <Player height={podHeight} isVisible={view === NOW_PLAYING} />
          {view === PLAY_QUEUE ? <PlayQueue height={podHeight} /> : null}
          {view === PLAY_HISTORY ? <PlayHistory height={podHeight} /> : null}
        </div>
        <InviteModal
          isOpen={isModalOpen}
          podId={podId}
          podName={name}
          closeModal={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};

Pod.propTypes = {
  pathname: string,
  pod: shape({
    name: string
  }),
  view: oneOf([
    SEARCH,
    NOW_PLAYING,
    PLAY_QUEUE,
    PLAY_HISTORY
  ]),
  userId: string,
  isPodOwner: bool,
  isConnecting: bool,
  isConnected: bool,
  isSyncing: bool,
  height: number,
  getPod: func.isRequired,
  connectClient: func.isRequired,
  connectToPod: func.isRequired,
  disconnectFromPod: func.isRequired,
  getMyPlaylists: func.isRequired
};

export default Pod;

import React, { useEffect } from 'react';
import { oneOf } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import usePrevious from '../../../hooks/usePrevious';
import useBeforeUnload from '../../../hooks/useBeforeUnload';
import usePollingEffect from '../../../hooks/usePollingEffect';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../../constants/pods';
import { getCurrentPod, getIsPodOwner, getIsConnectingToPod, getIsConnectedToPod, getPod, connectToPod, disconnectFromPod } from '../../../slices/pods';
import { getProfileId, getMyPlaylists } from '../../../slices/spotify';
import { getIsSyncing, connectClient } from '../../../slices/sync';
import Header from '../../common/Header/Header';
import PodHeader from './PodHeader/PodHeader';
import SongSelection from '../../Spotify/SongSelection/SongSelection';
import Player from '../../Spotify/Player/Player';
import PlayQueue from './PlayQueue/PlayQueue';
import PlayHistory from './PlayHistory/PlayHistory';
import styles from './Pod.module.scss';

const Pod = ({ view }) => {
  const dispatch = useDispatch();
  const pod = useSelector(getCurrentPod);
  const userId = useSelector(getProfileId);
  const isPodOwner = useSelector(getIsPodOwner);
  const isConnecting = useSelector(getIsConnectingToPod);
  const isConnected = useSelector(getIsConnectedToPod);
  const isSyncing = useSelector(getIsSyncing);
  const height = window.innerHeight;
  const { podId } = useParams();
  const prevPodId = usePrevious(podId);
  const podHeight = height - 50;

  useEffect(() => {
    if (!!pod && !!pod.createdBy && !!userId && !isPodOwner && !isSyncing) {
      console.log('%cConnecting to Pod as Client...', 'color: cyan');
      dispatch(connectClient(podId));
    } else if (isPodOwner && !isConnected && !isConnecting && userId) {
      console.log('%cConnecting to Pod as Owner...', 'color: cyan');
      dispatch(connectToPod(podId));
    }
  }, [podId, pod, userId, isPodOwner, isConnected, isConnecting, isSyncing, dispatch]);

  useEffect(() => {
    podId && podId !== prevPodId && dispatch(getPod(podId));
  }, [podId, prevPodId, dispatch]);

  usePollingEffect(() => {
    podId && dispatch(getPod(podId));
  }, [podId, dispatch], 5000);

  useBeforeUnload(() => {
    if (isSyncing) {
      console.log('%cDisconnecting from Pusher channel...', 'color: cyan');
    } else {
      console.log('%cPod owner leaving...', 'color: cyan');
    }
    dispatch(disconnectFromPod(podId));
  });

  useEffect(() => {
    userId && dispatch(getMyPlaylists(userId));
  }, [userId, dispatch]);

  return (
    <>
      <Header isMinimal />
      <div className={styles.pod} style={{ height: podHeight }}>
        <PodHeader
          podId={podId}
          userId={userId}
          view={view}
        />
        <div className={styles.content}>
          {view === SEARCH ? <SongSelection /> : null}
          <Player height={podHeight} isVisible={view === NOW_PLAYING} />
          {view === PLAY_QUEUE ? <PlayQueue height={podHeight} /> : null}
          {view === PLAY_HISTORY ? <PlayHistory height={podHeight} /> : null}
        </div>
      </div>
    </>
  );
};

Pod.propTypes = {
  view: oneOf([
    SEARCH,
    NOW_PLAYING,
    PLAY_QUEUE,
    PLAY_HISTORY
  ])
};

export default Pod;

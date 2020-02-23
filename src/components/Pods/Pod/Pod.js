import React, { useState, useEffect } from 'react';
import { func, string, shape, oneOf, bool, number } from 'prop-types';
import usePrevious from '../../../hooks/usePrevious';
import useBeforeUnload from '../../../hooks/useBeforeUnload';
import usePollingEffect from '../../../hooks/usePollingEffect';
import { PODS_ROUTE } from '../../../constants/routes';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../../constants/pods';
import Header from '../../common/Header/container';
import Icon from '../../common/Icon/Icon';
import PodViewSelector from './PodViewSelector/container';
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
  isSyncing,
  height,
  view,
  getPod,
  connectClient,
  navTo
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const podId = getPodId(pathname);
  const prevPodId = usePrevious(getPodId(pathname));
  const podHeight = height - 50;
  const { _id, name } = pod || {};

  useEffect(() => {
    if (!!pod && !!pod.createdBy && !!userId && !isPodOwner && !isSyncing) {
      connectClient(podId);
    }
  }, [podId, pod, userId, isPodOwner, isSyncing, connectClient]);

  useEffect(() => {
    podId && podId !== prevPodId && getPod(podId);
  }, [podId, prevPodId, getPod]);

  usePollingEffect(() => {
    _id && _id === podId && getPod(_id);
  }, [_id, getPod], 5000);

  useBeforeUnload(() => {
    if (isSyncing) {
      console.log('%cDisconnecting from Pusher channel...', 'color: cyan');
    } else {
      console.log('%cPod owner leaving...', 'color: cyan');
    }
  });

  return (
    <>
      <Header isMinimal />
      <div className={styles.pod} style={{ height: podHeight }}>
        <div className={styles.podHeader}>
          <div className={styles.title}>
            <div className={styles.name}>{name}</div>
            <div className={styles.inviteIconContainer} onClick={() => setIsModalOpen(true)}>
              <Icon className={styles.inviteIcon} name={'invite'} title={'Invite People'} />
            </div>
          </div>
          <PodViewSelector
            className={styles.viewSelector}
            podId={_id}
            selectedView={view}
          />
          <div
            className={styles.closeButton}
            title={'Close Pod'}
            onClick={() => navTo(PODS_ROUTE.replace(':userId', userId))}
          />
        </div>
        <div className={styles.content}>
          {view === SEARCH ? <SongSelection /> : null}
          {view === NOW_PLAYING ? <Player height={podHeight} /> : null}
          {view === PLAY_QUEUE ? <PlayQueue height={podHeight} /> : null}
          {view === PLAY_HISTORY ? <PlayHistory height={podHeight} /> : null}
        </div>
        <InviteModal
          isOpen={isModalOpen}
          podId={_id}
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
  isSyncing: bool,
  height: number,
  getPod: func.isRequired,
  navTo: func.isRequired,
  connectClient: func.isRequired
};

export default Pod;

import React, { useState, useEffect } from 'react';
import { func, string, shape, oneOf, bool, number } from 'prop-types';
import usePrevious from '../../../hooks/usePrevious';
import usePollingEffect from '../../../hooks/usePollingEffect';
import { PODS_ROUTE } from '../../../constants/routes';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../../constants/pods';
import { getChannel } from '../../../utils/pusher';
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
  getPod,
  pathname,
  pod,
  userId,
  isPodOwner,
  height,
  view,
  navTo,
  nowPlayingLoaded
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPusherConnected, setIsPusherConnected] = useState(false);
  const podId = getPodId(pathname);
  const prevPodId = usePrevious(getPodId(pathname));
  const podHeight = height - 50;
  const { _id, name } = pod || {};

  useEffect(() => {
    if (!!pod && !!pod.createdBy && !!userId && !isPodOwner && !isPusherConnected) {
      console.log('%cConnecting to Pusher channel...', 'color: cyan');
      getChannel(podId).bind(NOW_PLAYING, track => {
        console.log('%cNow Playing: %o', 'color: orange', track.item.name);
        nowPlayingLoaded(track);
      });
      setIsPusherConnected(true);
    }
  }, [podId, pod, userId, isPodOwner, isPusherConnected, nowPlayingLoaded]);

  useEffect(() => {
    podId && podId !== prevPodId && getPod(podId);
  }, [podId, prevPodId, getPod]);

  usePollingEffect(() => {
    _id && _id === podId && getPod(_id);
  }, [_id, getPod], 5000);

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
  getPod: func.isRequired,
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
  height: number,
  navTo: func.isRequired,
  nowPlayingLoaded: func.isRequired
};

export default Pod;

import React, { useState, useEffect } from 'react';
import { func, string, shape, oneOf, number } from 'prop-types';
import usePrevious from '../../../hooks/usePrevious';
import usePollingEffect from '../../../hooks/usePollingEffect';
import { PODS_ROUTE } from '../../../constants/routes';
import { SEARCH, NOW_PLAYING, PLAY_QUEUE, PLAY_HISTORY } from '../../../constants/pods';
import { getChannel } from '../../../utils/pusher';
import Header from '../../common/Header/container';
import PodViewSelector from './PodViewSelector/container';
import SongSelection from '../../Spotify/SongSelection/container';
import Player from '../../Spotify/Player/container';
import PlayQueue from './PlayQueue/container';
import PlayHistory from './PlayHistory/container';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import TextInput from '../../common/TextInput/TextInput';
import { ReactComponent as InviteIcon } from '../../../img/invite.svg';
import styles from './Pod.module.scss';

const getPodId = pathname => pathname.split('/')[2];

const Pod = ({ getPod, pathname, pod, userId, height, view, navTo, sendInvitation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const podId = getPodId(pathname);
  const prevPodId = usePrevious(getPodId(pathname));
  const podHeight = height - 50;
  const { _id, name } = pod || {};

  useEffect(() => {
    podId && podId !== prevPodId && getPod(podId);
    getChannel(podId).bind(NOW_PLAYING, data => {
      console.log(`%cNow Playing: %o`, 'color: orange', data);
    })
  }, [pathname, prevPodId, getPod]);

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
              <InviteIcon className={styles.inviteIcon} title={'Invite People'} />
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
        <Modal
          className={styles.inviteModal}
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          contentClassName={styles.inviteModalContent}
        >
          <div className={styles.inviteModalText}>
            Invite People to the <span className={styles.inviteTitle}>{name}</span> Pod
          </div>
          <div className={styles.inputFields}>
            <TextInput
              placeholder={'Phone Number'}
              inputClassName={styles.phoneInput}
              autofocus
              value={phoneNumber}
              onChange={setPhoneNumber}
              onPressEnter={() => {
                sendInvitation(_id, 'sms', phoneNumber);
                setIsModalOpen(false);
              }}
            />
            <Button
              className={styles.inviteButton}
              text={'Invite'}
              onClick={() => {
                sendInvitation(_id, 'sms', phoneNumber);
                setIsModalOpen(false);
              }}
            />
          </div>
        </Modal>
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
  height: number,
  navTo: func.isRequired,
  sendInvitation: func.isRequired
};

export default Pod;

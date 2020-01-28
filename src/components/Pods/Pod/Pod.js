import React, { useState, useEffect } from 'react';
import { func, string, shape, number } from 'prop-types';
import { MY_PODS_ROUTE } from '../../../constants/routes';
import { SEARCH } from '../../../constants/pods';
import Spotify from '../../Spotify/container';
import PodViewSelector from './PodViewSelector/PodViewSelector';
import Modal from '../../common/Modal/Modal';
import Button from '../../common/Button/Button';
import TextInput from '../../common/TextInput/TextInput';
import { ReactComponent as InviteIcon } from '../../../img/invite.svg';
import styles from './Pod.module.scss';

const getPodId = pathname => pathname.split('/')[2];

const Pod = ({ getPod, pathname, pod, userId, height, navTo, sendInvitation }) => {
  const [view, setView] = useState(SEARCH);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    getPod(getPodId(pathname));
  }, [getPod, pathname]);

  const podHeight = height - (height * 0.07);
  const { _id, name } = pod || {};

  return (
    <div className={styles.pod} style={{ height: podHeight }}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.name}>{name}</div>
          <div className={styles.inviteIconContainer} onClick={() => setIsModalOpen(true)}>
            <InviteIcon className={styles.inviteIcon} title={'Invite People'} />
          </div>
        </div>
        <PodViewSelector
          className={styles.viewSelector}
          selectedView={view}
          setView={setView}
        />
        <div
          className={styles.closeButton}
          title={'Close Pod'}
          onClick={() => navTo(MY_PODS_ROUTE.replace(':userId', userId))}
        />
      </div>
      <div className={styles.content}>
        <Spotify selectedView={view} height={podHeight} />
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
  );
};

Pod.propTypes = {
  getPod: func.isRequired,
  pathname: string,
  pod: shape({
    name: string
  }),
  userId: string,
  height: number,
  navTo: func.isRequired,
  sendInvitation: func.isRequired
};

export default Pod;

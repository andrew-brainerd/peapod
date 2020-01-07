import React, { useState, useEffect } from 'react';
import { func, string, shape, number } from 'prop-types';
import { MY_PODS_ROUTE } from '../../../constants/routes';
import { SEARCH } from '../../../constants/pods';
import Spotify from '../../Spotify/container';
import PodViewSelector from './PodViewSelector/PodViewSelector';
import Modal from '../../common/Modal/Modal';
import { ReactComponent as InviteIcon } from '../../../img/invite.svg';
import styles from './Pod.module.scss';

const getPodId = pathname => pathname.split('/')[2];

const Pod = ({ getPod, pathname, pod, userId, height, navTo, invitePeople }) => {
  const [view, setView] = useState(SEARCH);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    getPod(getPodId(pathname));
  }, [getPod, pathname]);

  const { name, inviteLink } = pod || {};

  return (
    <div className={styles.pod} style={{ height: height - (height * 0.07) }}>
      <div className={styles.header}>
        <div className={styles.name}>{name}</div>
        <div className={styles.inviteIconContainer} onClick={() => setIsModalOpen(true)}>
          <InviteIcon className={styles.inviteIcon} title={'Invite People'} />
        </div>
        <PodViewSelector selectedView={view} setView={setView} />
        <div
          className={styles.closeButton}
          title={'Close Pod'}
          onClick={() => navTo(MY_PODS_ROUTE.replace(':userId', userId))}
        />
      </div>
      <div className={styles.content}>
        <Spotify selectedView={view} />
      </div>
      <Modal
        className={styles.inviteModal}
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <div className={styles.inviteModalText}>
          Invite People to the <span className={styles.inviteTitle}>{name}</span> Pod
        </div>
        <div className={styles.inviteLink}>{inviteLink}</div>
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
  navTo: func.isRequired
};

export default Pod;

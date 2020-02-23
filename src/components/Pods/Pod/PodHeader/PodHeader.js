import React from 'react';
import { string, func } from 'prop-types';
import { PODS_ROUTE } from '../../../../constants/routes';
import Icon from '../../../common/Icon/Icon';
import PodViewSelector from '../PodViewSelector/container';
import styles from './PodHeader.module.scss';

const PodHeader = ({ podId, podName, userId, view, openModal, navTo }) => {
  return (
    <div className={styles.podHeader}>
      <div className={styles.title}>
        <div className={styles.name}>{podName}</div>
        <div className={styles.inviteIconContainer} onClick={openModal}>
          <Icon className={styles.inviteIcon} name={'invite'} title={'Invite People'} />
        </div>
      </div>
      <PodViewSelector
        className={styles.viewSelector}
        podId={podId}
        selectedView={view}
      />
      <div
        className={styles.closeButton}
        title={'Close Pod'}
        onClick={() => navTo(PODS_ROUTE.replace(':userId', userId))}
      />
    </div>
  );
};

PodHeader.propTypes = {
  podId: string,
  podName: string,
  userId: string,
  view: string,
  openModal: func.isRequired,
  navTo: func.isRequired
};

export default PodHeader;

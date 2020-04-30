import React, { useState, useEffect } from 'react';
import { string, arrayOf, shape, bool, func } from 'prop-types';
import { isDefined } from '../../../utils/validation';
import { MEMBER_ADDED, LAUNCH_GAME } from '../../../constants/sync';
import { POD_SEARCH_ROUTE } from '../../../constants/routes';
import Header from '../../common/Header/container';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import InviteModal from '../Pod/InviteModal/container';
import styles from './PodLobby.module.scss';

const PodLobby = ({
  podId,
  podMembers,
  shouldUpdate,
  userId,
  podCreatorId,
  connectToPusher,
  triggerUpdate,
  getPod,
  addMember,
  launchPod,
  navTo
}) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isDefined(podId) && !!userId) {
      connectToPusher(podId, MEMBER_ADDED, triggerUpdate);
      addMember(podId);
    }
  }, [podId, userId, connectToPusher, triggerUpdate, addMember]);

  useEffect(() => {
    if (isDefined(podId) && !!userId) {
      connectToPusher(podId, LAUNCH_GAME, () =>
        navTo(POD_SEARCH_ROUTE.replace(':podId', podId))
      );
    }
  }, [podId, userId, connectToPusher, navTo]);

  useEffect(() => {
    if (isDefined(podId) && (isInitialLoad || shouldUpdate)) {
      getPod(podId);
      setIsInitialLoad(false);
    }
  }, [podId, isInitialLoad, shouldUpdate, getPod]);

  return (
    <>
      <Header />
      <div
        className={styles.inviteIconContainer}
        onClick={() => setIsModalOpen(true)}
      >
        <Icon className={styles.inviteIcon} name={'invite'} title={'Invite People'} />
      </div>
      <div className={styles.podLobby}>
        <div className={styles.podMembers}>
          {podMembers.map(({ display_name: name }, p) =>
            <div key={p} className={styles.podMember}>{name}</div>
          )}
        </div>
        {userId === podCreatorId && (
          <Button
            className={styles.launchButton}
            text={'Launch Pod'}
            onClick={() => launchPod(podId)}
            disabled={podMembers.length < 2}
          />
        )}
      </div>
      <InviteModal
        isOpen={isModalOpen}
        podId={podId}
        closeModal={() => setIsModalOpen(false)}
      />
    </>
  );
};

PodLobby.propTypes = {
  podId: string,
  podMembers: arrayOf(shape({
    display_name: string
  })),
  shouldUpdate: bool,
  userId: string,
  podCreatorId: string,
  connectToPusher: func.isRequired,
  triggerUpdate: func.isRequired,
  getPod: func.isRequired,
  addMember: func.isRequired,
  launchPod: func.isRequired,
  navTo: func.isRequired
};

export default PodLobby;

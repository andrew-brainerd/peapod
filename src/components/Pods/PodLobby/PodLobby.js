import React, { useState, useEffect } from 'react';
import { string, arrayOf, shape, bool, func } from 'prop-types';
import { isDefined } from '../../../utils/validation';
import { MEMBER_ADDED, LAUNCH_GAME } from '../../../constants/sync';
import { POD_SEARCH_ROUTE } from '../../../constants/routes';
import Header from '../../common/Header/container';
import Button from '../../common/Button/Button';
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
      addMember(podId);
    }
  }, [podId, userId, connectToPusher, navTo, addMember]);

  useEffect(() => {
    if (isDefined(podId) && (isInitialLoad || shouldUpdate)) {
      getPod(podId);
      setIsInitialLoad(false);
    }
  }, [podId, isInitialLoad, shouldUpdate, getPod]);

  return (
    <>
      <Header />
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
          />
        )}
      </div>
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

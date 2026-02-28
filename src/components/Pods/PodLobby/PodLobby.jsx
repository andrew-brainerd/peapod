import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { isDefined } from '../../../utils/validation';
import { MEMBER_ADDED, LAUNCH_GAME } from '../../../constants/sync';
import { POD_SEARCH_ROUTE } from '../../../constants/routes';
import { getCurrentPodMembers, getShouldUpdatePod, getCurrentPodCreatorId, triggerUpdate, getPod, addMemberToPod, launchPod } from '../../../slices/pods';
import { getProfileId } from '../../../slices/spotify';
import { connectToPusher } from '../../../slices/sync';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import InviteModal from '../Pod/InviteModal/InviteModal';
import styles from './PodLobby.module.scss';

const PodLobby = () => {
  const dispatch = useDispatch();
  const podMembers = useSelector(getCurrentPodMembers);
  const shouldUpdate = useSelector(getShouldUpdatePod);
  const userId = useSelector(getProfileId);
  const podCreatorId = useSelector(getCurrentPodCreatorId);
  const { podId } = useParams();
  const navigate = useNavigate();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isDefined(podId) && !!userId) {
      dispatch(connectToPusher(podId, MEMBER_ADDED, triggerUpdate));
      dispatch(addMemberToPod(podId));
    }
  }, [podId, userId, dispatch]);

  useEffect(() => {
    if (isDefined(podId) && !!userId) {
      dispatch(connectToPusher(podId, LAUNCH_GAME, () =>
        navigate(POD_SEARCH_ROUTE.replace(':podId', podId))
      ));
    }
  }, [podId, userId, dispatch, navigate]);

  useEffect(() => {
    if (isDefined(podId) && (isInitialLoad || shouldUpdate)) {
      dispatch(getPod(podId));
      setIsInitialLoad(false);
    }
  }, [podId, isInitialLoad, shouldUpdate, dispatch]);

  return (
    <>
      <Header />
      <Button
        className={styles.inviteIconContainer}
        onClick={() => setIsModalOpen(true)}
      >
        <span className={styles.inviteText}>Invite Friends</span>
        <Icon className={styles.inviteIcon} name={'invite'} title={'Invite People'} />
      </Button>
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
            onClick={() => dispatch(launchPod(podId))}
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

export default PodLobby;

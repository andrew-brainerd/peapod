import React from 'react';
import { useSelector } from 'react-redux';
import { getProfileId } from '../../../../slices/spotify';
import {
  getCurrentPodMembers,
  getCurrentPodActiveMembers,
  getCurrentPodCreatorId
} from '../../../../slices/pods';
import styles from './PodMembers.module.scss';

const getIsActiveMember = (member, activeList) => activeList.find(
  activeMember => activeMember === member.id
);

const PodMembers = () => {
  const userId = useSelector(getProfileId);
  const memberList = useSelector(getCurrentPodMembers);
  const activeMemberList = useSelector(getCurrentPodActiveMembers);
  const podCreatorId = useSelector(getCurrentPodCreatorId);

  return (
    <div className={styles.podMembers}>
      <div className={styles.title}>Pod Members</div>
      {memberList.map(member => {
        const isActiveMember = getIsActiveMember(member, activeMemberList);
        const isCurrentUser = member.id === userId;

        return (
          <div
            key={member.id}
            className={[
              styles.member,
              isActiveMember || isCurrentUser ? styles.isActive : '',
              member.id === podCreatorId ? styles.isCreator : ''
            ].join(' ')}>
            {member.display_name}
          </div>
        );
      })}
    </div>
  );
};

export default PodMembers;

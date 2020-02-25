import React from 'react';
import { array, string } from 'prop-types';
import styles from './PodMembers.module.scss';

const getIsActiveMember = (member, activeList) => activeList.find(
  activeMember => activeMember === member.id
);

const PodMembers = ({ userId, memberList, activeMemberList, podCreatorId }) => (
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

PodMembers.propTypes = {
  userId: string,
  memberList: array,
  activeMemberList: array,
  podCreatorId: string
};

export default PodMembers;

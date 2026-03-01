import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from '@tanstack/react-router';
import { getAccessToken } from '../../../../slices/spotify';
import { useProfile } from '../../../../queries/spotify';
import { usePod } from '../../../../queries/pods';
import type { PodMember } from '../../../../types';
import styles from './PodMembers.module.scss';

const getIsActiveMember = (member: PodMember, activeList: string[]) => activeList.find(
  activeMember => activeMember === member.id
);

const PodMembers = () => {
  const { podId } = useParams({ strict: false }) as { podId: string };
  const accessToken = useSelector(getAccessToken);
  const { data: profile } = useProfile(accessToken);
  const userId = profile?.id;
  const { data: pod } = usePod(podId);

  const memberList = pod?.members ?? [];
  const activeMemberList = pod?.activeMembers ?? [];
  const podCreatorId = pod?.createdBy?.id;

  return (
    <div className={styles.podMembers}>
      <div className={styles.title}>Pod Members</div>
      {memberList.map((member: PodMember) => {
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

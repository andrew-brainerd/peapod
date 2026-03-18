import React from 'react';
import styles from './PodMembers.module.scss';

interface PodMember {
  name: string;
}

interface PodMembersProps {
  members?: PodMember[];
}

const PodMembers = ({ members = [] }: PodMembersProps) => {
  return (
    <>
      <div className={styles.header}>Members</div>
      <div className={styles.podMembers}>
        {members.map(({ name }, m) => (
          <div key={m}>{name}</div>
        ))}
      </div>
    </>
  );
};

export default PodMembers;

import React from 'react';
import Button from '../../../common/Button/Button';
import Icon from '../../../common/Icon/Icon';
import styles from './PodHeader.module.scss';

interface PodHeaderProps {
  onInviteClick: () => void;
}

const PodHeader = ({ onInviteClick }: PodHeaderProps) => {
  return (
    <div className={styles.podHeader}>
      <Button className={styles.inviteButton} onClick={onInviteClick}>
        <Icon name={'invite'} title={'Invite People'} />
        <span className={styles.inviteLabel}>Invite</span>
      </Button>
    </div>
  );
};

export default PodHeader;

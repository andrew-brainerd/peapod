import React from 'react';
import Button from '../../common/Button/Button';
import styles from './PodItem.module.scss';

interface PodItemProps {
  numMembers?: number;
  action?: (value: boolean) => void;
}

const PodItem = ({ numMembers = 0, action }: PodItemProps) => {
  return (
    <Button className={styles.podItem} text={'Pod'} onClick={() => action?.(true)}>
      <div className={styles.numMembers}>{`${numMembers} member${numMembers !== 1 ? 's' : ''}`}</div>
    </Button>
  );
};

export default PodItem;

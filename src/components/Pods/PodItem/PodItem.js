import React from 'react';
import { number, func } from 'prop-types';
import Button from '../../common/Button/Button';
import styles from './PodItem.module.scss';

const PodItem = ({ numMembers, action }) => {
  return (
    <Button
      className={styles.podItem}
      text={'Pod'}
      onClick={() => action(true)}
    >
      <div className={styles.numMembers}>
        {`${numMembers} member${numMembers !== 1 ? 's' : ''}`}
      </div>
    </Button>
  );
};

PodItem.propTypes = {
  numMembers: number,
  action: func
};

PodItem.defaultProps = {
  numMembers: 0
};

export default PodItem;

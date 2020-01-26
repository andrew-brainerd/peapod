import React from 'react';
import { string, number, func } from 'prop-types';
import Button from '../../common/Button/Button';
import styles from './PodItem.module.scss';

const PodItem = ({ name, numMembers, action }) => {
  return (
    <Button
      className={styles.podItem}
      text={name}
      onClick={() => action(true)}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.numMembers}>
        {`${numMembers} member${numMembers !== 1 ? 's' : ''}`}
      </div>
    </Button>
  );
};

PodItem.propTypes = {
  name: string.isRequired,
  numMembers: number,
  action: func
};

PodItem.defaultProps = {
  numMembers: 0
};

export default PodItem;

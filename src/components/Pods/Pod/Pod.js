import React from 'react';
import { string, number, func } from 'prop-types';
import Button from '../../common/Button/Button';
import styles from './Pod.module.scss';

const Pod = ({ name, numMembers, action }) => {
  return (
    <Button
      className={styles.pod}
      text={name}
      onClick={() => action(true)}
    >
      <div className={styles.name}>{name}</div>
      <div className={styles.numMembers}>
        {`${numMembers} member${ numMembers !== 1 ? 's' : ''}`}
      </div>
    </Button>
  );
}

Pod.propTypes = {
  name: string.isRequired,
  numMembers: number,
  action: func
}

Pod.defaultProps = {
  numMembers: 0
}

export default Pod;

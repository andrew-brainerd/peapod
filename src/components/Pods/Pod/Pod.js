import React from 'react';
import { string, number } from 'prop-types';
import Button from '../../common/Button/Button';
import styles from './Pod.module.scss';

const Pod = ({ name, numMembers }) => {
  return (
    <Button
      className={styles.pod}
      text={name}
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
  numMembers: number
}

Pod.defaultProps = {
  numMembers: 0
}

export default Pod;

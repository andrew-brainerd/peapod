import React from 'react';
import { string } from 'prop-types';
import styles from './Pod.module.scss';

const Pod = ({ name }) => {
  return (
    <div className={styles.pod}>{name}</div>
  );
}

Pod.propTypes = {
  name: string.isRequired
}

export default Pod;

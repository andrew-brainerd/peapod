import React from 'react';
import { string } from 'prop-types';
import Button from '../../common/Button/Button';
import styles from './Pod.module.scss';

const Pod = ({ name }) => {
  return (
    <Button
      className={styles.pod}
      text={name}
    />
  );
}

Pod.propTypes = {
  name: string.isRequired
}

export default Pod;

import React from 'react';
import { string } from 'prop-types';
import styles from './User.module.scss';

const User = ({ name }) => {
  return (
    <div className={styles.user}>
      {name}
    </div>
  );
};

User.propTypes = {
  name: string
};

export default User;

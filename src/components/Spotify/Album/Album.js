import React from 'react';
import { string } from 'prop-types';
import styles from './Album.module.scss';

const Album = ({ name }) => {
  return (
    <div className={styles.album}>
      {name}
    </div>
  );
};

Album.propTypes = {
  name: string
};

export default Album;

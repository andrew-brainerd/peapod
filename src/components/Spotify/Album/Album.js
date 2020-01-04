import React from 'react';
import { string } from 'prop-types';
import styles from './Album.module.scss';

const Album = props => {
  console.log(`Album: %o`, props);
  const { name } = props;

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

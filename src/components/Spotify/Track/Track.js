import React from 'react';
import { string } from 'prop-types';
import styles from './Track.module.scss';

const Track = ({ name }) => {
  return (
    <div className={styles.track}>
      {name}
    </div>
  );
};

Track.propTypes = {
  name: string
};

export default Track;

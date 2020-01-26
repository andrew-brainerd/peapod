import React from 'react';
import { string } from 'prop-types';
import styles from './TrackProgress.module.scss';

const TrackProgress = ({ playTime, trackLength }) => {
  return (
    <div className={styles.trackProgress}>
      <div className={styles.time}>{playTime}</div>/
      <div className={styles.time}>{trackLength}</div>
    </div>
  );
};

TrackProgress.propTypes = {
  playTime: string,
  trackLength: string
};

export default TrackProgress;

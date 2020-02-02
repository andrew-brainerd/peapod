import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import moment from 'moment';
import usePrevious from '../../../../hooks/usePrevious';
import useInterval from '../../../../hooks/useInterval';
import { getTimeFromDuration, formatTimer } from '../../../../utils/spotify';
import styles from './TrackProgress.module.scss';

const TrackProgress = ({ trackId, playTime, trackLength }) => {
  const [timer, setTimer] = useState(playTime);
  const prevTrackId = usePrevious(trackId);
  const playDuration = moment.duration(playTime);
  const timerDuration = moment.duration(timer);

  useEffect(() => {
    const syncDiff = playDuration.asSeconds() - timerDuration.asSeconds();
    const isOutofSync = Math.abs(syncDiff) > 5;

    if (trackId !== prevTrackId || isOutofSync) {
      setTimer(playTime);
    }
  }, [trackId, playTime, prevTrackId, playDuration, timerDuration]);

  useInterval(() => {
    if (timer !== trackLength) {
      const newDuration = timerDuration.add(moment.duration(1, 'seconds'));
      setTimer(getTimeFromDuration(newDuration));
    }
  }, 1000);

  return (
    <div className={styles.trackProgress}>
      <div className={styles.time}>{formatTimer(timer)}</div>/
      <div className={styles.time}>{formatTimer(trackLength)}</div>
    </div>
  );
};

TrackProgress.propTypes = {
  trackId: string,
  playTime: string,
  trackLength: string
};

export default TrackProgress;

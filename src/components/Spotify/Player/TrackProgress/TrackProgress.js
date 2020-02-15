import React, { useState, useEffect } from 'react';
import { shape, number } from 'prop-types';
import moment from 'moment';
import usePrevious from '../../../../hooks/usePrevious';
import useInterval from '../../../../hooks/useInterval';
import { getTimeFromDuration, formatTimer } from '../../../../utils/spotify';
import { getTrackProgress, getTrackLength } from '../../../../selectors/player';
import styles from './TrackProgress.module.scss';

const TrackProgress = ({ nowPlaying }) => {
  const trackProgress = moment.duration(getTrackProgress(nowPlaying));
  const trackDuration = moment.duration(getTrackLength(nowPlaying));
  const playTime = getTimeFromDuration(trackProgress);
  const [timer, setTimer] = useState(playTime);
  const trackLength = getTimeFromDuration(trackDuration);
  const prevTrackId = usePrevious(nowPlaying.id);
  const playDuration = moment.duration(playTime);
  const timerDuration = moment.duration(timer);

  useEffect(() => {
    const syncDiff = playDuration.asSeconds() - timerDuration.asSeconds();
    const isOutofSync = Math.abs(syncDiff) > 5;

    if (nowPlaying.id !== prevTrackId || isOutofSync) {
      setTimer(playTime);
    }
  }, [nowPlaying.id, playTime, prevTrackId, playDuration, timerDuration]);

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
  nowPlaying: shape({
    id: number.isRequired,
    duration_ms: number.isRequired,
    progress_ms: number.isRequired
  })
};

export default TrackProgress;

import React, { useState, useEffect } from 'react';
import { shape, number } from 'prop-types';
import usePrevious from '../../../../hooks/usePrevious';
import useInterval from '../../../../hooks/useInterval';
import { getTimeFromDuration, formatTimer } from '../../../../utils/spotify';
import { getTrackProgress, getTrackLength } from '../../../../selectors/player';
import styles from './TrackProgress.module.scss';

const TrackProgress = ({ nowPlaying }) => {
  const progressMs = getTrackProgress(nowPlaying) || 0;
  const durationMs = getTrackLength(nowPlaying) || 0;
  const [timerMs, setTimerMs] = useState(progressMs);
  const prevTrackId = usePrevious(nowPlaying.id);

  useEffect(() => {
    const syncDiff = Math.abs(progressMs - timerMs) / 1000;
    if (nowPlaying.id !== prevTrackId || syncDiff > 5) {
      setTimerMs(progressMs);
    }
  }, [nowPlaying.id, progressMs, prevTrackId, timerMs]);

  useInterval(() => {
    if (timerMs < durationMs) {
      setTimerMs(prev => prev + 1000);
    }
  }, 1000);

  return (
    <div className={styles.trackProgress}>
      <div className={styles.time}>{formatTimer(timerMs)}</div>/
      <div className={styles.time}>{formatTimer(durationMs)}</div>
    </div>
  );
};

TrackProgress.propTypes = {
  nowPlaying: shape({
    id: number,
    duration_ms: number,
    progress_ms: number
  })
};

export default TrackProgress;

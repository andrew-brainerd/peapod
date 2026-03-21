import React, { useState, useEffect } from 'react';
import usePrevious from '../../../../hooks/usePrevious';
import useInterval from '../../../../hooks/useInterval';
import { formatTimer } from '../../../../utils/spotify';
import { getTrackProgress, getTrackLength } from '../../../../selectors/player';
import type { NowPlaying } from '../../../../types';
interface TrackProgressProps {
  nowPlaying?: NowPlaying;
}

const TrackProgress = ({ nowPlaying = {} }: TrackProgressProps) => {
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
    <div className="flex flex-row my-2.5">
      <div className="text-[0.8em] mx-[5px] my-[3px] text-center">{formatTimer(timerMs)}</div>/
      <div className="text-[0.8em] mx-[5px] my-[3px] text-center">{formatTimer(durationMs)}</div>
    </div>
  );
};

export default TrackProgress;

import React, { useState } from 'react';
import { bool, object, func } from 'prop-types';
import moment from 'moment';
import usePrevious from '../../../hooks/usePrevious';
import usePollingEffect from '../../../hooks/usePollingEffect';
import {
  getIsPlaying,
  getNowPlayingItem,
  getTrackProgress,
  getTrackLength,
  getTrackImages
} from '../../../selectors/player';
import { TRACK } from '../../../constants/spotify';
import TrackProgress from './TrackProgress/TrackProgress';
import styles from './Player.module.scss';
import { getTimeFromMilliseconds } from '../../../utils/spotify';

const Player = ({ hasAuth, isLoading, nowPlaying, getMyNowPlaying }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isPlaying = getIsPlaying(nowPlaying);
  const { type, name } = getNowPlayingItem(nowPlaying);
  const trackProgress = moment.duration(getTrackProgress(nowPlaying));
  const trackDuration = moment.duration(getTrackLength(nowPlaying));
  const trackImages = getTrackImages(nowPlaying);
  const prevName = usePrevious(name);

  prevName !== name && console.log({ isPlaying, type, name, nowPlaying });

  const playTime = getTimeFromMilliseconds(trackProgress);
  const trackLength = getTimeFromMilliseconds(trackDuration);
  const albumArt = (trackImages[1] || {}).url;

  usePollingEffect(() => {
    if (hasAuth) {
      setIsInitialLoad(false);
      getMyNowPlaying();
    }
  }, [hasAuth, getMyNowPlaying], 10000);

  return (isInitialLoad && isLoading) || !hasAuth ?
    <div className={styles.loading}>Loading Player...</div> :
    <div className={styles.player}>
      {isPlaying ?
        <div className={styles.nowPlaying}>
          <div className={styles.trackInfo}>
            {type === TRACK &&
              <div className={styles.trackName}>
                {name}
              </div>}
            <TrackProgress playTime={playTime} trackLength={trackLength} />
          </div>
          <div className={styles.albumArt}>
            <img src={albumArt} alt={'Album Art'} />
          </div>
        </div> :
        <div className={styles.emptyPlayer}>Nothing Playing</div>}
    </div>;
};

Player.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  nowPlaying: object,
  getMyNowPlaying: func.isRequired
};

Player.defaultProps = {
  isLoading: true
};

export default Player;

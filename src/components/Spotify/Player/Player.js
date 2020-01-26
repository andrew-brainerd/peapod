import React, { useState } from 'react';
import { bool, object, func } from 'prop-types';
import usePollingEffect from '../../../hooks/usePollingEffect';
import usePrevious from '../../../hooks/usePrevious';
import { getIsPlaying, getNowPlayingItem } from '../../../selectors/player';
import { TRACK } from '../../../constants/spotify';
import styles from './Player.module.scss';

const Player = ({ hasAuth, isLoading, nowPlaying, getMyNowPlaying }) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const isPlaying = getIsPlaying(nowPlaying);
  const { type, name } = getNowPlayingItem(nowPlaying);
  const prevName = usePrevious(name);
  prevName !== name && console.log({ isPlaying, type, name, nowPlaying });

  usePollingEffect(() => {
    if (hasAuth) {
      setIsInitialLoad(false);
      getMyNowPlaying();
    }
  }, [hasAuth, getMyNowPlaying], 30000);

  return (isInitialLoad && isLoading) || !hasAuth ?
    <div className={styles.loading}>Loading Player...</div> :
    <div className={styles.player}>
      {isPlaying ?
        <div className={styles.nowPlaying}>
          {type === TRACK && 
            <div className={styles.trackName}>
              {name}
            </div>}
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

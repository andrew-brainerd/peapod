import React, { useEffect } from 'react';
import { bool, array, string, oneOf, func } from 'prop-types';
import { getAuth, refreshAuth } from '../../api/spotify';
import { podViews, SEARCH } from '../../constants/pods';
import Button from '../common/Button/Button';
import TrackList from './TrackList/container';
import Player from './Player/container';
import { ReactComponent as SpotifyIcon } from '../../img/spotify.svg';
import styles from './Spotify.module.scss';

const Spotify = ({ hasAuth, hasRefreshToken, pathname, selectedView }) => {
  useEffect(() => {
    !hasAuth && hasRefreshToken && refreshAuth(pathname);
  }, [hasAuth, pathname]);

  return !hasAuth ?
    <Button
      className={styles.authButton}
      onClick={() => getAuth(pathname)}
    >
      <SpotifyIcon />
      <div className={styles.authButtonText}>Spotify Login</div>
    </Button> :
    selectedView === SEARCH ?
      <TrackList /> :
      <Player />;
};

Spotify.propTypes = {
  hasAuth: bool,
  isLoading: bool,
  tracks: array,
  pathname: string,
  selectedView: oneOf(podViews),
  getMyTopTracks: func.isRequired
};

Spotify.defaultProps = {
  isLoading: true
};

export default Spotify;

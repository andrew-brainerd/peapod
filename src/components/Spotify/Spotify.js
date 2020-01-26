import React, { useEffect } from 'react';
import { bool, string, oneOf, func } from 'prop-types';
import { getAuth } from '../../api/spotify';
import { podViews, SEARCH } from '../../constants/pods';
import Button from '../common/Button/Button';
import TrackList from './TrackList/container';
import Player from './Player/container';
import { ReactComponent as SpotifyIcon } from '../../img/spotify.svg';
import styles from './Spotify.module.scss';

const Spotify = ({ hasAuth, pathname, selectedView, loadLocalAuth }) => {
  useEffect(() => {
    !hasAuth && loadLocalAuth();
  }, [hasAuth, loadLocalAuth]);

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
  pathname: string,
  selectedView: oneOf(podViews),
  loadLocalAuth: func.isRequired
};

export default Spotify;

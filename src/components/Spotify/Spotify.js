import React, { useEffect } from 'react';
import { bool, string, oneOf, number, func } from 'prop-types';
import { getAuth } from '../../api/spotify';
import { podViews, SEARCH } from '../../constants/pods';
import Button from '../common/Button/Button';
import SongSelection from './SongSelection/SongSelection';
import Player from './Player/container';
import { ReactComponent as SpotifyIcon } from '../../img/spotify.svg';
import styles from './Spotify.module.scss';

const Spotify = ({ hasAuth, pathname, selectedView, height, loadLocalAuth, getProfile }) => {
  useEffect(() => {
    !hasAuth ? loadLocalAuth() : getProfile();
  }, [hasAuth, loadLocalAuth, getProfile]);

  return !hasAuth ?
    <Button
      className={styles.authButton}
      onClick={() => getAuth(pathname)}
    >
      <SpotifyIcon />
      <div className={styles.authButtonText}>Spotify Login</div>
    </Button> :
    selectedView === SEARCH ?
      <SongSelection /> :
      <Player height={height} />;
};

Spotify.propTypes = {
  hasAuth: bool,
  pathname: string,
  selectedView: oneOf(podViews),
  height: number,
  loadLocalAuth: func.isRequired,
  getProfile: func.isRequired
};

export default Spotify;

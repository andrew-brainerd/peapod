import React, { useEffect } from 'react';
import { bool, string, node, func } from 'prop-types';
import { getAuth } from '../../api/spotify';
import { HOME_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './Spotify.module.scss';

const Spotify = ({ hasAuth, pathname, children, loadLocalAuth, getProfile }) => {
  useEffect(() => {
    !hasAuth ? loadLocalAuth() : getProfile();
  }, [hasAuth, loadLocalAuth, getProfile]);

  return !hasAuth && pathname !== HOME_ROUTE ?
    <Button
      className={styles.authButton}
      onClick={() => getAuth(pathname)}
    >
      <Icon name={'spotify'} title={'Spotify Logo'} />
      <div className={styles.authButtonText}>Spotify Login</div>
    </Button> :
    children;
};

Spotify.propTypes = {
  hasAuth: bool,
  pathname: string,
  children: node.isRequired,
  loadLocalAuth: func.isRequired,
  getProfile: func.isRequired
};

export default Spotify;

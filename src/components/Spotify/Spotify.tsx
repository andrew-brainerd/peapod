import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { AppDispatch } from '../../store/configureStore';
import { getAccessToken, loadLocalAuth, fetchProfile } from '../../slices/spotify';
import { getAuth } from '../../api/spotify';
import { HOME_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './Spotify.module.scss';

interface SpotifyProps {
  children: React.ReactNode;
}

const Spotify = ({ children }: SpotifyProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const hasAuth = !!useSelector(getAccessToken);
  const { pathname } = useLocation();

  useEffect(() => {
    !hasAuth ? dispatch(loadLocalAuth()) : dispatch(fetchProfile());
  }, [hasAuth, dispatch]);

  return !hasAuth && pathname !== HOME_ROUTE ?
    <Button
      className={styles.authButton}
      onClick={() => getAuth(pathname)}
    >
      <Icon name={'spotify'} title={'Spotify Logo'} />
      <div className={styles.authButtonText}>Spotify Login</div>
    </Button> :
    <>{children}</>;
};

export default Spotify;

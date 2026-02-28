import React, { useEffect } from 'react';
import { node } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAccessToken, loadLocalAuth, fetchProfile } from '../../slices/spotify';
import { getAuth } from '../../api/spotify';
import { HOME_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import styles from './Spotify.module.scss';

const Spotify = ({ children }) => {
  const dispatch = useDispatch();
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
    children;
};

Spotify.propTypes = {
  children: node.isRequired
};

export default Spotify;

import React, { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../stores/spotifyStore';
import { getAuth } from '../../api/spotify';
import { PODS_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import logo from '../../img/logo.png';
import styles from './Home.module.scss';

const Home = () => {
  const navigate = useNavigate();
  const accessToken = useSpotifyStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate({ to: PODS_ROUTE });
    }
  }, [accessToken, navigate]);

  return (
    <div className={styles.home}>
      <div className={styles.branding}>
        <img className={styles.logo} src={logo} alt="Peapod Logo" />
        <h1 className={styles.title}>Peapod</h1>
      </div>
      <Button className={styles.loginButton} onClick={() => getAuth(PODS_ROUTE)}>
        <Icon name={'spotify'} title={'Spotify Logo'} />
        <span className={styles.loginButtonText}>Login with Spotify</span>
      </Button>
    </div>
  );
};

export default Home;

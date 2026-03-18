import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { getAccessToken } from '../../slices/spotify';
import { getAuth } from '../../api/spotify';
import { PODS_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import Icon from '../common/Icon/Icon';
import logo from '../../img/logo.png';
import styles from './Home.module.scss';

const Home = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);

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

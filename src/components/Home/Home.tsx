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
      <h1>Peapod</h1>
      <div className={styles.logo}>
        <img src={logo} alt="Peapod Logo" />
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.loginButton} onClick={() => getAuth(PODS_ROUTE)}>
          <Icon name={'spotify'} title={'Spotify Logo'} />
          <div className={styles.loginButtonText}>Login with Spotify</div>
        </Button>
      </div>
    </div>
  );
};

export default Home;

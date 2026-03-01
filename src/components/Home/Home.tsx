import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { getAccessToken } from '../../slices/spotify';
import { useProfile } from '../../queries/spotify';
import Button from '../common/Button/Button';
import logo from '../../img/logo.png';
import styles from './Home.module.scss';

const Home = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);
  const { data: profile } = useProfile(accessToken);

  return (
    <div className={styles.home}>
      <h1>Peapod</h1>
      <div className={styles.logo}>
        <img src={logo} alt='Peapod Logo' />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          onClick={() => navigate({ to: '/pods' })}
        >
          Take a <span className={styles.buttonText}>Pea</span>k
        </Button>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfileId } from '../../slices/spotify';
import { PODS_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import logo from '../../img/logo.png';
import styles from './Home.module.scss';

const Home = () => {
  const navigate = useNavigate();
  const userId = useSelector(getProfileId);

  return (
    <div className={styles.home}>
      <h1>Peapod</h1>
      <div className={styles.logo}>
        <img src={logo} alt='Peapod Logo' />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          onClick={() => navigate(PODS_ROUTE.replace(':userId', userId || ''))}
        >
          Take a <span className={styles.buttonText}>Pea</span>k
        </Button>
      </div>
    </div>
  );
};

export default Home;

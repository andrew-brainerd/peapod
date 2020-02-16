import React from 'react';
import { string, func } from 'prop-types';
import { PODS_ROUTE } from '../../constants/routes';
import Button from '../common/Button/Button';
import logo from '../../img/logo.png';
import styles from './Home.module.scss';

const Home = ({ userId, navTo }) => (
  <div className={styles.home}>
    <h1>Peapod</h1>
    <div className={styles.logo}>
      <img src={logo} alt='Peapod Logo' />
    </div>
    <div className={styles.buttonContainer}>
      <Button
        className={styles.button}
        onClick={() => navTo(PODS_ROUTE.replace(':userId', userId))}
      >
        Take a <span className={styles.buttonText}>Pea</span>k
      </Button>
    </div>
  </div>
);

Home.propTypes = {
  userId: string,
  navTo: func.isRequired
};

export default Home;

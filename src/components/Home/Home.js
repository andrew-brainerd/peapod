import React from 'react';
import logo from '../../img/logo.png';
import styles from './Home.module.scss';

const Home = () => (
  <div className={styles.home}>
    <div className={styles.content}>
      <div>Welcome to Peapod</div>
      <div className={styles.logo}>
        <img src={logo} alt='Peapod Logo' />
      </div>
    </div>
  </div>
);

export default Home;

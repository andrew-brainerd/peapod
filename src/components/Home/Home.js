import React from 'react';
import { func } from 'prop-types';
import logo from '../../img/logo.png';
import Button from '../common/Button/Button';
import { MENU_ROUTE } from '../../constants/routes';
import styles from './Home.module.scss';

const Home = ({ navTo }) => (
  <div className={styles.home}>
    <h1>Welcome to Peapod</h1>
    <div className={styles.logo}>
      <img src={logo} alt='Peapod Logo' />
    </div>
    <div className={styles.buttonContainer}>
      <Button
        className={styles.getStarted}
        text='Get Started'
        onClick={() => navTo(MENU_ROUTE)}
      />
    </div>
  </div>
);

Home.propTypes = {
  navTo: func.isRequired
}

export default Home;

import React from 'react';
import { func } from 'prop-types';
import logo from '../../img/logo.png';
import Button from '../common/Button/Button';
import { POD_SELECTION_ROUTE } from '../../constants/routes';
import styles from './Home.module.scss';

const Home = ({ navTo }) => (
  <div className={styles.home}>
    <h1>Peapod</h1>
    <div className={styles.logo}>
      <img src={logo} alt='Peapod Logo' />
    </div>
    <div className={styles.buttonContainer}>
      <Button
        className={styles.button}
        onClick={() => navTo(POD_SELECTION_ROUTE)}
      >
        Take a <span className={styles.buttonText}>Pea</span>k
      </Button>
    </div>
  </div>
);

Home.propTypes = {
  navTo: func.isRequired
}

export default Home;

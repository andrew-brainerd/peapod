import React from 'react';
import { func } from 'prop-types';
import { useSpring, animated } from 'react-spring';
import logo from '../../img/logo.png';
import Button from '../common/Button/Button';
import { FADE_IN } from '../../constants/animations';
import { MENU_ROUTE } from '../../constants/routes';
import styles from './Home.module.scss';

const Home = ({ navTo }) => {
  const animation = useSpring(FADE_IN);

  return (
    <animated.div className={styles.home} style={animation}>
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
    </animated.div>
  );
}

Home.propTypes = {
  navTo: func.isRequired
}

export default Home;

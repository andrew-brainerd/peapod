import React from 'react';
import { bool, func } from 'prop-types';
import Notification from '../Notification/container';
import { HOME_ROUTE } from '../../../constants/routes';
import Profile from '../../Spotify/Profile/container';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

const Header = ({ isMinimal, navTo }) => (
  <div className={[
    styles.header,
    isMinimal ? styles.minimal : ''
  ].join(' ')}>
    <div className={styles.headerContent}>
      <div className={styles.homeLink} onClick={() => navTo(HOME_ROUTE)}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.headerTitle}>Peapod</div>
      </div>
      <div className={styles.nav}>
        <Profile isMinimal={isMinimal} />
      </div>
    </div>
    <Notification />
  </div>
);

Header.propTypes = {
  isMinimal: bool,
  navTo: func.isRequired
};

export default Header;

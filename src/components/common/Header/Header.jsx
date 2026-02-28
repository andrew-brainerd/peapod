import React from 'react';
import { bool } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import { HOME_ROUTE } from '../../../constants/routes';
import Profile from '../../Spotify/Profile/Profile';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

const Header = ({ isMinimal }) => {
  const navigate = useNavigate();

  return (
    <div className={[
      styles.header,
      isMinimal ? styles.minimal : ''
    ].join(' ')}>
      <div className={styles.headerContent}>
        <div className={styles.homeLink} onClick={() => navigate(HOME_ROUTE)}>
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
};

Header.propTypes = {
  isMinimal: bool
};

export default Header;

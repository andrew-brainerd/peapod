import React from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import { HOME_ROUTE } from '../../../constants/routes';
import Profile from '../../Spotify/Profile/Profile';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

interface HeaderProps {
  isMinimal?: boolean;
}

const Header = ({ isMinimal }: HeaderProps) => {
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

export default Header;

import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import Notification from '../Notification/Notification';
import Profile from '../../Spotify/Profile/Profile';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

interface HeaderProps {
  isMinimal?: boolean;
}

const Header = ({ isMinimal }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={[styles.header, isMinimal ? styles.minimal : ''].join(' ')}>
      <div className={styles.headerContent}>
        <div className={styles.homeLink} onClick={() => navigate({ to: '/' })}>
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

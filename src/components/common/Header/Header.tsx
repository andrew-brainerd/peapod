import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import Notification from '../Notification/Notification';
import Profile from '../../Spotify/Profile/Profile';
import Button from '../Button/Button';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

interface HeaderProps {
  isMinimal?: boolean;
}

const Header = ({ isMinimal }: HeaderProps) => {
  const navigate = useNavigate();
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const signOut = useSpotifyStore((state) => state.signOut);

  return (
    <div className={[styles.header, isMinimal ? styles.minimal : ''].join(' ')}>
      <div className={styles.headerContent}>
        <div className={styles.homeLink} onClick={() => navigate({ to: '/' })}>
          <img src={logo} className={styles.logo} alt="logo" />
          <span className={styles.headerTitle}>Peapod</span>
        </div>
        <div className={styles.nav}>
          <Profile isMinimal={isMinimal} />
          {accessToken && (
            <Button
              className={styles.logoutButton}
              text={'Log Out'}
              onClick={() => {
                signOut();
                navigate({ to: '/' });
              }}
            />
          )}
        </div>
      </div>
      <Notification />
    </div>
  );
};

export default Header;

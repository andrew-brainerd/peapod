import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import type { AppDispatch } from '../../../store/configureStore';
import { getAccessToken, signOut } from '../../../slices/spotify';
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
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = useSelector(getAccessToken);

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
                dispatch(signOut());
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

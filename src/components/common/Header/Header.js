import React from 'react';
import { bool, string, func } from 'prop-types';
import Notification from '../Notification/container';
import Loading from '../Loading/container';
import { MY_PODS_ROUTE, POD_SELECTION_ROUTE } from '../../../constants/routes';
import Button from '../Button/Button';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

const Header = ({ isVisible, pathname, userId, isSignedIn, signOut, navTo }) => {
  const myPodsRoute = MY_PODS_ROUTE.replace(':userId', userId);

  console.log({ isSignedIn, userId });

  return isVisible ? (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.homeLink} onClick={() => navTo(POD_SELECTION_ROUTE)}>
          <img src={logo} className={styles.logo} alt="logo" />
          <div className={styles.headerTitle}>Peapod</div>
        </div>
        <div className={styles.nav}>
          {isSignedIn && userId &&
            <Button
              className={[
                styles.button,
                styles.myPods,
                pathname === myPodsRoute ? styles.selected : ''
              ].join(' ')}
              text={'My Pods'}
              onClick={() => navTo(myPodsRoute)}
            />
          }
          {isSignedIn &&
            <Button
              className={[
                styles.button,
                styles.signOut
              ].join(' ')}
              text={'Sign Out'}
              onClick={signOut}
            />
          }
        </div>
        <div className={styles.appVersion}>
          v{process.env.REACT_APP_VERSION}
        </div>
      </div>
      <Notification />
      <Loading altText='loading' />
    </div>
  ) : null;
};

Header.propTypes = {
  isVisible: bool,
  pathname: string,
  userId: string,
  isSignedIn: bool,
  signOut: func.isRequired,
  navTo: func.isRequired
};

export default Header;

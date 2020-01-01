import React from 'react';
import { bool, func, string } from 'prop-types';
import Notification from '../Notification/container';
import Loading from '../Loading/container';
import { POD_SELECTION_ROUTE, MY_PODS_ROUTE } from '../../../constants/routes';
import Button from '../Button/Button';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

const Header = ({ isVisible, pathname, userId, navTo }) => {
  const myPodsRoute = MY_PODS_ROUTE.replace(':userId', userId);

  return isVisible ? (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.homeLink} onClick={() => navTo(POD_SELECTION_ROUTE)}>
          <img src={logo} className={styles.logo} alt="logo" />
          <div className={styles.headerTitle}>Peapod</div>
        </div>
        <div className={styles.nav}>
          {userId &&
            <Button
              className={[
                styles.myPods,
                pathname === myPodsRoute ? styles.selected : ''
              ].join(' ')}
              text={'My Pods'}
              onClick={() => navTo(myPodsRoute)}
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
  navTo: func.isRequired
};

export default Header;

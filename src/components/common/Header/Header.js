import React from 'react';
import { bool, func, string } from 'prop-types';
import Notification from '../Notification/container';
import Loading from '../Loading/container';
import { POD_SELECTION_ROUTE, MY_PODS_ROUTE } from '../../../constants/routes';
import Button from '../Button/Button';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

const Header = ({ isVisible, navTo, userId }) => isVisible ? (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      <div className={styles.homeLink} onClick={() => navTo(POD_SELECTION_ROUTE)}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.headerTitle}>Peapod</div>
      </div>
      <div className={styles.nav}>
        {userId &&
          <Button
            className={styles.myPods}
            text={'My Pods'}
            onClick={() => navTo(MY_PODS_ROUTE.replace(':userId', userId))}
          />
        }
      </div>
      <div className={styles.appVersion}>
        v{process.env.REACT_APP_VERSION}
      </div>
    </div>
    <Notification />
    <Loading altText='loading' />
    <hr />
  </div>
) : null;

Header.propTypes = {
  isVisible: bool,
  navTo: func.isRequired,
  userId: string
};

export default Header;

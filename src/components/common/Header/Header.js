import React from 'react';
import { bool, func } from 'prop-types';
import Notification from '../Notification/container';
import Loading from '../Loading/container';
import { HOME_ROUTE } from '../../../constants/routes';
import logo from '../../../img/logo.png';
import styles from './Header.module.scss';

const Header = ({ isVisible, navTo, pathname, route }) => isVisible ? (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      <div className={styles.homeLink} onClick={() => navTo(HOME_ROUTE)}>
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.headerTitle}>Peapod</div>
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
  navTo: func.isRequired
}

export default Header;

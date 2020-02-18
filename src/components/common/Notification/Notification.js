import React from 'react';
import { bool, string, func } from 'prop-types';
import styles from './Notification.module.scss';

const Notification = ({ isHidden, message, closeNotification }) => (
  <div
    className={[
      styles.notification,
      isHidden ? styles.hidden : ''
    ].join(' ')}
    onClick={closeNotification}
  >
    {message}
  </div>
);

Notification.propTypes = {
  isHidden: bool,
  message: string,
  closeNotification: func.isRequired
};

export default Notification;

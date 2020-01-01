import React from 'react';
import { bool, string, func } from 'prop-types';
import styles from './Notification.module.scss';

const Notification = ({ closeNotification, hidden, message }) => (
  <div
    className={[
      styles.notification,
      hidden ? styles.hidden : ''
    ].join(' ')}
    onClick={closeNotification}
  >
    {message}
  </div>
);

Notification.propTypes = {
  closeNotification: func.isRequired,
  hidden: bool,
  message: string
};

export default Notification;

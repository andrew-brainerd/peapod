import React from 'react';
import { useNotifyStore } from '../../../stores/notifyStore';
import styles from './Notification.module.scss';

const Notification = () => {
  const isHidden = useNotifyStore((state) => state.hidden);
  const message = useNotifyStore((state) => state.message);
  const closeNotification = useNotifyStore((state) => state.closeNotification);

  return (
    <div
      className={[styles.notification, isHidden ? styles.hidden : ''].join(' ')}
      onClick={closeNotification}
    >
      {message}
    </div>
  );
};

export default Notification;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeNotification } from '../../../slices/notify';
import styles from './Notification.module.scss';

const Notification = () => {
  const dispatch = useDispatch();
  const isHidden = useSelector(state => state.notify.hidden);
  const message = useSelector(state => state.notify.message);

  return (
    <div
      className={[
        styles.notification,
        isHidden ? styles.hidden : ''
      ].join(' ')}
      onClick={() => dispatch(closeNotification())}
    >
      {message}
    </div>
  );
};

export default Notification;

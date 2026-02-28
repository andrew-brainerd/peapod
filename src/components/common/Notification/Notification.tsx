import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeNotification } from '../../../slices/notify';
import type { AppDispatch, RootState } from '../../../store/configureStore';
import styles from './Notification.module.scss';

const Notification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isHidden = useSelector((state: RootState) => state.notify.hidden);
  const message = useSelector((state: RootState) => state.notify.message);

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

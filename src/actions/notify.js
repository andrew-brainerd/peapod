export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const showNotification = message => ({ type: SHOW_NOTIFICATION, message });

export const hideNotification = ({ type: HIDE_NOTIFICATION });

export const displayNotification = (message, time) => async dispatch => {
  const openTime = time || 3000;

  dispatch(showNotification(message));
  setTimeout(() => dispatch(hideNotification), openTime);
};

export const closeNotification = () => async dispatch => {
  dispatch(hideNotification);
};

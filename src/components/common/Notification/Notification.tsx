import React from 'react';
import { useNotifyStore } from '../../../stores/notifyStore';

const Notification = () => {
  const isHidden = useNotifyStore((state) => state.hidden);
  const message = useNotifyStore((state) => state.message);
  const closeNotification = useNotifyStore((state) => state.closeNotification);

  return (
    <div
      className={`bg-tertiary rounded-b-[3px] cursor-pointer left-0 mx-auto max-w-[500px] opacity-100 py-[25px] px-[50px] absolute right-0 top-0 transition-all duration-500 ease-in-out ${isHidden ? 'opacity-0 pointer-events-none' : ''}`}
      onClick={closeNotification}
    >
      {message}
    </div>
  );
};

export default Notification;

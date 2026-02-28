import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDevices as getDevicesSelector, getMyDevices, transferPlayback } from '../../../slices/spotify';
import Icon from '../../common/Icon/Icon';
import styles from './Devices.module.scss';

const getDeviceIcon = ({
  Speaker: <Icon name={'headphones'} />,
  TV: <Icon name={'television'} />,
  Computer: <Icon name={'computer'} />,
  Smartphone: <Icon name={'smartphone'} />,
  Tablet: <Icon name={'headphones'} />
});

const Devices = () => {
  const dispatch = useDispatch();
  const devices = useSelector(getDevicesSelector);

  useEffect(() => {
    dispatch(getMyDevices());
  }, [dispatch]);

  return (
    <div className={styles.devices}>
      <div className={styles.title}>Available Devices</div>
      {Object.values(devices).map(device => {
        const {
          id,
          is_active: isActive,
          is_restricted: isRestricted,
          name,
          type
        } = device;

        return !isRestricted && (
          <div
            key={id}
            className={[
              styles.device,
              isActive ? styles.active : ''
            ].join(' ')}
            onClick={() => {
              if (!isActive) {
                dispatch(transferPlayback([id], true));
                setTimeout(() => dispatch(getMyDevices()), 1500);
              }
            }}
          >
            <div className={styles.deviceType}>
              {getDeviceIcon[type] || <Icon name={'headphones'} />}
            </div>
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default Devices;

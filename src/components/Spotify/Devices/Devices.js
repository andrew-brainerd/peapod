import React, { useEffect } from 'react';
import { array, func } from 'prop-types';
import { values } from 'ramda';
import Icon from '../../common/Icon/Icon';
import styles from './Devices.module.scss';

const getDeviceIcon = ({
  Speaker: <Icon name={'headphones'} />,
  TV: <Icon name={'television'} />,
  Computer: <Icon name={'computer'} />,
  Smartphone: <Icon name={'smartphone'} />,
  Tablet: <Icon name={'headphones'} />
});

const Devices = ({ devices, getDevices, selectDevice }) => {
  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <div className={styles.devices}>
      <div className={styles.title}>Available Devices</div>
      {values(devices).map(device => {
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
                selectDevice(id, true);
                setTimeout(() => getDevices(), 1500);
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

Devices.propTypes = {
  devices: array,
  getDevices: func.isRequired,
  selectDevice: func.isRequired
};

export default Devices;

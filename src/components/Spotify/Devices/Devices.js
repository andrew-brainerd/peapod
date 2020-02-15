import React, { useEffect } from 'react';
import { array, func } from 'prop-types';
import { values } from 'ramda';
import { ReactComponent as SpeakerIcon } from '../../../img/headphones.svg';
import { ReactComponent as TelevisionIcon } from '../../../img/television.svg';
import { ReactComponent as ComputerIcon } from '../../../img/computer.svg';
import { ReactComponent as SmartphoneIcon } from '../../../img/smartphone.svg';
import styles from './Devices.module.scss';

const getDeviceIcon = ({
  Speaker: <SpeakerIcon />,
  TV: <TelevisionIcon />,
  Computer: <ComputerIcon />,
  Smartphone: <SmartphoneIcon />,
  Tablet: <SmartphoneIcon />
});

const Devices = ({ devices, getDevices, selectDevice }) => {
  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <div className={styles.devices}>
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
              {getDeviceIcon[type] || <SpeakerIcon />}
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

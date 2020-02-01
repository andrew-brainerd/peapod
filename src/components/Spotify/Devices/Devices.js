import React, { useEffect } from 'react';
import { array, func } from 'prop-types';
import { values } from 'ramda';
import styles from './Devices.module.scss';

const Devices = ({ devices, getDevices }) => {
  // console.log(devices);

  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <div className={styles.devices}>
      {values(devices).map(device => console.log(device))}
    </div>
  );
};

Devices.propTypes = {
  devices: array,
  getDevices: func.isRequired
};

export default Devices

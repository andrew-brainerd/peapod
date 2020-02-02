import React, { useEffect } from 'react';
import { array, func } from 'prop-types';
import { values } from 'ramda';
import styles from './Devices.module.scss';

const Devices = ({ devices, getDevices }) => {
  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <div className={styles.devices}>
      {values(devices).map((device, d) =>
        <div key={d}>{(device || {}).name}</div>
      )}
    </div>
  );
};

Devices.propTypes = {
  devices: array,
  getDevices: func.isRequired
};

export default Devices;

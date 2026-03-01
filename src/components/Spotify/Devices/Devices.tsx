import React from 'react';
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../../slices/spotify';
import { useDevices, useTransferPlaybackMutation } from '../../../queries/spotify';
import type { SpotifyDevice } from '../../../types';
import Icon from '../../common/Icon/Icon';
import styles from './Devices.module.scss';
import { queryClient } from '../../../queryClient';
import { spotifyKeys } from '../../../queries/keys';

const getDeviceIcon: Record<string, React.ReactNode> = {
  Speaker: <Icon name={'headphones'} />,
  TV: <Icon name={'television'} />,
  Computer: <Icon name={'computer'} />,
  Smartphone: <Icon name={'smartphone'} />,
  Tablet: <Icon name={'headphones'} />
};

const Devices = () => {
  const accessToken = useSelector(getAccessToken);
  const { data: devices = [] } = useDevices(accessToken);
  const transferPlayback = useTransferPlaybackMutation(accessToken);

  return (
    <div className={styles.devices}>
      <div className={styles.title}>Available Devices</div>
      {Object.values(devices as SpotifyDevice[]).map((device: SpotifyDevice) => {
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
                transferPlayback.mutate({ devices: [id], shouldPlay: true }, {
                  onSuccess: () => {
                    setTimeout(() => {
                      queryClient.invalidateQueries({ queryKey: spotifyKeys.devices() });
                    }, 1500);
                  }
                });
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

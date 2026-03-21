import React from 'react';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useDevices, useTransferPlaybackMutation } from '../../../queries/spotify';
import type { SpotifyDevice } from '../../../types';
import Icon from '../../common/Icon/Icon';
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
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const { data: devices = [] } = useDevices(accessToken);
  const transferPlayback = useTransferPlaybackMutation();

  return (
    <div className="flex flex-col m-[25px] max-w-[300px] w-[90%]">
      <div className="text-[1.1em] left-5 pb-[3px] relative underline">Available Devices</div>
      {Object.values(devices as SpotifyDevice[]).map((device: SpotifyDevice) => {
        const { id, is_active: isActive, is_restricted: isRestricted, name, type } = device;

        return (
          !isRestricted && (
            <div
              key={id}
              className={`flex items-center border-b border-transparent p-2.5 transition-all duration-300 select-none ${isActive ? 'text-peapod [&_svg]:fill-peapod' : 'hover:bg-gray-75 hover:cursor-pointer'}`}
              onClick={() => {
                if (!isActive) {
                  transferPlayback.mutate(
                    { devices: [id], shouldPlay: true },
                    {
                      onSuccess: () => {
                        setTimeout(() => {
                          queryClient.invalidateQueries({ queryKey: spotifyKeys.devices() });
                        }, 1500);
                      }
                    }
                  );
                }
              }}
            >
              <div className="w-[50px] [&_svg]:fill-white [&_svg]:h-5 [&_svg]:w-5">{getDeviceIcon[type] || <Icon name={'headphones'} />}</div>
              {name}
            </div>
          )
        );
      })}
    </div>
  );
};

export default Devices;

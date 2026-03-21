import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useNotifyStore } from '../../../stores/notifyStore';
import { useProfile } from '../../../queries/spotify';
import { useCreatePodMutation } from '../../../queries/pods';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';

const CreateNewButton = () => {
  const navigate = useNavigate();
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const displayNotification = useNotifyStore((state) => state.displayNotification);
  const { data: profile } = useProfile(accessToken);
  const createPod = useCreatePodMutation();

  return (
    <Button
      className="shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.2),0_1px_4px_rgba(0,0,0,0.16)] !items-center !bg-gray-80 !border !border-dashed !border-gray-50 !flex !flex-col !gap-2.5 !h-[125px] !justify-center !m-5 transition-[box-shadow] duration-150 !w-[200px] [&_svg]:fill-gray-30 [&_svg]:h-7 [&_svg]:w-7 [&_svg]:transition-[fill] [&_svg]:duration-150 hover:!bg-gray-70 hover:!border-peapod-50 hover:[&_svg]:fill-peapod max-mobile:!w-full max-mobile:!mx-0 max-mobile:!my-2.5"
      disabled={createPod.isPending}
      onClick={() => {
        if (profile) {
          createPod.mutate(profile, {
            onSuccess: pod => {
              navigate({ to: '/pods/$podId', params: { podId: pod._id } });
            },
            onError: () => {
              displayNotification('Failed to create pod. Please try again.', 5000);
            }
          });
        }
      }}
    >
      <Icon name={'add'} title={'Create New Pod'} />
      <span className="text-gray-30 text-[0.95em] transition-colors duration-150 group-hover:text-peapod">Create a Pod</span>
    </Button>
  );
};

export default CreateNewButton;

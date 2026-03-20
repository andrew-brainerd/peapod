import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useNotifyStore } from '../../../stores/notifyStore';
import { useProfile } from '../../../queries/spotify';
import { useCreatePodMutation } from '../../../queries/pods';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import styles from './CreateNewButton.module.scss';

const CreateNewButton = () => {
  const navigate = useNavigate();
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const displayNotification = useNotifyStore((state) => state.displayNotification);
  const { data: profile } = useProfile(accessToken);
  const createPod = useCreatePodMutation();

  return (
    <Button
      className={styles.createNew}
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
      <span className={styles.label}>Create a Pod</span>
    </Button>
  );
};

export default CreateNewButton;

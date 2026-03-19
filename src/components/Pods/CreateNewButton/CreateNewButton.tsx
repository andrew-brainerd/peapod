import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import type { AppDispatch } from '../../../store/configureStore';
import { getAccessToken } from '../../../slices/spotify';
import { displayNotification } from '../../../slices/notify';
import { useProfile } from '../../../queries/spotify';
import { useCreatePodMutation } from '../../../queries/pods';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import styles from './CreateNewButton.module.scss';

const CreateNewButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);
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
              dispatch(displayNotification('Failed to create pod. Please try again.', 5000));
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

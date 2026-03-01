import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { getAccessToken } from '../../../slices/spotify';
import { useProfile } from '../../../queries/spotify';
import { useCreatePodMutation } from '../../../queries/pods';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import styles from './CreateNewButton.module.scss';

const CreateNewButton = () => {
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);
  const { data: profile } = useProfile(accessToken);
  const createPod = useCreatePodMutation();

  return (
    <Button
      className={styles.createNew}
      onClick={() => {
        if (profile) {
          createPod.mutate(profile, {
            onSuccess: (pod) => {
              navigate({ to: '/pods/$podId', params: { podId: pod._id } });
            }
          });
        }
      }}
    >
      <Icon name={'add'} title={'Create New Pod'} />
    </Button>
  );
};

export default CreateNewButton;

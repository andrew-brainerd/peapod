import React, { useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useProfile } from '../../../queries/spotify';
import { useAddMemberMutation } from '../../../queries/pods';
import Loading from '../../common/Loading/Loading';
import styles from './Invite.module.scss';

const Invite = () => {
  const navigate = useNavigate();
  const { podId } = useParams({ strict: false }) as { podId: string };
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const { data: profile } = useProfile(accessToken);
  const addMember = useAddMemberMutation();

  useEffect(() => {
    if (podId && profile) {
      addMember.mutate(
        { podId, user: profile },
        {
          onSuccess: () => {
            navigate({ to: '/pods/$podId', params: { podId } });
          },
          onError: () => {
            navigate({ to: '/pods/$podId', params: { podId } });
          }
        }
      );
    }
  }, [podId, profile]);

  return (
    <div className={styles.invite}>
      <Loading altText="Joining pod..." />
      <p>Joining pod...</p>
    </div>
  );
};

export default Invite;

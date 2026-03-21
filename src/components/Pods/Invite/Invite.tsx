import React, { useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import { useProfile } from '../../../queries/spotify';
import { useAddMemberMutation } from '../../../queries/pods';
import Loading from '../../common/Loading/Loading';

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
    <div className="flex items-center text-text-primary flex-col text-[1.2em] gap-5 justify-center min-h-[50vh]">
      <Loading altText="Joining pod..." />
      <p>Joining pod...</p>
    </div>
  );
};

export default Invite;

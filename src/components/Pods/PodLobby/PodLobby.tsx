import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/configureStore';
import { useParams, useNavigate } from '@tanstack/react-router';
import { isDefined } from '../../../utils/validation';
import type { SpotifyTrack, Artist } from '../../../types';
import { MEMBER_ADDED, LAUNCH_GAME } from '../../../constants/sync';
import { getAccessToken } from '../../../slices/spotify';
import { connectToPusher, triggerUpdate } from '../../../slices/sync';
import { useProfile } from '../../../queries/spotify';
import { usePod, useAddMemberMutation, useLaunchPodMutation } from '../../../queries/pods';
import Header from '../../common/Header/Header';
import Button from '../../common/Button/Button';
import Icon from '../../common/Icon/Icon';
import InviteModal from '../Pod/InviteModal/InviteModal';
import styles from './PodLobby.module.scss';

const PodLobby = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { podId } = useParams({ strict: false }) as { podId: string };
  const navigate = useNavigate();
  const accessToken = useSelector(getAccessToken);
  const { data: profile } = useProfile(accessToken);
  const userId = profile?.id;
  const { data: pod } = usePod(podId);
  const addMember = useAddMemberMutation();
  const launchPod = useLaunchPodMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const podMembers = pod?.members ?? [];
  const podCreatorId = pod?.createdBy?.id;

  useEffect(() => {
    if (isDefined(podId) && !!userId) {
      dispatch(connectToPusher(podId!, MEMBER_ADDED, triggerUpdate));
    }
  }, [podId, userId, dispatch]);

  useEffect(() => {
    if (isDefined(podId) && !!userId) {
      dispatch(
        connectToPusher(podId!, LAUNCH_GAME, () =>
          navigate({ to: '/pods/$podId/search', params: { podId: podId! } })
        )
      );
    }
  }, [podId, userId, dispatch, navigate]);

  useEffect(() => {
    if (isDefined(podId) && !!userId && profile) {
      addMember.mutate({ podId: podId!, user: profile });
    }
  }, [podId, userId]);

  const podQueue = pod?.queue ?? [];

  return (
    <>
      <Header />
      <Button className={styles.inviteIconContainer} onClick={() => setIsModalOpen(true)}>
        <span className={styles.inviteText}>Invite Friends</span>
        <Icon className={styles.inviteIcon} name={'invite'} title={'Invite People'} />
      </Button>
      <div className={styles.podLobby}>
        <div className={styles.podMembers}>
          {podMembers.map(({ display_name: name }: { display_name: string }, p: number) => (
            <div key={p} className={styles.podMember}>
              {name}
            </div>
          ))}
        </div>
        {podQueue.length > 0 && (
          <div className={styles.nowPlaying}>
            <h3 className={styles.nowPlayingTitle}>Up Next</h3>
            <div className={styles.trackList}>
              {podQueue.map((track: SpotifyTrack) => (
                <div key={track.uri} className={styles.track}>
                  {track.album.images?.[0] && (
                    <img
                      className={styles.trackImage}
                      src={track.album.images[0].url}
                      alt={track.album.name ?? track.name}
                    />
                  )}
                  <div className={styles.trackInfo}>
                    <div className={styles.trackName}>{track.name}</div>
                    <div className={styles.trackArtist}>
                      {track.artists.map((a: Artist) => a.name).join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {userId === podCreatorId && (
          <Button
            className={styles.launchButton}
            text={'Launch Pod'}
            onClick={() => launchPod.mutate(podId!)}
            disabled={podMembers.length < 2}
          />
        )}
      </div>
      <InviteModal isOpen={isModalOpen} podId={podId} closeModal={() => setIsModalOpen(false)} />
    </>
  );
};

export default PodLobby;

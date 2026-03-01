import { useQuery, useMutation } from '@tanstack/react-query';
import * as podsApi from '../api/pods';
import { podKeys } from './keys';
import { queryClient } from '../queryClient';
import type { SpotifyProfile, SpotifyTrack } from '../types';

export const usePods = (options?: Record<string, string | number>) =>
  useQuery({
    queryKey: podKeys.list(options),
    queryFn: () => podsApi.getPods(options)
  });

export const usePod = (podId: string | undefined) =>
  useQuery({
    queryKey: podKeys.detail(podId ?? ''),
    queryFn: () => podsApi.getPod(podId!),
    enabled: !!podId,
    refetchInterval: 5000
  });

export const useCreatePodMutation = () =>
  useMutation({
    mutationFn: (profile: SpotifyProfile) => podsApi.createPod(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: podKeys.all });
    }
  });

export const useAddMemberMutation = () =>
  useMutation({
    mutationFn: ({ podId, user }: { podId: string; user: SpotifyProfile }) =>
      podsApi.addMemberToPod(podId, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: podKeys.all });
    }
  });

export const useAddToQueueMutation = (podId: string | undefined) =>
  useMutation({
    mutationFn: (track: SpotifyTrack) => podsApi.addToPlayQueue(podId!, track),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: podKeys.detail(podId ?? '') });
    }
  });

export const useRemoveFromQueueMutation = (podId: string | undefined) =>
  useMutation({
    mutationFn: (track: SpotifyTrack) => podsApi.removeFromPlayQueue(podId!, track),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: podKeys.detail(podId ?? '') });
    }
  });

export const useAddToHistoryMutation = (podId: string | undefined) =>
  useMutation({
    mutationFn: (track: SpotifyTrack) => podsApi.addToPlayHistory(podId!, track),
    onSuccess: (_, track) => {
      podsApi.removeFromPlayQueue(podId!, track);
      queryClient.invalidateQueries({ queryKey: podKeys.detail(podId ?? '') });
    }
  });

export const useLaunchPodMutation = () =>
  useMutation({
    mutationFn: (podId: string) => podsApi.launchPod(podId)
  });

export const useConnectToPodMutation = () =>
  useMutation({
    mutationFn: ({ podId, user }: { podId: string; user: SpotifyProfile }) =>
      podsApi.addActiveMemberToPod(podId, user)
  });

export const useSendInvitationMutation = () =>
  useMutation({
    mutationFn: ({ podId, messageType, to }: { podId: string; messageType: string; to: string }) =>
      podsApi.sendInvitation(podId, messageType, to)
  });

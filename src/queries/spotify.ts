import { useQuery, useMutation } from '@tanstack/react-query';
import * as spotifyApi from '../api/spotify';
import { spotifyKeys } from './keys';
import { queryClient } from '../queryClient';

export const useProfile = (token: string | null) =>
  useQuery({
    queryKey: spotifyKeys.profile(),
    queryFn: () => spotifyApi.getProfile(),
    enabled: !!token
  });

export const useTopTracks = (token: string | null) =>
  useQuery({
    queryKey: spotifyKeys.topTracks(),
    queryFn: () => spotifyApi.getMyTopTracks(),
    enabled: !!token
  });

export const useDevices = (token: string | null) =>
  useQuery({
    queryKey: spotifyKeys.devices(),
    queryFn: () => spotifyApi.getMyDevices(),
    enabled: !!token
  });

export const useNowPlaying = (token: string | null, isPodOwner: boolean) =>
  useQuery({
    queryKey: spotifyKeys.nowPlaying(),
    queryFn: () => spotifyApi.getMyNowPlaying(),
    enabled: !!token && isPodOwner,
    refetchInterval: isPodOwner ? 5000 : false
  });

export const useSearch = (token: string | null, debouncedText: string) =>
  useQuery({
    queryKey: spotifyKeys.search(debouncedText),
    queryFn: () => {
      if (debouncedText === '') {
        return spotifyApi.getMyTopTracks();
      }
      return spotifyApi
        .search(debouncedText, ['track'])
        .then(({ tracks }: { tracks?: unknown }) => tracks);
    },
    enabled: !!token
  });

export const usePlaylists = (token: string | null, userId: string | undefined) =>
  useQuery({
    queryKey: spotifyKeys.playlists(userId ?? ''),
    queryFn: () => spotifyApi.getMyPlaylists(userId!),
    enabled: !!token && !!userId
  });

export const usePlayMutation = () =>
  useMutation({
    mutationFn: (options?: { uris?: string[] }) => spotifyApi.play(options),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: spotifyKeys.nowPlaying() });
      }, 1000);
    }
  });

export const usePauseMutation = () =>
  useMutation({
    mutationFn: () => spotifyApi.pause(),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: spotifyKeys.nowPlaying() });
      }, 1000);
    }
  });

export const useTransferPlaybackMutation = () =>
  useMutation({
    mutationFn: ({ devices, shouldPlay }: { devices: string[]; shouldPlay?: boolean }) =>
      spotifyApi.transferPlayback(devices, shouldPlay),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: spotifyKeys.nowPlaying() });
    }
  });

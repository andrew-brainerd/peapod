import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterTestWrapper } from '../../../test/helpers';
import { useSpotifyStore } from '../../../stores/spotifyStore';
import PodLobby from './PodLobby';

beforeEach(() => {
  useSpotifyStore.setState({ accessToken: null, refreshToken: null, expireTime: null });
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    status: 200,
    json: () => Promise.resolve({})
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PodLobby Component', () => {
  it('should render', async () => {
    render(
      <RouterTestWrapper component={PodLobby} initialPath="/pods/12345" routePath="/pods/$podId" />
    );

    await waitFor(() => {
      expect(screen.getByText('Invite Friends')).toBeInTheDocument();
    });
  });
});

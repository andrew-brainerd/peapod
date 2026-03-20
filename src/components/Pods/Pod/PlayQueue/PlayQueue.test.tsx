import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../../../test/helpers';
import { useSpotifyStore } from '../../../../stores/spotifyStore';
import type { SpotifyTrack } from '../../../../types';
import PlayQueue from './PlayQueue';

describe('PlayQueue Component', () => {
  beforeEach(() => {
    useSpotifyStore.setState({ accessToken: null, refreshToken: null, expireTime: null });
  });

  it('should render', () => {
    const queryClient = createTestQueryClient();

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <PlayQueue height={1000} currentTrack={{} as SpotifyTrack} podId="12345" />
      </QueryClientProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

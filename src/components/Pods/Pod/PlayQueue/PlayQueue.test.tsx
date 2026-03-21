import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../../../test/helpers';
import { useSpotifyStore } from '../../../../stores/spotifyStore';
import PlayQueue from './PlayQueue';

describe('PlayQueue Component', () => {
  beforeEach(() => {
    useSpotifyStore.setState({ accessToken: null, refreshToken: null, expireTime: null });
  });

  it('should render', () => {
    const queryClient = createTestQueryClient();

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <PlayQueue podId="12345" />
      </QueryClientProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../../../test/helpers';
import type { SpotifyTrack } from '../../../../types';
import PlayHistory from './PlayHistory';

describe('PlayHistory Component', () => {
  it('should render', () => {
    const queryClient = createTestQueryClient();

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <PlayHistory height={1000} currentTrack={{} as SpotifyTrack} podId="12345" />
      </QueryClientProvider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

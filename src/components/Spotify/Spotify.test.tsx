import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { createTestQueryClient } from '../../test/helpers';
import { useSpotifyStore } from '../../stores/spotifyStore';
import { router } from '../../router';

describe('Auth Guard (AuthenticatedLayout)', () => {
  beforeEach(() => {
    useSpotifyStore.setState({ accessToken: null, refreshToken: null, expireTime: null });
  });

  it('should render the app', async () => {
    const queryClient = createTestQueryClient();

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

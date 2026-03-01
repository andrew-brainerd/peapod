import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTestQueryClient } from '../../../../test/helpers';
import type { SpotifyTrack } from '../../../../types';
import PlayQueue from './PlayQueue';

const mockStore = configureStore({
  reducer: () => ({
    spotify: { accessToken: null, refreshToken: null, expireTime: null }
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('PlayQueue Component', () => {
  it('should render', () => {
    const queryClient = createTestQueryClient();

    const { container } = render(
      <Provider store={mockStore}>
        <QueryClientProvider client={queryClient}>
          <PlayQueue height={1000} currentTrack={{} as SpotifyTrack} podId="12345" />
        </QueryClientProvider>
      </Provider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

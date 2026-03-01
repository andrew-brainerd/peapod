import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { createTestQueryClient } from '../../test/helpers';
import { router } from '../../router';

const createStore = (overrides = {}) => configureStore({
  reducer: {
    spotify: () => ({ accessToken: null, refreshToken: null, expireTime: null, ...overrides }),
    notify: () => ({ hidden: true, message: '' }),
    pods: () => ({ isConnected: false, isConnecting: false, currentPod: null }),
    sync: () => ({ isSyncing: false })
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('Auth Guard (AuthenticatedLayout)', () => {
  it('should render the app', async () => {
    const queryClient = createTestQueryClient();

    const { container } = render(
      <Provider store={createStore()}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RouterTestWrapper } from '../../../test/helpers';
import PodLobby from './PodLobby';

const mockStore = configureStore({
  reducer: () => ({
    pods: { isConnected: false, isConnecting: false, currentPod: null },
    spotify: { accessToken: null, refreshToken: null, expireTime: null },
    sync: { isSyncing: false },
    notify: { hidden: true, message: '' }
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

beforeEach(() => {
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
      <Provider store={mockStore}>
        <RouterTestWrapper component={PodLobby} initialPath="/pods/12345" routePath="/pods/$podId" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Invite Friends')).toBeInTheDocument();
    });
  });
});

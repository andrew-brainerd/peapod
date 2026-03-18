import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RouterTestWrapper } from '../../../test/helpers';
import CreateNewButton from './CreateNewButton';

const mockStore = configureStore({
  reducer: {
    spotify: () => ({ accessToken: null, refreshToken: null, expireTime: null }),
    pods: () => ({ isConnected: false, isConnecting: false, currentPod: null }),
    notify: () => ({ hidden: true, message: '' })
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});

describe('CreateNewButton Component', () => {
  it('should render', async () => {
    render(
      <Provider store={mockStore}>
        <RouterTestWrapper component={CreateNewButton} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTitle('Create New Pod')).toBeInTheDocument();
    });
  });
});

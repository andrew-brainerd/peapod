import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RouterTestWrapper } from '../../test/helpers';
import Home from './Home';

const mockStore = configureStore({
  reducer: {
    spotify: () => ({ accessToken: null, refreshToken: null, expireTime: null })
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('Home Component', () => {
  it('should render', async () => {
    render(
      <Provider store={mockStore}>
        <RouterTestWrapper component={Home} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Peapod')).toBeInTheDocument();
    });
  });

  it('should render the logo', async () => {
    render(
      <Provider store={mockStore}>
        <RouterTestWrapper component={Home} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByAltText('Peapod Logo')).toBeInTheDocument();
    });
  });
});

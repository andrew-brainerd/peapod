import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { RouterTestWrapper } from '../../../test/helpers';
import Header from './Header';

const mockStore = configureStore({
  reducer: () => ({
    spotify: { accessToken: null, refreshToken: null, expireTime: null },
    notify: { hidden: true, message: '' }
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

const HeaderWrapper = () => <Header isMinimal={false} />;

describe('Header Component', () => {
  it('should render', async () => {
    render(
      <Provider store={mockStore}>
        <RouterTestWrapper component={HeaderWrapper} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Peapod')).toBeInTheDocument();
    });
  });
});

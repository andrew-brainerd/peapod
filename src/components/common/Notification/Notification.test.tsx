import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notification from './Notification';

const mockStore = configureStore({
  reducer: {
    notify: () => ({ hidden: false, message: 'Test message' })
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('Notification Component', () => {
  it('should render', () => {
    render(
      <Provider store={mockStore}>
        <Notification />
      </Provider>
    );

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });
});

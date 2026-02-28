import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import InviteModal from './InviteModal';

const mockStore = configureStore({
  reducer: {
    pods: () => ({}),
    spotify: () => ({}),
    notify: () => ({ hidden: true, message: '' })
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('InviteModal Component', () => {
  it('should render when open', () => {
    render(
      <Provider store={mockStore}>
        <InviteModal
          isOpen={true}
          podId="12345"
          podName="Pod"
          closeModal={vi.fn()}
        />
      </Provider>
    );

    expect(screen.getByText('Invite')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
  });
});

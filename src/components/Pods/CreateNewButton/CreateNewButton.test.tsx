import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import CreateNewButton from './CreateNewButton';

const mockStore = configureStore({
  reducer: {
    pods: () => ({ isCreatingPod: false, createdPod: null }),
    spotify: () => ({}),
    notify: () => ({ hidden: true, message: '' })
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('CreateNewButton Component', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreateNewButton />
        </MemoryRouter>
      </Provider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

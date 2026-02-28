import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const mockStore = configureStore({
  reducer: {
    spotify: () => ({}),
    notify: () => ({ hidden: true, message: '' }),
    pods: () => ({}),
    sync: () => ({ isSyncing: false })
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('App Component', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

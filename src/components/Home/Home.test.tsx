import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const mockStore = configureStore({
  reducer: {
    spotify: () => ({ profile: { id: '12345' } }),
    notify: () => ({ hidden: true, message: '' })
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('Home Component', () => {
  it('should render', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Peapod')).toBeInTheDocument();
  });

  it('should render the logo', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText('Peapod Logo')).toBeInTheDocument();
  });
});

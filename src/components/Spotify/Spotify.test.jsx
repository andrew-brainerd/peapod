import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Spotify from './Spotify';

const createStore = (overrides = {}) => configureStore({
  reducer: {
    spotify: () => ({ accessToken: null, ...overrides }),
    notify: () => ({ hidden: true, message: '' })
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('Spotify Component', () => {
  it('should render login button when auth not present', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/path']}>
          <Spotify>
            <div>Some Spotify Content</div>
          </Spotify>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Spotify Login')).toBeInTheDocument();
  });

  it('should render children when auth present', () => {
    render(
      <Provider store={createStore({ accessToken: 'test-token' })}>
        <MemoryRouter initialEntries={['/path']}>
          <Spotify>
            <div>Some Spotify Content</div>
          </Spotify>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Some Spotify Content')).toBeInTheDocument();
  });

  it('should render children on home page', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Spotify>
            <div>Some Spotify Content</div>
          </Spotify>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Some Spotify Content')).toBeInTheDocument();
  });
});

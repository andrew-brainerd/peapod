import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

const mockStore = configureStore({
  reducer: () => ({
    spotify: {},
    notify: { hidden: true, message: '' }
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('Header Component', () => {
  it('should render', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header isMinimal={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Peapod')).toBeInTheDocument();
  });
});

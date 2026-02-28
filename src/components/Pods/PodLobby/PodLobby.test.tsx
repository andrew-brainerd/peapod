import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PodLobby from './PodLobby';

const mockStore = configureStore({
  reducer: () => ({
    pods: { currentPod: null },
    spotify: {},
    sync: { isSyncing: false },
    notify: { hidden: true, message: '' }
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

beforeEach(() => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    status: 200,
    json: () => Promise.resolve({})
  } as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PodLobby Component', () => {
  it('should render', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/pods/12345']}>
          <Routes>
            <Route path="/pods/:podId" element={<PodLobby />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Invite Friends')).toBeInTheDocument();
  });
});

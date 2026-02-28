import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PlayQueue from './PlayQueue';

const mockStore = configureStore({
  reducer: () => ({
    pods: { currentPod: { queue: [] } },
    spotify: {}
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('PlayQueue Component', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <PlayQueue height={1000} currentTrack={{}} />
      </Provider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

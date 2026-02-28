import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PlayHistory from './PlayHistory';

const mockStore = configureStore({
  reducer: () => ({
    pods: { currentPod: { history: [{ name: 'Keanu Reeves', artists: [{ name: 'Logic' }] }] } }
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

describe('PlayHistory Component', () => {
  it('should render', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <PlayHistory height={1000} currentTrack={{}} />
      </Provider>
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});

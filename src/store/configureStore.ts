import { configureStore } from '@reduxjs/toolkit';
import notify from '../slices/notify';
import pods from '../slices/pods';
import spotify from '../slices/spotify';
import sync from '../slices/sync';

export default function createStore() {
  return configureStore({
    reducer: {
      notify,
      pods,
      spotify,
      sync
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });
}

const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

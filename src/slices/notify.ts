import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store/configureStore';

interface NotifyState {
  hidden: boolean;
  message: string;
}

const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    hidden: true,
    message: 'The platypus is only found in eastern Australia in small rivers and streams within the states of Queensland, New South Wales, Victoria and Tasmania.'
  } as NotifyState,
  reducers: {
    showNotification (state, action: PayloadAction<string>) {
      state.hidden = false;
      state.message = action.payload;
    },
    hideNotification (state) {
      state.hidden = true;
    }
  }
});

export const { showNotification, hideNotification } = notifySlice.actions;

export const displayNotification = (message: string, time?: number) => (dispatch: AppDispatch) => {
  const openTime = time || 3000;
  dispatch(showNotification(message));
  setTimeout(() => dispatch(hideNotification()), openTime);
};

export const closeNotification = () => (dispatch: AppDispatch) => {
  dispatch(hideNotification());
};

export default notifySlice.reducer;

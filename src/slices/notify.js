import { createSlice } from '@reduxjs/toolkit';

const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    hidden: true,
    message: 'The platypus is only found in eastern Australia in small rivers and streams within the states of Queensland, New South Wales, Victoria and Tasmania.'
  },
  reducers: {
    showNotification (state, action) {
      state.hidden = false;
      state.message = action.payload;
    },
    hideNotification (state) {
      state.hidden = true;
    }
  }
});

export const { showNotification, hideNotification } = notifySlice.actions;

export const displayNotification = (message, time) => dispatch => {
  const openTime = time || 3000;
  dispatch(showNotification(message));
  setTimeout(() => dispatch(hideNotification()), openTime);
};

export const closeNotification = () => dispatch => {
  dispatch(hideNotification());
};

export default notifySlice.reducer;

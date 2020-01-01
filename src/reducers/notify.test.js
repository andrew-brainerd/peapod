import {
  showNotification,
  hideNotification
} from '../actions/notify';
import reducer from './notify';

describe('Notify Reducer', () => {
  it('should return the default state', () => {
    const initialState = {};
    const action = { type: 'NONEXISTENT' };
    const newState = reducer(initialState, action);

    expect(typeof newState).toEqual('object');
  });

  describe('SHOW_NOTIFICATION', () => {
    it('should set hidden to false and message to the given string', () => {
      const initialState = {
        hidden: true,
        message: null
      };

      const message = 'notification';

      const expectedState = {
        hidden: false,
        message
      };

      const action = showNotification(message);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('HIDE_NOTIFICATION', () => {
    it('should set hidden to true', () => {
      const initialState = {
        hidden: false
      };

      const expectedState = {
        hidden: true
      };

      const action = hideNotification;

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});

import { SET_CONNECTING, SET_SYNCING } from '../actions/sync';

const initialState = {
  isSyncing: false
};

export default function sync (state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTING:
      return {
        isConnecting: action.isConnecting
      };
    case SET_SYNCING:
      return {
        ...state,
        isSyncing: action.isSyncing,
        isConnecting: action.isSyncing ? false : state.isConnecting
      };
    default:
      return state;
  }
}

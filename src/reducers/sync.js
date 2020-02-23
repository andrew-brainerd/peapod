import { SET_SYNCING } from '../actions/sync';

const initialState = {
  isSyncing: false
};

export default function sync (state = initialState, action) {
  switch (action.type) {
    case SET_SYNCING:
      return {
        ...state,
        isSyncing: action.isSyncing
      };
    default:
      return state;
  }
}

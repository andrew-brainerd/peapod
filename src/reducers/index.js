import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notify from './notify';
import pods from './pods';
import spotify from './spotify';
import sync from './sync';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  notify,
  pods,
  spotify,
  sync
});

export default rootReducer;

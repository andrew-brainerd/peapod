import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notify from './notify';
import pods from './pods';
import user from './user';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  notify,
  pods,
  user
});

export default rootReducer;

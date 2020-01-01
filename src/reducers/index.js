import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notify from './notify';
import pods from './pods';
import users from './users';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  notify,
  pods,
  users
});

export default rootReducer;

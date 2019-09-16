import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notify from './notify';
import users from './users';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  notify,
  users
});

export default rootReducer;

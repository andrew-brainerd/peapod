import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notify from './notify';
import pods from './pods';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  notify,
  pods
});

export default rootReducer;

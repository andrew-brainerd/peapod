import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import notify from './notify';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  notify
});

export default rootReducer;

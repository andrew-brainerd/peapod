import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const history = createBrowserHistory();

export default function configureStore (initialState) {
  return createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(
      routerMiddleware(history),
      thunk
    ))
  );
};

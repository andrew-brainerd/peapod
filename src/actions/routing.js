import { push } from 'connected-react-router';

export const navTo = path => async dispatch => {
  dispatch(push(path));
};

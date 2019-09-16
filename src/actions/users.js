import * as users from '../api/users';

export const PREFIX = 'ADMIN';

export const CREATING_USER = `${PREFIX}/CREATING_USER`;
export const CREATING_USER_FAILED = `${PREFIX}/CREATING_USER_FAILED`;
export const USER_CREATED = `${PREFIX}/USER_CREATED`;

export const creatingUser = ({ type: CREATING_USER });

export const creatingUserFailed = error => ({ type: CREATING_USER_FAILED, error });

export const userCreated = user => ({ type: USER_CREATED, user });

export const createUser = (email, password) => async dispatch => {
  dispatch(creatingUser);
  users.createUser(email, password).then(
    user => {
      if (user.error) {
        return dispatch(creatingUserFailed(user.error))
      }
      return dispatch(userCreated(user))
    });
}

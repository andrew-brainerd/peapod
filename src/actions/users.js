import * as users from '../api/users';

export const PREFIX = 'ADMIN/';

export const CREATING_USER = `${PREFIX}/CREATE_USER`;
export const USER_CREATED = `${PREFIX}/USER_CREATED`;

export const creatingUser = ({ type: CREATING_USER });

export const userCreated = user => ({ type: USER_CREATED, user });

export const createUser = (email, password) => async dispatch => {
  dispatch(creatingUser);
  users.createUser(email, password).then(
    user => dispatch(userCreated, user)
  );
}

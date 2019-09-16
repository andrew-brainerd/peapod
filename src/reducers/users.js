import { CREATING_USER, CREATING_USER_FAILED, USER_CREATED } from '../actions/users';

const initialState = {
  isCreatingUser: true,
  user: null
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case CREATING_USER:
      return {
        ...state,
        isCreatingUser: true
      }
    case CREATING_USER_FAILED:
      return {
        ...state,
        isCreatingUser: false,
        createUserError: action.error
      }
    case USER_CREATED:
      return {
        ...state,
        isCreatingUser: false,
        user: action.user,
        createUserError: null
      }
    default:
      return state;
  }
}

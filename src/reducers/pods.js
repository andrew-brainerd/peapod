import {
  CREATING_POD,
  POD_CREATED
} from '../actions/pods';

const initialState = {
  isCreatingPod: false
};

export default function pods(state = initialState, action) {
  switch (action.type) {
    case CREATING_POD:
      return {
        ...state,
        isCreatingPod: true
      }
    case POD_CREATED:
      return {
        ...state,
        isCreatingPod: false,
        createdPod: action.pod
      }
    default:
      return state;
  }
}

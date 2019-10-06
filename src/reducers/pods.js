import {
  CREATING_POD,
  POD_CREATED,
  LOADING_PODS,
  PODS_LOADED
} from '../actions/pods';

const initialState = {
  isCreatingPod: false,
  isLoadingPods: false,
  items: []
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
    case LOADING_PODS:
      return {
        ...state,
        isLoadingPods: true
      }
    case PODS_LOADED:
      return {
        ...state,
        isLoadingPods: false,
        ...action.pods
      }
    default:
      return state;
  }
}

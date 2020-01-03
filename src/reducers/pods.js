import {
  CREATING_POD,
  POD_CREATED,
  LOADING_PODS,
  PODS_LOADED,
  ADDING_MEMBER_TO_POD,
  ADDED_MEMBER_TO_POD,
  REMOVING_MEMBER_FROM_POD,
  REMOVED_MEMBER_FROM_POD
} from '../actions/pods';

const initialState = {
  isCreatingPod: false,
  isLoadingPods: false,
  isAddingMember: false,
  isRemovingMember: false,
  items: []
};

export default function pods (state = initialState, action) {
  switch (action.type) {
    case CREATING_POD:
      return {
        ...state,
        isCreatingPod: true
      };
    case POD_CREATED:
      return {
        ...state,
        isCreatingPod: false,
        createdPod: action.pod
      };
    case LOADING_PODS:
      return {
        ...state,
        isLoadingPods: true,
        items: []
      };
    case PODS_LOADED:
      return {
        ...state,
        isLoadingPods: false,
        ...action.pods
      };
    case ADDING_MEMBER_TO_POD:
      return {
        ...state,
        isAddingMember: true
      };
    case ADDED_MEMBER_TO_POD:
      return {
        ...state,
        isAddingMember: false
      };
    case REMOVING_MEMBER_FROM_POD:
      return {
        ...state,
        isRemovingMember: true
      };
    case REMOVED_MEMBER_FROM_POD:
      return {
        ...state,
        isRemovingMember: false
      };
    default:
      return state;
  }
}

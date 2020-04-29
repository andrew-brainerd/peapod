import {
  CREATING_POD,
  POD_CREATED,
  LOADING_PODS,
  PODS_LOADED,
  LOADING_POD,
  POD_LOADED,
  OPEN_INVITE_MODAL,
  CLOSE_INVITE_MODAL,
  ADDING_MEMBER_TO_POD,
  ADDED_MEMBER_TO_POD,
  REMOVING_MEMBER_FROM_POD,
  REMOVED_MEMBER_FROM_POD,
  CONNECTING_CLIENT,
  CLIENT_CONNECTED,
  TRIGGER_UPDATE
} from '../actions/pods';

const initialState = {
  isCreatingPod: false,
  isLoadingPods: false,
  isAddingMember: false,
  isRemovingMember: false,
  isInviteModalOpen: false,
  isConnected: false,
  items: [],
  currentPod: null,
  hasUpdates: false
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
    case LOADING_POD:
      return {
        ...state,
        isLoadingPod: true
      };
    case POD_LOADED:
      return {
        ...state,
        isLoadingPod: false,
        currentPod: action.pod,
        hasUpdates: false
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
    case OPEN_INVITE_MODAL:
      return {
        ...state,
        isInviteModalOpen: true
      };
    case CLOSE_INVITE_MODAL:
      return {
        ...state,
        isInviteModalOpen: false
      };
    case CONNECTING_CLIENT:
      return {
        ...state,
        isConnecting: true,
        isConnected: false
      };
    case CLIENT_CONNECTED:
      return {
        ...state,
        isConnecting: false,
        isConnected: true
      };
    case TRIGGER_UPDATE:
      return {
        ...state,
        hasUpdates: true
      };
    default:
      return state;
  }
}

import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/notify';

const initialState = {
  hidden: true,
  message: 'The platypus is only found in eastern Australia in small rivers and streams within the states of Queensland, New South Wales, Victoria and Tasmania.'
};

export default function notify (state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        hidden: false,
        message: action.message
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        hidden: true
      };
    default:
      return state;
  }
};

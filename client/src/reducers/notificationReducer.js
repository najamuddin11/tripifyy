import {
  GET_USER_NOTIFICATION,
  GET_AGENCY_NOTIFICATION,
} from "../actions/types";

const initialState = {
  notification: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case GET_AGENCY_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };

    default:
      return state;
  }
}

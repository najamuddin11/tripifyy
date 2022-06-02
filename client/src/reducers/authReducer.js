import { SET_CURRENT_USER, SET_CURRENT_AGENCY } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  isAuthenticated: false,
  isAgency: false,
  agency: {},
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case SET_CURRENT_AGENCY:
      return {
        ...state,
        isAgency: !isEmpty(action.payload),
        agency: action.payload,
      };
    default:
      return state;
  }
};

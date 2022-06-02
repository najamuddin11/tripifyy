import {
  GET_AGENCY_PROFILE,
  AGENCY_PROFILE_LOADING,
  CLEAR_CURRENT_AGENCY_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AGENCY_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_AGENCY_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_AGENCY_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};

import axios from "axios";

import {
  GET_AGENCY_PROFILE,
  AGENCY_PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_AGENCY_PROFILE,
} from "./types";
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/agencyprofile")
    .then((res) => {
      dispatch({
        type: GET_AGENCY_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_AGENCY_PROFILE,
        payload: {},
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: AGENCY_PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_AGENCY_PROFILE,
  };
};
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/agencyprofile", profileData)
    .then((res) => history.push("/agency/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

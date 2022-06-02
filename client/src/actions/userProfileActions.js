import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES,
} from "./types";
export const getCurrentProfile = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/userprofile")
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
export const createProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/userprofile", profileData)
    .then((res) => {
      history.push("/user/dashboard");
      history.push("/user/dashboard");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const getUserProfiles = () => (dispatch) => {
  dispatch(setProfileLoading());
  axios
    .get("/api/userprofile/all")
    .then((res) => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_PROFILES,
        payload: {},
      });
    });
};

export const getUserProfile = (id) => (dispatch) => {
  axios
    .get(`/api/userprofile/user/${id}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

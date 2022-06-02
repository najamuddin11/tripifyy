import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, SET_CURRENT_AGENCY } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/user/login"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      //console.log(token)

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
      history.push("/user/dashboard");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  history.push("/");
};

//agency

export const registerAgency = (agencyData, history) => (dispatch) => {
  axios
    .post("/api/agency/register", agencyData)
    .then((res) => history.push("/agency/login"))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginAgency = (agencyData, history) => (dispatch) => {
  axios
    .post("/api/agency/login", agencyData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      console.log(token);
      const decoded = jwt_decode(token);

      dispatch(setCurrentAgency(decoded));
      history.push("/agency/dashboard");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentAgency = (decoded) => {
  return {
    type: SET_CURRENT_AGENCY,
    payload: decoded,
  };
};

export const logoutAgency = (history) => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentAgency({}));
  history.push("/");
};

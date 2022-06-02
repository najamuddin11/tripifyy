import axios from "axios";
import {
  GET_TRIP,
  GET_TRIPS,
  ADD_TRIP,
  GET_ERRORS,
  GET_TRIPS_BY_AGENCY,
  TRIP_LOADING,
} from "./types";

export const getTrips = () => (dispatch) => {
  dispatch(setTripLoading());
  axios
    .get("/api/trips")
    .then((res) =>
      dispatch({
        type: GET_TRIPS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TRIPS,
        payload: null,
      })
    );
};

export const addTrip = (tripData, history, callback) => (dispatch) => {
  axios
    .post("/api/trips", tripData)
    .then((res) => {

      dispatch({
        type: ADD_TRIP,
        payload: res.data,
      });
      console.log(res)
      history.push("/agency/trips");
    })

    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      if (typeof callback == "function") {
        callback();
      }
    });
};

export const getTripsByAgency = (id) => (dispatch) => {
  dispatch(setTripLoading());
  axios
    .get(`/api/trips/agency/${id}`)
    .then((res) =>
      dispatch({
        type: GET_TRIPS_BY_AGENCY,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TRIPS_BY_AGENCY,
        payload: null,
      })
    );
};
export const joinTrip = (id) => (dispatch) => {
  axios
    .post(`/api/trips/join/${id}`)
    .then((res) => dispatch(getTrips()))
    .catch((err) =>
      dispatch({
        type: GET_TRIPS,
        payload: null,
      })
    );
};
export const getTrip = (id) => (dispatch) => {
  dispatch(setTripLoading());
  axios
    .get(`/api/trips/${id}`)
    .then((res) =>
      dispatch({
        type: GET_TRIP,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_TRIP,
        payload: null,
      })
    );
};

export const setTripLoading = () => {
  return {
    type: TRIP_LOADING,
  };
};

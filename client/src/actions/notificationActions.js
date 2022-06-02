import axios from "axios";

import { GET_USER_NOTIFICATION, GET_AGENCY_NOTIFICATION } from "./types";

export const getNotificationByUser = (id) => (dispatch) => {
  axios
    .get(`/api/notification/user/${id}`)
    .then((res) =>
      dispatch({
        type: GET_USER_NOTIFICATION,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_USER_NOTIFICATION,
        payload: null,
      })
    );
};

export const getNotificationByAgency = (id) => (dispatch) => {
  axios
    .get(`/api/notification/agency/${id}`)
    .then((res) =>
      dispatch({
        type: GET_AGENCY_NOTIFICATION,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_AGENCY_NOTIFICATION,
        payload: null,
      })
    );
};

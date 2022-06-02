import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userProfileReducer from "./userProfileReducer";
import postReducer from "./postReducer";
import agencyProfileReducer from "./agencyProfileReducer";
import notificationReducer from "./notificationReducer";
import messageReducer from "./messageReducer";
import tripReducer from "./tripReducer";
import apiReducer from "./apiReducer";

export default combineReducers({
  auth: authReducer,
  profile: userProfileReducer,
  agencyprofile: agencyProfileReducer,
  errors: errorReducer,
  post: postReducer,
  notification: notificationReducer,
  message: messageReducer,
  trip: tripReducer,
  api: apiReducer,
});

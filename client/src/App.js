import React, { Component } from "react";
import "./App.scss";
import AgencyNotificationRoute from "./routes/agency/AgencyNotificationRoute";
import { Route, Switch, withRouter } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, setCurrentAgency } from "./actions/authActions";
import store from "./store";
import { connect } from "react-redux";
import Home from "./routes/guests/Home";
import UserSigninRoute from "./routes/auth/UserSigninRoute";
import UserSignupRoute from "./routes/auth/UserSignupRoute";
import AgencySigninRoute from "./routes/auth/AgencySigninRoute";
import AgencySignupRoute from "./routes/auth/AgencySignupRoute";
import PrivateAgencyRoute from "./common/PrivateAgencyRoute";
import PrivateUserRoute from "./common/PrivateUserRoute";

import AgencyDashboardRoute from "./routes/agency/AgencyDashboardRoute";
import UserDashboardRoute from "./routes/user/UserDashboardRoute";
import CreateUserProfileRoute from "./routes/user/CreateUserProfileRoute";
import AgencyCreateTripRoute from "./routes/agency/AgencyCreateTripRoute";
import CreateAgencyProfileRoute from "./routes/agency/CreateAgencyProfileRoute";
import AgencyFeedRoute from "./routes/agency/AgencyFeedRoute";
import AgencyPostRoute from "./routes/agency/AgencyPostRoute";
import AgencyViewTripRoute from "./routes/agency/AgencyViewTripRoute";
import UserMyFeedRoute from "./routes/user/UserMyFeedRoute";
import UserPostRoute from "./routes/user/UserPostRoute";
import UserCreateTripRoute from "./routes/user/UserCreateTripRoute";
import AgencyViewSingleTripRoute from "./routes/agency/AgencyViewSingleTripRoute";
import UserNotificationRoute from './routes/user/UserNotificationRoute'
class App extends Component {
  constructor(props) {
    super(props);

    // if(localStorage.jwtToken){
    //   setAuthToken(localStorage.jwtToken)
    //   const decoded = jwt_decode(localStorage.jwtToken);
    //   store.dispatch(setCurrentUser(decoded))}

    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      if (decoded.isUser) {
        store.dispatch(setCurrentUser(decoded));
      } else if (decoded.isAgency) {
        store.dispatch(setCurrentAgency(decoded));
      }
    }
  }

  render() {
    return (
      <div className="body">
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route
            exact
            path="/user/login"
            component={withRouter(UserSigninRoute)}
          />
          <Route
            exact
            path="/user/signup"
            component={withRouter(UserSignupRoute)}
          />
          <Route
            exact
            path="/agency/login"
            component={withRouter(AgencySigninRoute)}
          />
          <Route
            exact
            path="/agency/signup"
            component={withRouter(AgencySignupRoute)}
          />
          <PrivateAgencyRoute
            exact
            path="/agency/dashboard"
            component={withRouter(AgencyDashboardRoute)}
          /><PrivateAgencyRoute
          exact
          path="/agency/notifications"
          component={withRouter(AgencyNotificationRoute)}
        />
        <PrivateUserRoute
          exact
          path="/user/notifications"
          component={withRouter(UserNotificationRoute)}
        />
          <PrivateAgencyRoute
            exact
            path="/agency/create-trip"
            component={withRouter(AgencyCreateTripRoute)}
          />
          <PrivateUserRoute
            exact
            path="/user/dashboard"
            component={withRouter(UserDashboardRoute)}
          />
          <PrivateUserRoute
            exact
            path="/user/my-feed"
            component={withRouter(UserMyFeedRoute)}
          />
          <PrivateUserRoute
            exact
            path="/user/post/:id"
            component={withRouter(UserPostRoute)}
          />
          <PrivateUserRoute
            exact
            path="/user/create-profile"
            component={withRouter(CreateUserProfileRoute)}
          />
          <PrivateAgencyRoute
            exact
            path="/agency/create-profile"
            component={withRouter(CreateAgencyProfileRoute)}
          />
          <PrivateAgencyRoute
            exact
            path="/agency/my-feed"
            component={withRouter(AgencyFeedRoute)}
          />
          <PrivateAgencyRoute
            exact
            path="/agency/trips"
            component={withRouter(AgencyViewTripRoute)}
          />
          <PrivateAgencyRoute
            exact
            path="/agency/trips/:id"
            component={withRouter(AgencyViewSingleTripRoute)}
          />
          <PrivateAgencyRoute
            exact
            path="/agency/post/:id"
            component={withRouter(AgencyPostRoute)}
          />
          <PrivateAgencyRoute
            exact
            path="/agency/my-trips"
            component={withRouter(UserCreateTripRoute)}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(App));

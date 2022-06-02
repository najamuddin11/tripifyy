import React, { useEffect } from "react";
import UserHeader from "../../components/header/UserHeader";
import UserDashboard from "../../components/user/UserDashboard";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentProfile } from "../../actions/userProfileActions";
import Spinner from "../../common/Spinner.component";
const UserDashboardRoute = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);
  const { user } = props.auth;

  const { profile, loading } = props.profile;

  let userHomeContent;

  if (profile === null || loading) {
    userHomeContent = <Spinner />;
  } else {
    if (Object.keys(profile).length > 0) {
      userHomeContent = (
        <div>
          <UserHeader />
          <UserDashboard />
        </div>
      );
    } else {
      props.history.push("/user/create-profile");
    }
  }
  return <div>{userHomeContent}</div>;
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile })(
  withRouter(UserDashboardRoute)
);

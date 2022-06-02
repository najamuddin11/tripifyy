import React, { useEffect } from "react";
import { MDBMask, MDBView } from "mdbreact";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSignup from "../../components/auth/UserSignup";
import Header from "../../components/header/Header";
const UserSignupRoute = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/user/dashboard");
    }
    if (props.auth.isAgency) {
      props.history.push("/agency/dashboard");
    }
  });
  return (
    <div>
      <Header />
      <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(40).jpg">
        <MDBMask
          overlay="purple-light"
          className="flex-center flex-column text-white text-center"
        ></MDBMask>
        <UserSignup />
      </MDBView>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(UserSignupRoute));

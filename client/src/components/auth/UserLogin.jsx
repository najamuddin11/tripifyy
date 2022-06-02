import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBNavLink,
} from "mdbreact";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import ValidationError from "../../common/ValidationError.component";

const UserLogin = (props) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    props.loginUser(userData, props.history);
  };
  const { errors } = props;
  return (
    <div style={{ marginTop: "150px" }}>
      {" "}
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <div className="text-white">
              <h1>Tripifyy</h1>
              <h2> User Login</h2>
            </div>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4">Login</p>
                  <div className="grey-text">
                    <div className="d-flex">
                      <div className="w-100">
                        <MDBInput
                          label="Your email"
                          icon="envelope"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={email}
                          className={classnames({
                            "is-invalid": errors.email,
                          })}
                        />
                        {errors.email && (
                          <ValidationError
                            className="pl-4 ml-2"
                            error={errors.email}
                          />
                        )}
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="w-100">
                        <MDBInput
                          label="Your password"
                          icon="lock"
                          group
                          name="password"
                          type="password"
                          onChange={handleChange}
                          value={password}
                          className={classnames({
                            "is-invalid": errors.password,
                          })}
                        />
                        {errors.password && (
                          <ValidationError
                            className="pl-4 ml-2"
                            error={errors.password}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <MDBBtn color="cyan" type="submit" onClick={onSubmit}>
                      Login
                    </MDBBtn>
                  </div>
                </form>
                <div className="text-center">
                  <div>
                    Don't have account? <Link to="/user/signup">Sign up</Link>
                  </div>
                  <div>
                    <Link to="/agency/login">Login as Agency</Link>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

const mapStateProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateProps, { loginUser })(withRouter(UserLogin));

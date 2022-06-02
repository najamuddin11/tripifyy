import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { connect } from "react-redux";
import { loginAgency } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import ValidationError from "../../common/ValidationError.component";
const AgencyLogin = (props) => {
  const { errors } = props;
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: loginData.email,
      password: loginData.password,
    };
    // console.log(userData);
    props.loginAgency(userData, props.history);
  };

  return (
    <div style={{ marginTop: "150px" }}>
      {" "}
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <div className="text-white">
              <h1>Tripifyy</h1>
              <h2> Agency Login</h2>
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
                          value={loginData.email}
                          onChange={handleChange}
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
                        {" "}
                        <MDBInput
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          name="password"
                          value={loginData.password}
                          onChange={handleChange}
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
                    Don't have account? <Link to="/agency/signup">Sign up</Link>
                  </div>
                  <div>
                    <Link to="/user/login">Login as User</Link>
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

export default connect(mapStateProps, { loginAgency })(withRouter(AgencyLogin));

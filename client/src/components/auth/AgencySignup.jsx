import React, { useEffect, useState } from "react";
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
import { registerAgency } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import ValidationError from "../../common/ValidationError.component";

const AgencySignup = (props) => {
  const { errors } = props;
  const [erros, setErros] = useState({});
  useEffect(() => {
    setErros(errors);
  }, [errors]);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setSignupData((prevState) => ({ ...prevState, [name]: value }));
  };
  const { firstName, lastName, email, phone, password, confirmPassword } =
    signupData;
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      isUser: false,
      isAgency: true,
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    };
    props.registerAgency(newUser, props.history);
  };
  return (
    <div style={{ marginTop: "75px" }}>
      {" "}
      <MDBContainer>
        <MDBRow>
          <MDBCol md="5">
            <div className="text-white">
              <h1>Tripifyy</h1>
              <h2> Agency Signup</h2>
            </div>
          </MDBCol>
          <MDBCol md="7">
            <MDBCard>
              <MDBCardBody>
                <form>
                  <p className="h4 text-center py-4">Signup</p>
                  <div className="grey-text">
                    <div className="d-flex justify-content-between">
                      <div className="w-100">
                        <MDBInput
                          label="First Name"
                          icon="user"
                          type="text"
                          name="firstName"
                          onChange={handleChange}
                          value={firstName}
                          className={classnames({
                            "is-invalid": errors.firstName,
                          })}
                        />
                        {errors.firstName && (
                          <ValidationError
                            className="pl-4 ml-2"
                            error={errors.firstName}
                          />
                        )}
                      </div>
                      <div className="w-100">
                        <MDBInput
                          label="Last Name"
                          icon="user"
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          value={lastName}
                          className={classnames({
                            "is-invalid": errors.lastName,
                          })}
                        />
                        {errors.lastName && (
                          <ValidationError
                            className="pl-4 ml-2"
                            error={errors.lastName}
                          />
                        )}
                      </div>
                    </div>
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
                        {" "}
                        <MDBInput
                          label="Your phone"
                          icon="phone"
                          type="tel"
                          name="phone"
                          onChange={handleChange}
                          value={phone}
                          className={classnames({
                            "is-invalid": errors.phone,
                          })}
                        />
                        {errors.phone && (
                          <ValidationError
                            className="pl-4 ml-2"
                            error={errors.phone}
                          />
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="w-100">
                        <MDBInput
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          name="password"
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
                      <div className="w-100">
                        <MDBInput
                          label="Confirm password"
                          icon="lock"
                          group
                          type="password"
                          name="confirmPassword"
                          onChange={handleChange}
                          value={confirmPassword}
                          className={classnames({
                            "is-invalid": errors.confirmPassword,
                          })}
                        />
                        {errors.confirmPassword && (
                          <ValidationError
                            className="pl-4 ml-2"
                            error={errors.confirmPassword}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <MDBBtn color="cyan" type="submit" onClick={onSubmit}>
                      Signup
                    </MDBBtn>
                  </div>
                </form>
                <div className="text-center">
                  <div>
                    Already have an account?{" "}
                    <Link to="/agency/login">Login</Link>
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

export default connect(mapStateProps, { registerAgency })(
  withRouter(AgencySignup)
);

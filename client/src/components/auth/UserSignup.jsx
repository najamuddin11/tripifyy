// import React, { Component } from "react";
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBInput,
//   MDBBtn,
//   MDBCard,
//   MDBCardBody,
// } from "mdbreact";
// import { connect } from "react-redux";
// import { registerUser } from "../../actions/authActions";
// import { Link, withRouter } from "react-router-dom";
// import classnames from "classnames";
// import ValidationError from "../../common/ValidationError.component";

// export class UserSignup extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isUser: true,
//       isAgency: false,
//       firstName: "",
//       lastName: "",
//       phone: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       errors: {},
//     };
//   }
//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }
//   handleChange = (input) => (e) => {
//     this.setState({ [input]: e.target.value });
//   };
//   onSubmit = (e) => {
//     e.preventDefault();
//     const newUser = {
//       isUser: this.state.isUser,
//       isOrganizer: this.state.isOrganizer,
//       firstName: this.state.firstName,
//       lastName: this.state.lastName,
//       phone: this.state.phone,
//       email: this.state.email,
//       password: this.state.password,
//       confirmPassword: this.state.confirmPassword,

//       errors: {},
//     };

//     this.props.registerUser(newUser, this.props.history);
//   };
//   render() {
//     const {
//       email,
//       password,
//       firstName,
//       lastName,
//       phone,
//       confirmPassword,
//     } = this.state;
//     const { errors } = this.props;
//     return (
//       <div style={{ marginTop: "75px" }}>
//         {" "}
//         <MDBContainer>
//           <MDBRow>
//             <MDBCol md="5">
//               <div className="text-white">
//                 <h1>Tri</h1>
//                 <h2> User Signup</h2>
//               </div>
//             </MDBCol>
//             <MDBCol md="7">
//               <MDBCard>
//                 <MDBCardBody>
//                   <form>
//                     <p className="h4 text-center py-4">Signup</p>
//                     <div className="grey-text">
//                       <div className="d-flex justify-content-between">
//                         <div className="w-100">
//                           <MDBInput
//                             label="First Name"
//                             icon="user"
//                             type="text"
//                             onChange={this.handleChange("firstName")}
//                             value={firstName}
//                             className={classnames({
//                               "is-invalid": errors.firstName,
//                             })}
//                           />
//                           {errors.firstName && (
//                             <ValidationError
//                               className="pl-4 ml-2"
//                               error={errors.firstName}
//                             />
//                           )}
//                         </div>
//                         <div className="w-100">
//                           <MDBInput
//                             label="Last Name"
//                             icon="user"
//                             type="text"
//                             onChange={this.handleChange("lastName")}
//                             value={lastName}
//                             className={classnames({
//                               "is-invalid": errors.lastName,
//                             })}
//                           />
//                           {errors.lastName && (
//                             <ValidationError
//                               className="pl-4 ml-2"
//                               error={errors.lastName}
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <div className="d-flex">
//                         <div className="w-100">
//                           {" "}
//                           <MDBInput
//                             label="Your email"
//                             icon="envelope"
//                             type="email"
//                             onChange={this.handleChange("email")}
//                             value={email}
//                             className={classnames({
//                               "is-invalid": errors.email,
//                             })}
//                           />
//                           {errors.email && (
//                             <ValidationError
//                               className="pl-4 ml-2"
//                               error={errors.email}
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <div className="d-flex">
//                         <div className="w-100">
//                           {" "}
//                           <MDBInput
//                             label="Your phone"
//                             icon="phone"
//                             type="tel"
//                             onChange={this.handleChange("phone")}
//                             value={phone}
//                             className={classnames({
//                               "is-invalid": errors.phone,
//                             })}
//                           />
//                           {errors.phone && (
//                             <ValidationError
//                               className="pl-4 ml-2"
//                               error={errors.phone}
//                             />
//                           )}
//                         </div>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <div className="w-100">
//                           {" "}
//                           <MDBInput
//                             label="Your password"
//                             icon="lock"
//                             group
//                             type="password"
//                             onChange={this.handleChange("password")}
//                             value={password}
//                             className={classnames({
//                               "is-invalid": errors.password,
//                             })}
//                           />
//                           {errors.password && (
//                             <ValidationError
//                               className="pl-4 ml-2"
//                               error={errors.password}
//                             />
//                           )}
//                         </div>
//                         <div className="w-100">
//                           <MDBInput
//                             label="Confirm password"
//                             icon="lock"
//                             group
//                             type="password"
//                             onChange={this.handleChange("confirmPassword")}
//                             value={confirmPassword}
//                             className={classnames({
//                               "is-invalid": errors.confirmPassword,
//                             })}
//                           />
//                           {errors.confirmPassword && (
//                             <ValidationError
//                               className="pl-4 ml-2"
//                               error={errors.confirmPassword}
//                             />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-center py-4 mt-3">
//                       <MDBBtn
//                         color="cyan"
//                         type="submit"
//                         onClick={this.onSubmit}
//                       >
//                         Login
//                       </MDBBtn>
//                     </div>
//                   </form>
//                   <div className="text-center">
//                     <div>
//                       Already have an account?{" "}
//                       <Link to="/user/login">Login</Link>
//                     </div>
//                   </div>
//                 </MDBCardBody>
//               </MDBCard>
//             </MDBCol>
//           </MDBRow>
//         </MDBContainer>
//       </div>
//     );
//   }
// }

// const mapStateProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

// export default connect(mapStateProps, { registerUser })(withRouter(UserSignup));
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
import { registerUser } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import classnames from "classnames";
import ValidationError from "../../common/ValidationError.component";
const UserSignup = (props) => {
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, phone, password, confirmPassword } =
    signupData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({ ...prevState, [name]: value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      isUser: true,
      isAgency: false,
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    };
    props.registerUser(newUser, props.history);
  };
  const { errors } = props;
  return (
    <div style={{ marginTop: "75px" }}>
      {" "}
      <MDBContainer>
        <MDBRow>
          <MDBCol md="5">
            <div className="text-white">
              <h1>Tripifyy</h1>
              <h2> User Signup</h2>
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
                          name="lastName"
                          type="text"
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
                        {" "}
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
                        {" "}
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
                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan" type="submit" onClick={onSubmit}>
                      Signup
                    </MDBBtn>
                  </div>
                </form>
                <div className="text-center">
                  <div>
                    Already have an account? <Link to="/user/login">Login</Link>
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

export default connect(mapStateProps, { registerUser })(withRouter(UserSignup));

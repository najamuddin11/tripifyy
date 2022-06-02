import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBBtn,
  MDBNavLink,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
} from "mdbreact";
import { logoutUser } from "../../actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const UserHeader = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough, setIsWideEnough] = useState(false);

  const onClick = () => {
    setCollapse(!collapse);
  };

  const onLogout = () => {
    props.logoutUser(props.history);
  };

  return (
    <div>
      <header>
        <MDBNavbar color="bg-dark" fixed="top" dark expand="md" scrolling>
          <MDBNavbarBrand href="/">
            <strong>Tripifyy</strong>
          </MDBNavbarBrand>
          {!isWideEnough && <MDBNavbarToggler onClick={onClick} />}
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav left>
              <MDBNavItem
                active={props.history.location.pathname === "/user/dashboard"}
              >
                <MDBNavLink to="/user/dashboard">Home</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/user/my-feed">My Feed</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/user/my-trips">My Trips</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>

            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBFormInline waves>
                  <div className="md-form my-0 w-100">
                    <input
                      className="form-control mr-sm-2 w-100"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </div>
                </MDBFormInline>
              </MDBNavItem>
              <MDBNavItem>
                <MDBDropdown size="lg">
                  <MDBDropdownToggle nav caret>
                    <span className="label">
                      <img
                        src={props.auth.user.avatar}
                        alt=""
                        className="rounded-circle"
                        style={{ width: "45px" }}
                      />
                    </span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu style={{ width: "225px" }}>
                    <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
                    <MDBDropdownItem href="#!">My Posts</MDBDropdownItem>

                    <MDBDropdownItem href="/user/notifications">
                      Notifications
                    </MDBDropdownItem>
                    <MDBDropdownItem divider />

                    <MDBDropdownItem href="" onClick={onLogout}>
                      Logout
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
      <div className="mb-5 pb-5" />
    </div>
  );
};

const mapStateProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateProps, { logoutUser })(withRouter(UserHeader));

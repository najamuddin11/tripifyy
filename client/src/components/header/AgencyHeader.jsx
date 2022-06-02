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
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
} from "mdbreact";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAgency } from "../../actions/authActions";

const AgencyHeader = (props) => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough, setIsWideEnough] = useState(false);
  const onClick = () => {
    setCollapse(!collapse);
  };
  const onLogout = () => {
    props.logoutAgency(props.history);
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
                active={props.history.location.pathname === "/agency/dashboard"}
              >
                <MDBNavLink to="/agency/dashboard">Dashboard</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/agency/my-feed">My Feed</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/agency/create-trip">Create Trip</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/agency/trips">My Trips</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>

            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBDropdown size="lg">
                  <MDBDropdownToggle nav caret>
                    <span className="label">
                      <img
                        src={props.auth.agency.avatar}
                        alt=""
                        className="rounded-circle"
                        style={{ width: "45px" }}
                      />
                    </span>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu style={{ width: "225px" }}>
                    <MDBDropdownItem href="#!">Profile</MDBDropdownItem>
                    <MDBDropdownItem href="#!">My Posts</MDBDropdownItem>

                    <MDBDropdownItem href="/agency/notifications">
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
    </div>
  );
};

const mapStateProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateProps, { logoutAgency })(
  withRouter(AgencyHeader)
);

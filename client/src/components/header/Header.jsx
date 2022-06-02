import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";
const Header = () => {
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough, setIsWideEnough] = useState(false);

  const onClick = () => {
    setCollapse(!collapse);
  };
  return (
    <div>
      <header>
        <MDBNavbar
          color="bg-primary"
          fixed="top"
          dark
          expand="md"
          scrolling
          transparent
        >
          <MDBNavbarBrand href="/">
            <strong>Tripifyy</strong>
          </MDBNavbarBrand>
          {!isWideEnough && <MDBNavbarToggler onClick={onClick} />}
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink to="/user/login">Login</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/user/signup">Sign up</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
    </div>
  );
};

export default Header;

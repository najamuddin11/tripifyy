import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import AgencySidebar from "./AgencySidebar";
import AgencyInboxSidebar from "./AgencyInboxSidebar";
import AgencyBio from "./AgencyBio";
import ActiveTrips from "./ActiveTrips";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../../actions/agencyProfileActions";
import { getTripsByAgency } from "../../../actions/tripActions";


class AgencyDashboard extends Component {
  componentDidMount() {
    this.props.getTripsByAgency(this.props.auth.agency.id);
  }
  render() {
    return (
      <div>
        <MDBContainer fluid style={{ padding: "120px 100px 0px 100px" }}>
          <MDBRow>
            <MDBCol md="4">
              <AgencySidebar />
              <AgencyInboxSidebar />
            </MDBCol>
            <MDBCol md="8">
              <AgencyBio />
              <ActiveTrips />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getTripsByAgency,
})(AgencyDashboard);

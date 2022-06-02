import React, { Component } from "react";
import "./AgencySidebar.scss";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MDBRating, MDBIcon, MDBRow, MDBCol, MDBProgress } from "mdbreact";
import { Container } from "react-bootstrap";

class AgencySidebar extends Component {
  render() {
    const { agency } = this.props.auth;
    const { profile } = this.props.agencyprofile;

    return (
      <div className="sidebar-container">
        <div className="info">
          <img src={agency.avatar} className="agency-avatar" alt="" />
          <div>
            <h5 style={{ display: "inline" }}>
              @{profile ? profile.handle : null}{" "}
            </h5>
            <MDBIcon icon="star" style={{ color: "#FFC107" }} /> N/A
          </div>
        </div>
        <hr />
        <MDBRow>
          <MDBCol md="6">Trip Completion</MDBCol>
          <MDBCol md="4">
            <div class="progress md-progress">
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: `${profile ? profile.tripCompletion : null}%` }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </MDBCol>
          <MDBCol md="2">{profile ? profile.tripCompletion : null}%</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">On Time</MDBCol>
          <MDBCol md="4">
            <div class="progress md-progress">
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: `${profile ? profile.onTime : null}%` }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </MDBCol>
          <MDBCol md="2">{profile ? profile.onTime : null}%</MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">Behaviour</MDBCol>
          <MDBCol md="4">
            <div class="progress md-progress">
              <div
                class="progress-bar"
                role="progressbar"
                style={{ width: `${profile ? profile.behaviour : null}%` }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </MDBCol>
          <MDBCol md="2">{profile ? profile.behaviour : null}%</MDBCol>
        </MDBRow>
        <hr />
        <MDBRow>
          <MDBCol md="8">Earned This Month</MDBCol>

          <MDBCol md="4">
            <span style={{ float: "right" }}>
              {profile ? profile.earnedThisMonth : null} PKR
            </span>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="8">Total Earned</MDBCol>

          <MDBCol md="4" style={{ float: "right" }}>
            <span style={{ float: "right" }}>
              {profile ? profile.totalEarned : null} PKR
            </span>
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow>
          <MDBCol>
            <div className="ml-5 mr-5">
              <ul className="list-unstyled list-inline d-flex justify-content-center">
                {profile && profile.social.facebook && (
                  <li className="list-inline-item">
                    <a
                      href={profile && profile.social.facebook}
                      target="_blank"
                    >
                      <MDBIcon
                        fab
                        className="grey-text"
                        size="lg"
                        icon="facebook"
                      />
                    </a>
                  </li>
                )}

                {profile && profile.social.twitter && (
                  <li className="list-inline-item">
                    <a href={profile && profile.social.twitter} target="_blank">
                      <MDBIcon
                        fab
                        className="grey-text"
                        size="lg"
                        icon="twitter"
                      />
                    </a>
                  </li>
                )}
                {profile && profile.social.google && (
                  <li className="list-inline-item">
                    <a href={profile && profile.social.google} target="_blank">
                      <MDBIcon
                        fab
                        className="grey-text"
                        size="lg"
                        icon="google-plus"
                      />
                    </a>
                  </li>
                )}
                {profile && profile.social.linkedin && (
                  <li className="list-inline-item">
                    <a
                      href={profile && profile.social.linkedin}
                      target="_blank"
                    >
                      <MDBIcon
                        fab
                        className="grey-text"
                        size="lg"
                        icon="linkedin"
                      />
                    </a>
                  </li>
                )}
                {profile && profile.social.instagram && (
                  <li className="list-inline-item">
                    <a
                      href={profile && profile.social.instagram}
                      target="_blank"
                    >
                      <MDBIcon
                        fab
                        className="grey-text"
                        size="lg"
                        icon="instagram"
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  auth: state.auth,
  agencyprofile: state.agencyprofile,
});

export default connect(mapStateToProps)(withRouter(AgencySidebar));

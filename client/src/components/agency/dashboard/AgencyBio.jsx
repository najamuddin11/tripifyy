import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class AgencyBio extends Component {
  render() {
    const { profile } = this.props.agencyprofile;
    return (
      <div className="">
        <h2>Bio</h2>
        <div className="pl-1 pr-1 mb-4">{profile ? profile.bio : null}</div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  agencyprofile: state.agencyprofile,
});

export default connect(mapStateToProps)(AgencyBio);

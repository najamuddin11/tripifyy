import React, { useEffect } from "react";
import AgencyDashboard from "../../components/agency/dashboard/AgencyDashboard";
import AgencyHeader from "../../components/header/AgencyHeader";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentProfile } from "../../actions/agencyProfileActions";
import Spinner from "../../common/Spinner.component";
const AgencyDashboardRoute = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);
  const { agency } = props.auth;

  const { profile, loading } = props.agencyprofile;

  let agencyDashboardComponent;

  if (profile === null || loading) {
    agencyDashboardComponent = <Spinner />;
  } else {
    if (Object.keys(profile).length > 0) {
      agencyDashboardComponent = (
        <div>
          <AgencyHeader />
          <AgencyDashboard />
        </div>
      );
    } else {
      props.history.push("/agency/create-profile");
    }
  }
  return <div>{agencyDashboardComponent}</div>;
};

const mapStateToProps = (state) => ({
  agencyprofile: state.agencyprofile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile })(
  withRouter(AgencyDashboardRoute)
);


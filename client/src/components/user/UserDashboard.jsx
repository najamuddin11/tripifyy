import React, { useEffect } from "react";

import { connect } from "react-redux";

import { getTrips } from "../../actions/tripActions";
import CreateTripUser from "./trips/CreateTripUser";
import ExploreTrips from "./trips/ExploreTrips";

const UserDashboard = (props) => {

  useEffect(() => {   
    props.getTrips();
  });
  return (
    <div>
      <ExploreTrips/>
      <CreateTripUser/>
    </div>
  );
}

export default connect(null, { getTrips })(UserDashboard);

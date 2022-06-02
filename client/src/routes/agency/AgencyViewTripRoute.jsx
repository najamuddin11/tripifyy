import React, { Component } from "react";
import AgencyHeader from "../../components/header/AgencyHeader";
import ViewTrips from "../../components/agency/trips/ViewTrips";

const AgencyViewTripRoute = () => {
  return (
    <div>
      <AgencyHeader />
      <ViewTrips />
    </div>
  );
};

export default AgencyViewTripRoute;

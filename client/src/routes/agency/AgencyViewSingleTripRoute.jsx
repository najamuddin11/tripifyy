import React, { Component } from "react";
import AgencyHeader from "../../components/header/AgencyHeader";
import ViewSingleTrip from "../../components/agency/trips/ViewSingleTrip";

const AgencyViewSingleTripRoute = () => {
  return (
    <div>
      <AgencyHeader />
      <ViewSingleTrip />
    </div>
  );
};

export default AgencyViewSingleTripRoute;

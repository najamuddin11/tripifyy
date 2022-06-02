import React, { Component } from "react";
import AgencyHeader from "../../components/header/AgencyHeader";
import CreateTrips from "../../components/agency/createTrips/CreateTrips";

const AgencyCreateTripRoute = () => {
    return (
        <div>
            <AgencyHeader/>
            <CreateTrips/>
        </div>
    );
}

export default AgencyCreateTripRoute;


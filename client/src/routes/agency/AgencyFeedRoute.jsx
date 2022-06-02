import React, { Component } from "react";
import AgencyHeader from "../../components/header/AgencyHeader";
import MyFeed from "../../components/agency/myFeed/MyFeed";

const AgencyFeedRoute = () => {
  return (
    <div>
      <AgencyHeader />
      <MyFeed />
    </div>
  );
};

export default AgencyFeedRoute;

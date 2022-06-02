import React from "react";
import UserHeader from "../../components/header/UserHeader";
import CreateTripUser from "../../components/user/trips/CreateTripUser";

const UserCreateTripRoute = () => {
  return (
    <div>
      <UserHeader />
      <CreateTripUser />
    </div>
  );
};

export default UserCreateTripRoute;

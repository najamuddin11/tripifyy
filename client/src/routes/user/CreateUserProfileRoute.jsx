import React from "react";
import UserHeader from "../../components/header/UserHeader";
import CreateUserProfile from "../../components/user/profile/CreateUserProfile";

const CreateUserProfileRoute = () => {
  return (
    <div>
      <UserHeader />
      <CreateUserProfile />
    </div>
  );
};

export default CreateUserProfileRoute;

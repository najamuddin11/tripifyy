import React from "react";
import UserHeader from "../../components/header/UserHeader";
import MyFeed from "../../components/user/feed/MyFeed";

const UserMyFeedRoute = () => {
  return (
    <div>
      <UserHeader />
      <MyFeed />
    </div>
  );
};

export default UserMyFeedRoute;

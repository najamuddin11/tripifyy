import React from "react";
import UserHeader from "../../components/header/UserHeader";
import Notifications from '../../components/user/notifications/Notifications'

const UserNotificationRoute = () => {
  return (
    <div>
        <UserHeader/>
        <Notifications/>
    </div>
  );
};

export default UserNotificationRoute;

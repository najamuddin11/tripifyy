import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getNotificationByAgency } from "../../../actions/notificationActions";
import NotificationItems from "./NotificationItems";

const Notifications = (props) => {
    useEffect(() => {
        props.getNotificationByAgency(props.auth.agency.id);
    },[]);
    const {notification} = props.notification
    return (
      <div style={{ margin: "100px" }}>
        <h1 style={{ marginBottom: "50px" }}>Notifications</h1>
        {console.log(notification)}

        {notification &&
          notification.map((n) => (
            <NotificationItems
              key={n._id}
              notification={n}
            />
          ))}

      </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    notification: state.notification 
})
export default connect(mapStateToProps, { getNotificationByAgency })(
  withRouter(Notifications)
);

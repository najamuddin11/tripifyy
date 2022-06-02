import React from 'react';

const NotificationItems = (props) => {
    const {notification} = props.notification
    return (
      <div>
        <div className="card" style={{ marginBottom: "20px" }}>
          <div className="card-body">
            <span style={{ float: "right" }}>
              {new Date(notification[0].date).toLocaleDateString("sq-AL", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
            <div className="card-text">{notification[0].message}</div>
          </div>
        </div>
      </div>
    );
}

export default NotificationItems;

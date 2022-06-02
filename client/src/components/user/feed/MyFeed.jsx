import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./MyFeed.scss";
import CreatePost from "./CreatePost";
import NewFeed from "./NewFeed";

class MyFeed extends Component {
  render() {
    return (
      <div className="myfeed-container">
        <MDBRow>
          <MDBCol md="2"></MDBCol>
          <MDBCol md="8">
            <CreatePost />
            <div style={{ marginTop: "50px" }} />
            <NewFeed />
          </MDBCol>
          <MDBCol md="2"></MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default MyFeed;

import React, { Component } from "react";
import "./ActiveTrips.scss";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,

} from "mdbreact";
import TripsDataContainer from "./TripsDataContainer";
class ActiveTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTripStatus: "Active Trips",
      isActive: true,
      isCompleted: false,
      isCanceled: false,
      active: false,
    };
  }

  tripHandler = (tripStatus) => {
    this.setState({
      currentTripStatus: tripStatus,
      isActive: tripStatus === "Active Trips" ? true : false,
      isCompleted: tripStatus === "Completed Trips" ? true : false,
      isCanceled: tripStatus === "Canceled Trips" ? true : false,
    });
  };

  render() {
    return (
      <div>
        <div className="active-trip-container">
          <span style={{ fontSize: "20px" }}>
            {this.state.currentTripStatus}
          </span>

          <MDBDropdown>
            <MDBDropdownToggle caret color="white" className="dropdown-button">
              &nbsp; {this.state.currentTripStatus} &nbsp; &nbsp;
            </MDBDropdownToggle>
            <MDBDropdownMenu right basic>
              <MDBDropdownItem
                active={this.state.isActive}
                onClick={() => this.tripHandler("Active Trips")}
              >
                Active Trips
              </MDBDropdownItem>
              <MDBDropdownItem
                active={this.state.isCompleted}
                onClick={() => this.tripHandler("Completed Trips")}
              >
                Completed Trips
              </MDBDropdownItem>
              <MDBDropdownItem
                active={this.state.isCanceled}
                onClick={() => this.tripHandler("Canceled Trips")}
              >
                Canceled Trips
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div>

        {/* <div style={{textAlign:'center', fontSize:'20px', letterSpacing:'10px', paddingTop:'50px'}}> No &nbsp; Trips &nbsp; To &nbsp; Show <hr style={{marginTop:'50px'}}/></div> */}
        <TripsDataContainer />
        <TripsDataContainer />
      </div>
    );
  }
}

export default ActiveTrips;

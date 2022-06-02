import React, { Component } from "react";
import "./TripsDataContainer.scss";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
class TripsDataContainer extends Component {
  render() {
    return (
      <div className="trip-status">
        <MDBTable borderless style={{ marginBottom: "0px" }}>
          <MDBTableHead>
            <tr>
              <th className="table-heading">Completed On</th>
              <th className="table-heading">Title</th>
              <th className="table-heading">Price</th>
              <th className="table-heading">Status</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            <tr>
              <td className="table-data">02/05/2020</td>
              <td className="table-data">Naran Trip</td>
              <td className="table-data">80k PKR</td>
              <td className="table-data">Completed</td>
              <td className="table-data">
                <a href="#" style={{ color: "blue" }}>
                  View
                </a>
              </td>
            </tr>
          </MDBTableBody>
        </MDBTable>
      </div>
    );
  }
}

export default TripsDataContainer;

import React, { Component } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdbreact";
import TripCard from "./TripCard";
import { connect } from "react-redux";
import { getTripsByAgency } from "../../../actions/tripActions";

class ViewTrips extends Component {
  componentDidMount() {
    this.props.getTripsByAgency(this.props.auth.agency.id);
  }
  render() {
    const { mytrips } = this.props.trip;
    return (
      <div className="pt-4 " style={{marginTop:"100px"}}>
        <MDBContainer>
          <h2>My Trips</h2>
          <hr />
          <div className="mt-4 mb-5" />

          {mytrips &&
            mytrips.map((trip) => <TripCard key={trip._id} trip={trip} />)}

          {/* <MDBRow>
            <MDBCol xl="4" md="4" className="mb-3">
              <img
                src="https://mdbootstrap.com/img/Others/documentation/img(119)-mini.jpg"
                className="img-fluid z-depth-1 rounded"
                alt=""
              />
            </MDBCol>
            <MDBCol>
                
              <h4>5 days 4 Nights To Naran</h4>
                <div className='d-flex flex-column'>
                    <div>
                <span className="font-weight-bold"> Description: </span>
                <div>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</div>
                </div>
                <span className="font-weight-bold"> Destinations: </span>
                
              </div>
            </MDBCol>
          </MDBRow> */}
        </MDBContainer>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  trip: state.trip,
  auth: state.auth,
});
export default connect(mapStateToProps, { getTripsByAgency })(ViewTrips);

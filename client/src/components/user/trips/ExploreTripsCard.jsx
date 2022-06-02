import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBIcon,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdbreact";
import { Link } from "react-router-dom";
import noimage from "../../../assets/no-photo.png";
import { connect } from "react-redux";
import { joinTrip } from "../../../actions/tripActions";

class ExploreTripsCard extends Component {
  onJoin = (id) => {
    this.props.joinTrip(id);
  };
  render() {
    const { trip, auth } = this.props;
    return (
      <div className="mb-5">
        <MDBRow>
          <MDBCol md="4">
            <MDBCard cascade>
              <Link to={``}>
                <MDBCardImage
                  cascade
                  className="img-fluid rounded"
                  overlay="white-light"
                  hover
                  src={trip.image ? trip.image : noimage}
                />
              </Link>
            </MDBCard>
          </MDBCol>
          <MDBCol className="d-flex flex-column justify-content-between">
            <MDBCardBody className="pt-0">
              <div className="d-flex justify-content-between align-items-center">
                <MDBCardTitle className="m-0 p-0">{trip.title}</MDBCardTitle>
                {trip.tourists.some(
                  (tourist) => tourist.user === auth.user.id
                ) ? (
                  "Joined"
                ) : (
                  <Link to="" onClick={() => this.onJoin(trip._id)}>
                    Join
                  </Link>
                )}
              </div>
              <hr />
              <MDBCardText>{trip.desc}</MDBCardText>
            </MDBCardBody>

            <MDBCard>
              <div className="rounded-bottom mdb-color lighten-3 text-center pt-3">
                <ul className="list-unstyled list-inline font-small">
                  <li className="list-inline-item pr-2 white-text">
                    <MDBIcon far icon="clock" /> Departure:{" "}
                    {new Date(trip.departureDate).toLocaleDateString()}
                  </li>
                  <li className="list-inline-item pr-2">
                    <a href="#!" className="white-text">
                      <MDBIcon icon="arrow-down" className="mr-1" />
                      Joined: {trip.tourists.length}
                    </a>
                  </li>
                  <li className="list-inline-item pr-2">
                    <a href="#!" className="white-text">
                      <MDBIcon icon="info" className="mr-1" />
                      Vacant: {trip.numberOfPeople - trip.tourists.length}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!" className="white-text">
                      <MDBIcon icon="coins" className="mr-1" />
                      Price: {trip.price}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#!" className="white-text">
                      <MDBIcon icon="cog" className="mr-1" />
                      Type: {trip.tripType}
                    </a>
                  </li>
                </ul>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <hr className="mt-5" />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { joinTrip })(ExploreTripsCard);

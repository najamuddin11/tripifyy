import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getTrip } from "../../../actions/tripActions";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Countdown from "react-countdown";
import noimage from "../../../assets/no-photo.png";

class ViewSingleTrip extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTrip(this.props.match.params.id);
  }
  render() {
    const { trip } = this.props.trip;
    const d = new Date();
    const t = new Date(trip.departureDate);
    return (
      <div style={{ margin: "120px 100px" }}>
        <MDBContainer className="mt-5">
          <MDBCol>
            <img
              src={trip.image ? trip.image : noimage}
              className="img-fluid"
              alt=""
              style={{ width: "100%" }}
            />
            <div
              style={{
                backgroundColor: "#E5E5E5",
                padding: "20px",
                textAlign: "center",
                borderBottom: "1px solid black",
                borderTop: "1px solid black",
              }}
            >
              <h1>{trip.title}</h1>
            </div>

            <div style={{ textAlign: "left", paddingTop: "25px" }}>
              <MDBRow>
                <MDBCol size="4">
                  <h5>Description:</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>{trip.desc}</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="4">
                  <h5>Destination:</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>{trip.designation}</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="4">
                  <h5>Departure:</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>
                    {new Date(trip.departureDate).toLocaleDateString("sq-AL", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </h5>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="4">
                  <h5>Number Of Days:</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>{trip.numberOfDays}</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="4">
                  <h5>Total no: Of People:</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>{trip.numberOfPeople}</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="4">
                  <h5>No: of people joined</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>{trip.tourists && trip.tourists.length}</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="4">
                  <h5>Collected Amount</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>{trip.tourists && trip.tourists.length * trip.price}</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="4">
                  <h5>Trip Type:</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>{trip.tripType}</h5>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol size="4">
                  <h5>Price:</h5>
                </MDBCol>
                <MDBCol size="8">
                  <h5>{trip.price}</h5>
                </MDBCol>
              </MDBRow>
            </div>
            <div
              style={{
                paddingTop: "25px",
                fontSize: "80px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "50px" }}>Time Remaining</div>
              {t - d && <Countdown date={Date.now() + (t - d)} />}
            </div>
          </MDBCol>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  trip: state.trip,
});

export default connect(mapStateToProps, { getTrip })(
  withRouter(ViewSingleTrip)
);

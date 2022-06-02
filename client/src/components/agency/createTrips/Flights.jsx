import React, { Component } from "react";
import { MDBBtn, MDBRow, MDBCol, MDBInput, MDBFormInline } from "mdbreact";
import DatePicker from "react-datepicker";
import { bookFlight } from "../../../actions/apiActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Flights extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      flightFrom: this.props.values.flightFrom,
      flightTo: this.props.values.flightTo,
      flightTravellors: this.props.values.flightTravellors,
      flightDepart: `${new Date(
        this.props.values.flightDepart
      ).getFullYear()}-0${
        new Date(this.props.values.flightDepart).getMonth() + 1
      }-${new Date(this.props.values.flightDepart).getDate()}`,
    };
    // console.log(data)
    this.props.bookFlight(data);
  };

  render() {
    const {
      values,
      handleChange,
      resetFields,
      errors,
      handleDate,
      handleRadio,
    } = this.props;
    const { flightFrom, flightTo, way, flightDepart, flightReturn } = values;
    const flightData = {
      flightFrom,
      flightTo,
      way,
      flightDepart,
      flightReturn,
    };
    const { flights, loading } = this.props;
    return (
      <div>
        <div className="ml-5 mr-5 pt-2">
          <h3>Flight Info</h3>
          <hr />
          <MDBRow center className="bg-white rounded ml-1 mr-1">
            <MDBCol md="10">
              <MDBInput
                label="From"
                value={values.flightFrom}
                onChange={handleChange("flightFrom")}
                outline
              />

              <MDBInput
                label="Where To"
                value={values.flightTo}
                onChange={handleChange("flightTo")}
                outline
              />

              <MDBFormInline className="d-flex">
                <MDBInput
                  gap
                  onClick={handleRadio(1)}
                  checked={values.way === 1 ? true : false}
                  label="one way"
                  type="radio"
                  id="radio1"
                  containerClass="mr-5"
                />
                <MDBInput
                  gap
                  onClick={handleRadio(2)}
                  checked={values.way === 2 ? true : false}
                  label="two way"
                  type="radio"
                  id="radio2"
                  containerClass="mr-5"
                />
              </MDBFormInline>
              <div className="d-flex">
                <MDBInput
                  label="Travelors"
                  value={values.flightTravellors}
                  onChange={handleChange("flightTravellors")}
                  outline
                />
                <span className="mr-4" />
                <DatePicker
                  selected={values.flightDepart}
                  onChange={handleDate("flightDepart")}
                  placeholderText="Departure Date"
                  minDate={new Date()}
                  className="mt-4 pl-2 pr-2 pb-1 pt-2 w-100 border border-light rounded"
                />
                <span className="mr-4" />

                <DatePicker
                  selected={values.flightReturn}
                  onChange={handleDate("flightReturn")}
                  placeholderText="Return Date"
                  minDate={values.flightDepart}
                  disabled={values.way === 1 ? true : false}
                  className="mt-4 pl-2 pr-2 pb-1 pt-2  w-100 border border-light rounded"
                />
              </div>

              <div>
                {flights.partner_url ? (
                  <a
                    className="btn btn-link"
                    href={flights.partner_url}
                    target="_blank"
                  >
                    Book Now
                  </a>
                ) : (
                  <MDBBtn
                    color="info"
                    id="searchFlights"
                    onClick={this.onSubmit}
                    className="display-flex align-items-center"
                    style={{ width: "200px", height: "50px" }}
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <div
                        className="spinner-border"
                        role="status"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      "Search Flights"
                    )}
                  </MDBBtn>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <MDBBtn
                  color="link"
                  onClick={() => resetFields({ ...flightData })}
                  className="blue-text"
                >
                  Reset Fields
                </MDBBtn>

                <MDBBtn
                  color="link"
                  onClick={() => {
                    resetFields({ ...flightData });
                    this.props.nextStep();
                  }}
                  className="blue-text"
                >
                  Skip
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
          <div className="d-flex flex-row-reverse">
            <MDBBtn
              color="link"
              size="lg"
              onClick={this.continue}
              className="blue-text"
            >
              Continue
            </MDBBtn>
            <MDBBtn
              color="link"
              size="lg"
              onClick={this.back}
              className="blue-text"
            >
              Back
            </MDBBtn>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  flights: state.api.flights,
  loading: state.api.loading,
});
export default connect(mapStateToProps, { bookFlight })(Flights);

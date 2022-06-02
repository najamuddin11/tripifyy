import React, { Component } from "react";
import Hotel from "./Hotel";
import { MDBBtn, MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";

import { getLocation, getHotels } from "../../../actions/apiActions";

import SearchBar from "../../../common/SearchBar.component";
class Hotels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  componentWillReceiveProps(nextProps) {}

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      location: this.state.search,
      checkin: `${new Date(this.props.values.checkin).getFullYear()}-${
        new Date(this.props.values.checkin).getMonth() + 1
      }-${new Date(this.props.values.checkin).getDate()}`,
    };
    this.props.getHotels(data);
  };
  render() {
    const { search } = this.state;
    const { values, handleDate, hotels, loading } = this.props;

    return (
      <div className="ml-5 mr-5 pt-2">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Hotels</h3>
          <MDBBtn color="link" className="blue-text" onClick={this.continue}>
            Skip
          </MDBBtn>
        </div>
        <hr />
        <div className="d-flex flex-row-reverse">
          <SearchBar
            iconColor="text-info"
            placeholder="Enter City"
            value={search}
            onChange={this.handleChange("search")}
            onClick={(e) => {
              this.content = (
                <div className="text-center">
                  <div
                    className="spinner-border text-primary mt-5 mb-5"
                    style={{ width: "10rem", height: "10rem" }}
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              );
              this.handleSubmit(e);
            }}
          />
        </div>
        <div>
          <DatePicker
            selected={values.checkin}
            onChange={handleDate("checkin")}
            placeholderText="Check In (Optional)"
            minDate={new Date()}
            className="mt-4 pl-2 pr-2 pb-1 pt-1 w-100 border border-light rounded"
          />
        </div>
        {loading && (
          <div className="text-center">
            <div
              className="spinner-border text-primary mt-5 mb-5"
              style={{ width: "10rem", height: "10rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {hotels &&
          hotels.map((hotel) => (
            <Hotel key={hotel.location_id} hotel={hotel} />
          ))}
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
    );
  }
}
const mapStateToProps = (state) => ({
  hotels: state.api.hotels,
  loading: state.api.loading,
});
export default connect(mapStateToProps, { getLocation, getHotels })(Hotels);

import React, { Component } from "react";
import Restaurant from "./Restaurant";
import { MDBBtn } from "mdbreact";
import SearchBar from "../../../common/SearchBar.component";
import { connect } from "react-redux";
import { getRestaurants } from "../../../actions/apiActions";
class Restaurants extends Component {
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

    this.props.getRestaurants(this.state.search);
  };

  render() {
    const { search } = this.state;
    const { restaurants, loading } = this.props.api;
    return (
      <div className="ml-5 mr-5 pt-2">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Restaurants</h3>
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
            onClick={this.handleSubmit}
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
        {restaurants &&
          restaurants.map((restaurant) => (
            <Restaurant key={restaurant.location_id} restaurant={restaurant} />
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
  api: state.api,
});
export default connect(mapStateToProps, { getRestaurants })(Restaurants);

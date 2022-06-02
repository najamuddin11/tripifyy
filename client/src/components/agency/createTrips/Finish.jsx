import React, { Component } from "react";
import { MDBBtn } from "mdbreact";

export default class Finish extends Component {
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="ml-5 mr-5 pt-2">
        <h3>Finish</h3>
        <hr />

        <h5 className="mt-5">Your Trip is Completed</h5>
        <br />
        <MDBBtn color="info" onClick={handleSubmit}>
          Submit
        </MDBBtn>
        <div className="d-flex flex-row-reverse">
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

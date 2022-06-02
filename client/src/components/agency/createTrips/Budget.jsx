import React, { Component } from "react";
import { MDBBtn, MDBRow, MDBCol, MDBInput } from "mdbreact";
import classnames from "classnames";
import ValidationError from "../../../common/ValidationError.component";

export default class Budget extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange, errors } = this.props;
    return (
      <div className="ml-5 mr-5 pt-2">
        <h3>Budget Info</h3>
        <hr />
        <div>
          <div className="d-flex flex-row-reverse">
            <MDBBtn color="link">Estimate Budget</MDBBtn>
          </div>
          <MDBRow center className="bg-white rounded ml-1 mr-1">
            <MDBCol>
              <MDBInput
                label="Price Per Person"
                value={values.price}
                onChange={handleChange("price")}
                outline
                className={
                  errors.price && classnames({ "is-invalid": errors.price })
                }
              />
              {errors.price && <ValidationError error={errors.price} />}
            </MDBCol>
          </MDBRow>
        </div>

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

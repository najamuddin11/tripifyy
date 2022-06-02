import React, { Component } from "react";
import { MDBBtn, MDBContainer, MDBInput, MDBRow, MDBCol } from "mdbreact";
import DatePicker from "react-datepicker";
import classnames from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import ValidationError from "../../../common/ValidationError.component";

export default class Destination extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  fileChangeHandler = (e) => {
    console.log(e.target);
    if (e.target.files[0]) {
      this.props.handleFile(e.target.name, e.target.files[0]);
      e.target.value = "";
    } else {
      this.props.handleFile(e.target.name, {});
      e.target.value = "";
    }
  };

  render() {
    const { values, handleChange, resetFields, errors, handleDate } =
      this.props;

    const {
      title,
      desc,
      designation,
      tripType,
      numberOfPeople,
      numberOfDays,
      departureDate,
      image,
    } = values;
    const destinationData = {
      title,
      desc,
      designation,
      tripType,
      numberOfPeople,
      numberOfDays,
      departureDate,
      image,
    };

    return (
      <div className="ml-5 mr-5 pt-2">
        <h3>Destination Info</h3>
        <hr />
        <MDBRow center className="bg-white rounded ml-1 mr-1">
          <MDBCol md="10">
            <MDBRow>
              <MDBCol>
                <MDBInput
                  label="Title"
                  value={values.title}
                  onChange={handleChange("title")}
                  outline
                  className={classnames({ "is-invalid": errors.title })}
                />
                {errors.title && <ValidationError error={errors.title} />}
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <MDBInput
                  type="textarea"
                  label="Description"
                  value={values.desc}
                  onChange={handleChange("desc")}
                  outline
                  className={classnames("rounded", {
                    "is-invalid": errors.desc,
                  })}
                />
                {errors.desc && (
                  <ValidationError className="mt-2 pt-3" error={errors.desc} />
                )}
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  label="Destination"
                  value={values.designation}
                  onChange={handleChange("designation")}
                  outline
                  className={classnames({ "is-invalid": errors.designation })}
                />
                {errors.designation && (
                  <ValidationError error={errors.designation} />
                )}
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  label="Trip Type"
                  value={values.tripType}
                  onChange={handleChange("tripType")}
                  outline
                  className={classnames({ "is-invalid": errors.tripType })}
                />
                {errors.tripType && <ValidationError error={errors.tripType} />}
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="4">
                <MDBInput
                  label="Number Of People"
                  type="number"
                  value={values.numberOfPeople}
                  onChange={handleChange("numberOfPeople")}
                  outline
                  className={classnames({
                    "is-invalid": errors.numberOfPeople,
                  })}
                />
                {errors.numberOfPeople && (
                  <ValidationError error={errors.numberOfPeople} />
                )}
              </MDBCol>
              <MDBCol md="4">
                <MDBInput
                  type="number"
                  label="Number Of Days"
                  value={values.numberOfDays}
                  onChange={handleChange("numberOfDays")}
                  outline
                  className={classnames({ "is-invalid": errors.numberOfDays })}
                />
                {errors.numberOfDays && (
                  <ValidationError error={errors.numberOfDays} />
                )}
              </MDBCol>
              <MDBCol md="4">
                <DatePicker
                  selected={values.departureDate}
                  onChange={handleDate("departureDate")}
                  placeholderText="Departure Date"
                  minDate={new Date()}
                  className="mt-4 pl-2 pr-2 pb-1 pt-1 w-100 border border-light rounded"
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol>
                <div className="pt-4 pb-4">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupFileAddon01"
                      >
                        Upload Image
                      </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="image"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        // value={image}
                        ref={image}
                        onChange={this.fileChangeHandler}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        {image.fileName}
                      </label>
                    </div>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
            <div className="d-flex justify-content-between">
              <MDBBtn
                color="link"
                onClick={() => resetFields({ ...destinationData })}
                className="blue-text"
              >
                Reset Fields
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
        </div>
      </div>
    );
  }
}

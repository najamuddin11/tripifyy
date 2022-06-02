import React from "react";
import { MDBIcon, MDBBtn } from "mdbreact";

export default function SearchBar({
  iconColor,
  placeholder,
  iconClassName,
  value,
  onChange,
  onSubmit,
  onClick,
}) {
  return (
    <div className="input-group md-form form-sm form-1 pl-0">
      <div className="input-group-prepend">
        <span className={`input-group-text ${iconClassName}`} id="basic-text1">
          <MDBIcon className={`${iconColor}`} icon="search" />
        </span>
      </div>
      <input
        className="form-control my-0 py-1"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Search"
      />
      <div className="input-group-append">
        <span className={`input-group-text p-0 border-0`}>
          <MDBBtn
            color="info"
            size="sm"
            type="submit"
            className="m-0 rounded-right"
            onSubmit={onSubmit}
            onClick={onClick}
          >
            Search
          </MDBBtn>
        </span>
      </div>
    </div>
  );
}

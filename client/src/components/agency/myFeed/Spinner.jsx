import React from "react";
import "./Spinner.scss";
const Spinner = () => {
  return (
    <div className="spinner-grow text-primary spinner-size" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

import React from "react";
import "./ValidationError.styles.scss";
export default function ValidationError({ error, className }) {
  return (
    <div style={{ position: "absolute" }}>
      <div className={`validationError ${className}`}>{error}</div>
    </div>
  );
}

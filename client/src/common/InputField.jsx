import React from "react";

const InputField = ({ name, prepend, hint, value, onChange, className }) => {
  return (
    <div data-test="input-group" className="input-group md-form mb-3 mt-0">
      <div className="input-group-prepend">{prepend}</div>
      <input
        data-test="input"
        className={className}
        type="text"
        name={name}
        placeholder={hint}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;

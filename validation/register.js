const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
    errors.firstName = "First Name must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 30 })) {
    errors.lastName = "Last Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name field is required";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

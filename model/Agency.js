const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AgencySchema = new Schema(
  {
    isAgency: {
      type: Boolean,
    },
    isUser: {
      type: Boolean,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Agency = mongoose.model("agency", AgencySchema);

module.exports = Agency;

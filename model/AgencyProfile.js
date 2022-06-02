const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AgencyProfileSchema = new Schema({
  agency: {
    type: Schema.Types.ObjectId,
    ref: "agency",
  },

  handle: {
    type: String,
    required: true,
    max: 40,
  },

  bio: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5.0,
  },
  tripCompletion: {
    type: Number,
    default: 100,
  },
  onTime: {
    type: Number,
    default: 100,
  },
  behaviour: {
    type: Number,
    default: 100,
  },
  earnedThisMonth: {
    type: Number,
    default: 0,
  },
  totalEarned: {
    type: Number,
    default: 0,
  },

  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
    google: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = AgencyProfile = mongoose.model(
  "agencyprofile",
  AgencyProfileSchema
);

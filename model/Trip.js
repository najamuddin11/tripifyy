const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TripSchema = new Schema({
  agency: {
    type: Schema.Types.ObjectId,
    ref: "agency",
  },
  designation: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  numberOfDays: {
    type: Number,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  tripType: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      agency: {
        type: Schema.Types.ObjectId,
        ref: "agency",
      },
    },
  ],
  tourists: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      agency: {
        type: Schema.Types.ObjectId,
        ref: "agency",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: (Date.now() + 5 * 60 * 60 * 1000).toString(),
      },
    },
  ],
  date: {
    type: Date,
    default: (Date.now() + 5 * 60 * 60 * 1000).toString(),
  },
});

module.exports = Trip = mongoose.model("trips", TripSchema);

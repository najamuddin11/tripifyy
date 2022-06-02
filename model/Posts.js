const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: "agency",
  },
  title: {
    type: String,
    // required:true
  },
  image: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
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
        default: Date.now() + 5 * 60 * 60 * 1000,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now() + 5 * 60 * 60 * 1000,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);

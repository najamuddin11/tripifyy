const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: "agency",
  },
  notification: [
    {
      likedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      message: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now() + 5 * 60 * 60 * 1000,
      },
      link: {
        type: String,
      },
    },
  ],
});

module.exports = Notification = mongoose.model(
  "notifications",
  NotificationSchema
);

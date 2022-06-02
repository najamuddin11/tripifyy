const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  room: {
    type: String,
    required: true,
  },
  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      agency: {
        type: Schema.Types.ObjectId,
        ref: "agency",
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Message = mongoose.model("message", MessageSchema);

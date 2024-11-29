const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    chatid: {type: String, required: true},
    members: {type: Array, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);

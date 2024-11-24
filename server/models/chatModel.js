const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
      chatname: {type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);

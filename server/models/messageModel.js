const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
      chatID: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat'},
      from: { type: String, required: true },
      to: { type: String, required: true },
      message: { type: String, required: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

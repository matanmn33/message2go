const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
      chatid: {type: String, required: true},
      from: { type: String, required: true },
      to: { type: String, required: true },
      messages: [
        {
          message: { type: String, required: true },
          sender: { type: String, required: true },
          createdAt: { type: Date, default: Date.now }, 
        }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);

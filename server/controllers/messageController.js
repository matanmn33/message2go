const Message = require("../models/messageModel");

const createChat = async (req, res) => {
  const {chatID, from, to, message } = req.body;

  const newMessage = new Message({
    chatID,
    from,
    to,
    message
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).send(savedMessage);
  } catch (err) {
    res.status(400).send("Could not create a new chat, ERROR: " + err.message);
  }
};

module.exports = {
  createChat,
};

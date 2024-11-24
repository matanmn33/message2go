const Chat = require("../models/chatModel");
const io = require("socket.io");

const joinChat = async (req, res) => {
  const { chatname } = req.body;

  const newChat = new Chat({
    chatname,
  });

  try {
    const chatRoom = await newChat.save();
    res.status(201).send(chatRoom);
  } catch (err) {
    res.status(400).send("Could not join the chat, ERROR: " + err.message);
  }
};

module.exports = {
  joinChat,
};

const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const createOrUpdateMessage = async ({ chatid, from, to, message }) => {
  let messageDoc = await Message.findOne({ chatid });

  if (messageDoc) {
    messageDoc.messages.push({ message, createdAt: new Date() });
    await messageDoc.save();
  } else {
    const newMessageDoc = new Message({
      chatid,
      from,
      to,
      messages: [{ message, createdAt: new Date() }],
    });
    await newMessageDoc.save();
  }
  return { success: true, chatid };
};

const findMessagesByChatId = async (chatid) => {
  return await Message.findOne({ chatid });
};

const createOrFindChat = async (chatid, members = []) => {
  let chat = await Chat.findOne({ chatid });
  if (!chat) {
    chat = new Chat({ chatid, members });
    await chat.save();
  }
  return chat;
};

module.exports = {
  createOrUpdateMessage,
  findMessagesByChatId,
  createOrFindChat,
};

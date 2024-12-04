const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const createOrUpdateMessage = async ({ chatid, from, to, message, sender }) => {
    let messageDoc = await Message.findOne({ chatid });
  
    if (messageDoc) {
      const isDuplicate = messageDoc.messages.some(
        (msg) =>
          msg.message == message &&
          msg.sender == sender &&
          new Date(msg.createdAt).getTime() === new Date().getTime()
      );
  
      if (!isDuplicate) {
        messageDoc.messages.push({ message, sender, createdAt: new Date() });
        await messageDoc.save();
      }
    } else {
      const newMessageDoc = new Message({
        chatid,
        from,
        to,
        messages: [{ message, sender, createdAt: new Date() }],
      });
      await newMessageDoc.save();
    }
    return { success: true, chatid };
  };
  

const findMessagesByChatId = async (chatid) => {
  return await Message.findOne({ chatid });
};

const createOrFindChat = async (chatid, members = []) => {
  let chat = await Chat.findOne({chatid});
  if (!chat) {
    chat = new Chat({chatid, members});
    await chat.save();
  }
  console.log(chat);
  return chat;
};

module.exports = {
  createOrUpdateMessage,
  findMessagesByChatId,
  createOrFindChat,
};

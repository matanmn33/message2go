const Chat = require('./models/chatModel');
const Message = require('./models/messageModel');

const socketHandler = (io) => {
// Socket.IO Logic
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    // When a user joins a chat
    socket.on("join_room", async (chatid) => {
      // Check if the chat room exists
      let chat = await Chat.findOne({ chatid });
      if (!chat) {
        // Create a new chat room if it doesn't exist
        chat = new Chat({ chatid });
        await chat.save();
      }
      socket.join(chatid);
      console.log(`User with ID: ${socket.id} joined room: ${chatid}`);
    });
  
    // Handle sending a message
    socket.on("send_message", async (data) => {
      const { chatid, from, to, message } = data;
  
      // Save the message to the database
      const newMessage = new Message({ chatid, from, to, message });
      await newMessage.save();
      // Emit the message to all users in the room
      socket.to(chatid).emit("receive_message", newMessage);
    });
  
    // When a user disconnects
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
 
}

module.exports = socketHandler;
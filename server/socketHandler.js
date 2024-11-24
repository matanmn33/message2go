const Chat = require('./models/chatModel');
const Message = require('./models/messageModel');

const socketHandler = (io) => {
// Socket.IO Logic
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    // When a user joins a chat
    socket.on("join_room", async (chatname) => {
      // Check if the chat room exists
      let chat = await Chat.findOne({ chatname });
      if (!chat) {
        // Create a new chat room if it doesn't exist
        chat = new Chat({ chatname });
        await chat.save();
      }
      socket.join(chatname);
      console.log(`User with ID: ${socket.id} joined room: ${chatname}`);
    });
  
    // Handle sending a message
    socket.on("send_message", async (data) => {
      const { chat, from, to, message } = data;
  
      // Save the message to the database
      const newMessage = new Message({ chat, from, to, message });
      await newMessage.save();
  
      // Emit the message to all users in the room
      socket.to(chat).emit("receive_message", newMessage);
    });
  
    // When a user disconnects
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
 
}

module.exports = socketHandler;
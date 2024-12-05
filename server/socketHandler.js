const { createOrUpdateMessage, createOrFindChat } = require("./services/chatService");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", async (chatid) => {
      try {
        const chat = await createOrFindChat(chatid);
        socket.join(chatid); 
        console.log(`User with ID: ${socket.id} joined room: ${chatid}`);
      } catch (error) {
        console.error("Error joining room:", error);
      }
    });
    

    socket.on("send_message", async (data) => {
      try {
        const { chatid, from, to, message, sender } = data;
    
        socket.to(chatid).emit("receive_message", { chatid, from, to, message, sender });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });


    socket.on("leave_room", (chatid) => {
      socket.leave(chatid);
      console.log(`User left chat room: ${chatid}`);
    });
    
      
  });
};

module.exports = socketHandler;

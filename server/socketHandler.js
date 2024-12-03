const { createOrUpdateMessage, createOrFindChat } = require("./services/chatService");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", async (chatid, members) => {
      try {
        const chat = await createOrFindChat({chatid, members});
        socket.join(chatid); // Ensure only the correct chatid is used
        console.log(`User with ID: ${socket.id} joined room: ${chatid}`);
      } catch (error) {
        console.error("Error joining room:", error);
      }
    });
    

    socket.on("send_message", async (data) => {
      try {
        const { chatid, from, to, message, sender } = data;
    
        // Avoid persisting the message again in the database if already handled
        socket.to(chatid).emit("receive_message", { chatid, from, to, message, sender });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
};

module.exports = socketHandler;

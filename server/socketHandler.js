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
        const { chatid, from, to, message } = data;

        const result = await createOrUpdateMessage({ chatid, from, to, message });

        socket.to(chatid).emit("receive_message", { chatid, from, to, message });
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

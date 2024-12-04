import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function InputChat({ connectedUser, chatid, selectedContact }) {

  socket.emit("join_room", chatid); // Join the room with the chatid

  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !chatid) {
      console.warn("Message or chat ID is missing.");
      return;
    }

    const messageData = {
      chatid,
      from: connectedUser?.userId,
      to: selectedContact?.userId,
      message,
      sender: connectedUser?.username,
    };

    try {
      socket.emit("send_message", messageData);

      await axios.post("http://localhost:3000/api/users/newChat", messageData);

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="send-msg d-flex flex-row w-100">
      <Form.Control
        className="w-90 mx-2 rounded-5"
        type="text"
        name="message"
        placeholder="Write your message here..."
        value={message}
        onChange={handleMessageChange}
      />
      <Button
        variant="success"
        className="send-msg-btn rounded-5 w-10"
        onClick={handleSendMessage}
      >
        <i className="bi bi-send me-2"></i>
      </Button>
    </div>
  );
}

export default InputChat;

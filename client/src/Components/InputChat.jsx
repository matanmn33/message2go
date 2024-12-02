import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function InputChat({connectedUser}) {
  const [message, setMessage] = useState("");

  // Handle the change in the message input field
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending the message
  const handleSendMessage = () => {
    if (message.trim()) {
      const messageData = {
        chatid,
        from: connectedUser?.userId,
        to: selectedContact?.userId,  // Use the selected contact's userId here
        message,
        sender: connectedUser?.username,
      };

      sendMessage(messageData); // Call the sendMessage function passed from Chat.js
      setMessage(""); // Clear the input field after sending the message
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
        onChange={handleMessageChange} // Update message state when user types
      />
      <Button
        variant="success"
        className="send-msg-btn rounded-5 w-10"
        onClick={handleSendMessage} // Trigger message send on click
      >
        <i className="bi bi-send me-2"></i>
      </Button>
    </div>
  );
}

export default InputChat;

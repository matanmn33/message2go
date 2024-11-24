import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Button, Modal, Form } from "react-bootstrap";

function InputChat({connectedUser}) {

  const [chat, setChat] = useState("");

  const socket = io('http://127.0.0.1:3000');

  const joinChat = () => {
    if (connectedUser !== "" && chat !== "") {
      socket.emit("join_room", { id: connectedUser?.userId }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  };

  return (
    <>

      <div className="send-msg d-flex flex-row w-100'">

        <Form.Control
          className="w-90 mx-2 rounded-5"
          type="text"
          name="message"
          placeholder="Write your message here..."
        />
        <Button variant="success" className="send-msg-btn rounded-5 w-10" onClick={joinChat}> <i className="bi bi-send me-2"></i> </Button>

      </div>
    </>
  );
}

export default InputChat;

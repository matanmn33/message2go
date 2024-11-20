import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function InputChat() {
  return (
    <>
      <div className="send-msg d-flex flex-row w-100'">

        <Form.Control
          className="w-90 mx-2 rounded-5"
          type="text"
          name="message"
          placeholder="Write your message here..."
        />
        <Button variant="success" className="send-msg-btn rounded-5 w-10"> <i className="bi bi-send me-2"></i> </Button>

      </div>
    </>
  );
}

export default InputChat;

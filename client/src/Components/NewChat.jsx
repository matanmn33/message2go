import { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';

function NewChat() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" className="rounded-5 new-chat ps-2" onClick={handleShow}>
      <i className="bi bi-chat-dots me-2"></i> Create a new Chat
      </Button>

    </>
  );
}

export default NewChat;
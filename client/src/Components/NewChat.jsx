import { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';

function NewChat({connectedUser}) {
  const [show, setShow] = useState(false);

  const [newMessage, setNewMessage] = useState({
    chatID: '',
    to: '',
    from: 'connectedUser.userId',
    message: '',
  });

  const sendNewMsg = () => {
    console.log('Msg sent.');
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" className="rounded-5 new-chat ps-2 w-100" onClick={handleShow}>
      <i className="bi bi-chat-dots me-2"></i> Create a new Chat
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send a new Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form
            onSubmit={(e) => {
              e.preventDefault(), sendNewMsg();
            }}
          >
            <Form.Control
              className="mb-2"
              type="text"
              name="to"
              placeholder="Recipient"
              onChange={(e) =>
                setNewMessage({ ...newMessage, to: e.target.value })
              }
            />
            <Form.Control
              className="mb-2"
              type="text"
              name="message"
              as="textarea"
              placeholder="Type your message here..."
              onChange={(e) =>
                setNewMessage({ ...newMessage, message: e.target.value })
              }
            />

            <Button variant="primary" type="submit">
              Send
            </Button>
            
          </Form>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default NewChat;
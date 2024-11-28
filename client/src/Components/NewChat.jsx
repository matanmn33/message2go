import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function NewChat({ connectedUser }) {
  const [show, setShow] = useState(false);

  const [newMessage, setNewMessage] = useState({
    chatID: "",
    to: "",
    from: connectedUser.username,
    message: "",
  });

  const sendNewMsg = () => {
    console.log("Msg sent:", newMessage);
  };

  const contactsArr = connectedUser.contacts || [];

  const usersList = () => {
    if (!contactsArr || contactsArr.length === 0) {
      return <option disabled>No contacts available</option>;
    }
    return contactsArr.map((contact) => (
      <option key={contact} value={contact}>
        {contact}
      </option>
    ));
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="secondary"
        className="rounded-5 new-chat ps-2 w-100"
        onClick={handleShow}
      >
        <i className="bi bi-chat-dots me-2"></i> Create a new Chat
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send a new Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              sendNewMsg();
            }}
          >
            <Form.Select
              className="mb-2"
              onChange={(e) =>
                setNewMessage({ ...newMessage, to: e.target.value })
              }
            >
              <option>Select User To Send Message</option>
              {usersList()}
            </Form.Select>

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

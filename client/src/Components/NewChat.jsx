import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { uid } from "uid";
import io from "socket.io-client";
const socket = io("http://localhost:3000"); 

function NewChat({ connectedUser }) {
  const [show, setShow] = useState(false);

  const [selectedContact, setSelectedContact] = useState("");

  const [newMessage, setNewMessage] = useState({
    chatID: "",
    to: "",
    from: "",
    message: "",
  });

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

  const sendNewMsg = async () => {
    if (!selectedContact) {
      console.error("No contact selected!");
      return;
    }

    const chatID = uid();

    try {
      const chatResponse = await axios.post(
        "http://localhost:3000/api/users/addChat",
        {
          chatid: chatID,
          members: [connectedUser.username, selectedContact],
        }
      );

      const messageResponse = await axios.post(
        "http://localhost:3000/api/users/newChat",
        {
          chatid: chatID,
          from: connectedUser.username,
          to: selectedContact,
          message: newMessage.message,
        }
      );

      socket.emit("join_room", {
        chatID,
        members: [connectedUser.username, selectedContact],
      });

      socket.emit("send_message", {
        chatid: chatID,
        from: connectedUser.username,
        to: selectedContact,
        message: newMessage.message,
      });

      setShow(false);
      setSelectedContact("");
    } catch (err) {
      console.error(
        "Error creating chat or message:",
        err.response?.data || err.message
      );
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="secondary"
        className="rounded-5 new-chat ps-2 mt-3 mx-auto"
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
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
            >
              <option value="">Select User To Send Message</option>
              {usersList()}
            </Form.Select>

            <Form.Control
              className="mb-2"
              type="text"
              name="message"
              as="textarea"
              placeholder="Type your message here..."
              value={newMessage.message}
              onChange={(e) =>
                setNewMessage((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
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

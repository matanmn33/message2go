import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Menu from "./Menu";
import NewChat from "./NewChat";
import InputChat from "./InputChat";
import io from "socket.io-client";

function Chat() {
  const [systemUsers, setSystemUsers] = useState([]);
  const [connectedUser, setConnectedUser] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);
  const [chatAlreadyOpen, setChatAlreadyOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const socket = io("http://localhost:3000");

  const userDecoded = async () => {
    if (cookies.token) {
      try {
        const decodedToken = jwtDecode(cookies.token);
        const decodedTokenId = decodedToken.userId;
        const response = await axios.get(
          `http://localhost:3000/api/users/getUser/${decodedTokenId}`
        );
        const userObj = response.data;
        setConnectedUser(userObj);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/all");
      const dataUsers = response.data;
      const usernames = dataUsers.map((user) => user.username);
      setSystemUsers(usernames);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getChats = async () => {
    try {
      const axios_chats = await axios.get(
        "http://localhost:3000/api/users/getChats"
      );
      const dataChats = axios_chats.data;

      // Filter chats that belong to the connected user
      const filteredChats = dataChats.filter((chat) =>
        chat.members.includes(connectedUser.username)
      );

      // If no chats found, clear the state (or show a message)
      if (filteredChats.length === 0) {
        setChats([]); // Set empty array or show no chats message
        return;
      }

      // Set the filtered chats to state
      setChats(filteredChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // Update messages when a chat is selected
  const showCurrentChat = async (chatid) => {
    try {
      const current_message = await axios.get(
        `http://localhost:3000/api/users/getMessage/${chatid}`
      );
      const current_message_data = current_message.data;

      // Only show messages relevant to the logged-in user and the selected chat
      const filteredMessages = current_message_data.messages.filter(
        (msg) =>
          msg.sender === connectedUser.userId || msg.to === connectedUser.userId
      );
      setMessages(filteredMessages);

      // Set the selected contact based on the chat
      const contact = current_message_data.to;
      setSelectedContact({ username: contact });
      setCurrentChatId(chatid); // Set the current chat ID
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    userDecoded();
    checkToken();
    getUsers();
    getChats();
  }, []);

  useEffect(() => {
    if (connectedUser?.username) {
      getChats();
    }
  }, [connectedUser]); // Trigger getChats whenever connectedUser changes

  const checkToken = () => {
    if (!cookies.token) {
      navigate("/");
    }
  };


// Add this to your component
useEffect(() => {
  // Listen for "receive_message" event from the server
  socket.on("receive_message", (data) => {
    console.log("New message received:", data);
    setMessages((prevMessages) => [...prevMessages, data]); // Update state with the new message
  });

  // Cleanup the socket listener when the component unmounts
  return () => {
    socket.off("receive_message");
  };
  
}, []);



  return (
    <>
      <Menu />

      <Container fluid>
        <div className="chat-main">
          <div className="chat-container mt-4 d-flex flex-row justify-content-center">
            <div className="user-chats col-2 bg-primary bg-opacity-75 p-0 mx-0 border-1 rounded-5 d-flex flex-column">
              <NewChat connectedUser={connectedUser} allchats={chats}/>
              <div className="registered-chats mt-3 d-flex flex-column mx-0 px-0">
                {chats.length > 0 ? (
                  chats.map((chat, i) => (
                    <a
                      onClick={() => showCurrentChat(chat.chatid)}
                      className="chat-list text-light text-start py-2 px-4 border-bottom border-1 text-decoration-none"
                      key={i + "_" + chat.chatid}
                    >
                      {chat.members.filter(
                        (member) => member != connectedUser.username
                      )}
                    </a>
                  ))
                ) : (
                  <p className="px-2 mx-auto">No chats available.</p>
                )}
              </div>
            </div>

            <div className="user-current-chat col-9 bg-primary bg-opacity-75 p-3 ms-2 border-1 rounded-5 d-flex flex-column justify-content-between">
              <div className="chat-current-msgs">
                {messages.length > 0 ? (
                  messages.map((msg, i) => (
                    <div key={i + "_" + msg._id}>
                      <strong>
                        {msg.sender === connectedUser.userId
                          ? "You"
                          : msg.sender}
                        :
                      </strong>{" "}
                      {msg.message}
                    </div>
                  ))
                ) : (
                  <p className="px-2">No messages available.</p>
                )}
              </div>
              <InputChat
                connectedUser={connectedUser}
                chatid={currentChatId}
                selectedContact={selectedContact}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Chat;

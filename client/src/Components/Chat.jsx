import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Menu from "./Menu";
import NewChat from "./NewChat";
import InputChat from "./InputChat";

function Chat() {

  const [systemUsers, setSystemUsers] = useState([]);

  const [connectedUser, setConnectedUser] = useState({});

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
      const response = await axios.get('http://localhost:3000/api/users/all');
      const dataUsers = response.data;
      const usernames = dataUsers.map(user => user.username);
      setSystemUsers(usernames);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const getChats = async() => {
    const axios_chats = await axios.get('http://localhost:3000/api/users/getChats');
    const dataChats = axios_chats.data;
    setChats(dataChats);
  }

  const showCurrentChat = async(chatid) => {
    const current_message = await axios.get('http://localhost:3000/api/users/getMessage/' + chatid);
    const current_message_data = current_message.data;
    setMessages(current_message_data.messages);
  }

  useEffect(() => {
    userDecoded();
    checkToken();
    getUsers();
    getChats();
  }, []);

  const checkToken = () => {
    if (!cookies.token) {
      navigate("/");
    }
  };

  return (
    <>
     
      <Menu/>

      <Container fluid>
        <div className="chat-main">
          <div className="chat-container mt-4 d-flex flex-row justify-content-center">
            <div className="user-chats col-2 bg-primary bg-opacity-75 p-0 mx-0 border-1 rounded-5 d-flex flex-column">
              <NewChat connectedUser={connectedUser}/>
              <div className="registered-chats mt-3 d-flex flex-column mx-0 px-0">
                   {chats.length > 0 ? (
                    chats.map((chat, i) => (
                      <a onClick={() => showCurrentChat(chat.chatid)} className="chat-list text-light text-start py-2 px-4 border-bottom border-1 text-decoration-none" key={i + "_" + chat.chatid}>
                         {
                         chat.members[1]
                         } 
                      </a> 
                    ))
                  ) : (
                    <p className="px-2 mx-auto">No chats available.</p>
                  )}
              </div>
            </div>

            <div className="user-current-chat col-9 bg-primary bg-opacity-75 p-3 ms-2 border-1 rounded-5 d-flex flex-column justify-content-between">
              <div className="chat-current-msgs">
                {
                  messages.length > 0? (
                    messages.map((msg, i) => (
                      <div key={i + "_" + msg._id}>
                        {msg.message}
                      </div>
                    ))
                  ) : (
                    <p className="px-2">No messages available.</p>
                  )
                }
              </div>
              <InputChat/>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Chat;

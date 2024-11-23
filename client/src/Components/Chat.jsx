import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NewChat from "./NewChat";
import InputChat from "./InputChat";
import HeaderButtonsChat from "./HeaderButtonsChat";

function Chat() {

  const [messages, setMessages] = useState([]);
  const [cookies, setCookie, removeCookie]  = useCookies(["token"]);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    if (!cookies.token) {
      navigate('/');
    } 
  }

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     const response = await fetch("https://jsonplaceholder.com/users");
  //     const data = await response.json();
  //     setMessages(data);
  //   };

  //   fetchMessages();
  // }, []);

  const [currentUser, setCurrentUser] = useState({});

  return (
    <>
      <Container fluid>
        <h4 className="text-center m-3">Message2Go</h4>
        <div className="chat-main">
          <div className="chat-header container d-flex justify-content-between mt-4">
            <h5 className="m-0 alert alert-light rounded-5">Welcome, {currentUser.name} Matan!</h5>
            <HeaderButtonsChat/>
          </div>

          <div className="chat-container mt-4 d-flex flex-row justify-content-center">

            <div className="user-chats col-2 bg-primary bg-opacity-75 p-3 me-2 border-1 rounded-5 d-flex flex-column">
              <NewChat/>
              <div className="registered-chats mt-3">
                <ul>
                  {/* Render chat names here */}
                  <li>Chat 1</li>
                  <li>Chat 2</li>
                  <li>Chat 3</li>
                  <li>Chat 4</li>
                  <li>Chat 5</li>
                  <li>Chat 6</li>
                  <li>Chat 7</li>
                  <li>Chat 8</li>
                  <li>Chat 9</li>
                  <li>Chat 10</li>
                  <li>Chat 11</li>
                  <li>Chat 12</li>
                  <li>Chat 13</li>
                  <li>Chat 14</li>
                  <li>Chat 15</li>
                  <li>Chat 16</li>
                  <li>Chat 17</li>
                  <li>Chat 18</li>
                </ul>
              </div>
            </div>

            <div className="user-current-chat col-9 bg-primary bg-opacity-75 p-3 ms-2 border-1 rounded-5 d-flex flex-column justify-content-between">
              <div className="chat-current-msgs">
                Test test test
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

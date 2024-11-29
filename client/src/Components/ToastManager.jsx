import React, { useState, useEffect, useContext } from "react";
import { Button, Toast } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ToastManager() {
  const [cookies] = useCookies(["token"]);

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

  useEffect(() => {
    userDecoded();
    checkToken();
  }, []);

  const navigate = useNavigate();

  const checkToken = () => {
    if (!cookies.token) {
      navigate("/");
    }
  };

  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <>
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <strong className="me-auto">Message2Go</strong>
        </Toast.Header>
        <Toast.Body>{ToastContent}</Toast.Body>
      </Toast>
    </>
  );
}

export default ToastManager;

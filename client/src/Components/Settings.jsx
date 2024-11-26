import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Menu from "./Menu";

function SettingsPage() {
  const [cookies] = useCookies(["token"]);

  const [connectedUser, setConnectedUser] = useState({});
  const [alert, setAlert] = useState(false);

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

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
  });

  const saveSettings = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/users/updateUser/${connectedUser._id}`,
        userInfo
      );
      setConnectedUser({ ...connectedUser, ...userInfo });
      setAlert(true);
    } catch (err) {
      console.log(err);
    }
  };

  const alertPush = () => {
    if (alert == true) {
      return (
        <div>
          <p className="userinfo-update alert alert-success mx-2 mt-3 p-2 rounded-3">
            User updated!
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Menu />

      <Container>
        <div className="w-lg-50 mx-auto">
          <h3 className="mt-2 pb-2">User Information Settings</h3>

          <Form.Label className="badge bg-secondary mt-4">Username</Form.Label>
          <Form.Control
            className="w-90 me-2 rounded-3 mt-2"
            type="text"
            name="username"
            placeholder={connectedUser?.username}
            readOnly
          />

          <Form.Label className="badge bg-secondary mt-4">Email</Form.Label>
          <Form.Control
            className="w-90 me-2 rounded-3 mt-2"
            type="text"
            name="email"
            placeholder={connectedUser?.email}
            readOnly
          />
          <Form.Label className="badge bg-secondary mt-4">
            First Name
          </Form.Label>

          <Form.Control
            className="w-90 me-2 rounded-3 mt-2"
            type="text"
            name="first_name"
            placeholder={connectedUser?.first_name}
            onChange={(e) => {
              setUserInfo({ ...userInfo, first_name: e.target.value });
            }}
          />

          <Form.Label className="badge bg-secondary mt-4">Last Name</Form.Label>

          <Form.Control
            className="w-90 me-2 rounded-3 mt-2"
            type="text"
            name="last_name"
            placeholder={connectedUser?.last_name}
            onChange={(e) => {
              setUserInfo({ ...userInfo, last_name: e.target.value });
            }}
          />
          <Button
            variant="success"
            className="send-msg-btn rounded-2 me-2 w-10 mt-4"
            onClick={saveSettings}
          >
            Save
          </Button>

          {alertPush()}
        </div>
      </Container>
    </>
  );
}

export default SettingsPage;

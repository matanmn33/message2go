import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import HeaderButtonsChat from "./HeaderButtonsChat";

function Menu() {
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
  }, []);

  return (
    <>
    <Navbar expand="lg" className="bg-primary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/chat">
          Message2Go
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="d-flex m-0 p-0 ms-auto">
            <HeaderButtonsChat/>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <p className="hello-user alert alert-info p-2 m-3">Logged as: <span className="text-decoration-underline fw-semibold">{connectedUser.username}</span>, Good to see you! Gimme My MONEY!</p>
    </>
  );
}

export default Menu;

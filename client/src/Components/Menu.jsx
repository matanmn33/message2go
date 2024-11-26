import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import HeaderButtonsChat from "./HeaderButtonsChat";

function Menu() {
  return (
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
  );
}

export default Menu;

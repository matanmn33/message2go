import React, {useState, useEffect} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {Container} from "react-bootstrap";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

function Home() {

  const [cookies, setCookie, removeCookie]  = useCookies(["token"]);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    if (cookies.token) {
      navigate('/chat');
    } 
  }

  return (
    <>
      <Container fluid>
        <div className="home-main">
          <div className="home-content d-flex flex-column justify-content-center align-items-center">
            <div className="home-text">
              <h1 className="fs-1 display-1 fw-semibold p-0 m-0 text-center">Message2Go</h1>
              <h5 className="fw-light p-0 my-2 text-center">Social Responsive Web Messenger Application</h5>
            </div>
            <div className="home-buttons">
              <SignUpModal />
              <LoginModal />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;

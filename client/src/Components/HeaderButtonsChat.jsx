import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function HeaderButtonsChat() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const logoutBtn = () => {
    removeCookie("token", { path: "/" }); 
  };

  return (
    <>
      <div className="chat-header-buttons">
        <Button
          variant="light"
          className="contacts-btn align-self-end rounded-4 me-2 ps-2 py-1"
        >
          <i className="bi bi-people me-2"></i>
          Contacts
        </Button>

        <Button
          variant="light"
          className="settings-btn align-self-end rounded-4 mx-1 ps-2 py-1"
        >
          <i className="bi bi-gear me-2"></i>
          Settings
        </Button>

        <Button
          as={Link}
          to={"/"}
          onClick={()=> logoutBtn()}
          variant="danger"
          className="logout-btn align-self-end rounded-4 mx-1 ps-2 py-1"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </Button>
      </div>
    </>
  );
}

export default HeaderButtonsChat;

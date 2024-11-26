import React, { useState, useEffect } from "react";
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
      <div className="chat-header-buttons d-flex flex-column flex-lg-row gap-2 mt-1 mt-lg-0">
        <Button
          variant="light"
          className="btn-sm contacts-btn rounded-4 m-0 ps-2 py-1 float-start"
        >
          <i className="bi bi-people me-2"></i>
          Contacts
        </Button>

        <Button
          variant="light"
          className="btn-sm settings-btn rounded-4 m-0 ps-2 py-1 float-start"
          as={Link}
          to={"/settings"}
        >
          <i className="bi bi-gear me-2"></i>
          Settings
        </Button>

        <Button
          as={Link}
          to={"/"}
          onClick={()=> logoutBtn()}
          variant="danger"
          className="btn-sm logout-btn rounded-4 m-0 ps-2 py-1"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </Button>
      </div>
    </>
  );
}

export default HeaderButtonsChat;

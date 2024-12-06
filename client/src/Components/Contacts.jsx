import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { uid } from "uid";
import axios from "axios";
import Menu from "./Menu";

function Contacts() {
  const [cookies] = useCookies(["token"]);

  const [connectedUser, setConnectedUser] = useState({});

  const verify = {
    headers: { Authorization: `Bearer ${cookies}` },
    withCredentials: true
  }

  const userDecoded = async () => {
    if (cookies.token) {
      try {
        const decodedToken = jwtDecode(cookies.token);
        const decodedTokenId = decodedToken.userId;
        const response = await axios.get(
          `http://localhost:3000/api/users/getUser/${decodedTokenId}`, verify
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

  const showContacts = () => {
    const contactsHere = connectedUser.contacts;

    if (!contactsHere || contactsHere.length === 0) {
      return <p>No contacts available.</p>;
    }

    return (
      <ul className="contacts-ul m-0 p-0 fw-semibold ">
        {contactsHere.map((contact) => (
          <div key={uid()}>
            <li className="type-li">
              {contact}
              <Button
                variant="danger"
                className="btn-sm rounded-4 m-1 px-2 py-1"
                onClick={() => deleteContact(contact)}
              >
                Remove
              </Button>
            </li>
            </div>
        ) )}
      </ul>
    );
  };

  const tempArray = connectedUser.contacts;

  const deleteContact = async(contact) => {
    try {
      const updatedContacts = tempArray.filter((item) => item!== contact);
      await axios.post(
        `http://localhost:3000/api/users/addContact/${connectedUser._id}`, 
        { contacts: updatedContacts }, verify
      );
      setConnectedUser({...connectedUser, contacts: updatedContacts });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

  return (
    <>
      <Menu />

      <Container>
        <div className="w-lg-50 mx-auto">
          <h3 className="mt-2 pb-2">Contacts</h3>
          <p className="fw-semibold">
            Here are all your contacts, if you feel like removing someone - you
            can!
          </p>

          <div className="all-contacts mt-2">{showContacts()}</div>
        </div>
      </Container>
    </>
  );
}

export default Contacts;

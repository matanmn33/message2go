import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Menu from "./Menu";

function SearchUsers() {
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
    getAllUsers();
  }, []);

  const navigate = useNavigate();

  const checkToken = () => {
    if (!cookies.token) {
      navigate("/");
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/all");
      const allUsers = res.data;
      setGetUsers(allUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const [userContacts, setUserContacts] = useState({
    contacts: [],
  });

  const addContact = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/users/addContact/${connectedUser._id}`,
        userContacts
      );
      setConnectedUser({ ...connectedUser, ...userContacts });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddUser = (user) => {
    setUserContacts({ contacts: [...connectedUser.contacts, user ]});
    addContact();
  };

  const searchForUser = (e) => {
    const { value } = e.target.previousElementSibling;
    const foundUser = getUsers.find((user) => user.username === value);
    if (foundUser) {
      setSearchUser(foundUser);
    } else {
      setSearchUser("Not Found.");
    }
  };

  const searchResult = () => {    
    if (searchUser == "") {
      return null;
    }
    if (searchUser != "Not Found.") {
      return (
        <>
          <div className="search-result bg-success bg-opacity-50 rounded-4 p-3 w-50 mt-2">
            <p className="mt-2">Search Result:</p>
            <ul className="m-0 p-0">
              <li key={searchUser._id} className="search-users-li">
                <span className="fs-5 me-2">{searchUser.username}</span>
                <Button
                  variant="primary"
                  className="btn-sm rounded-4 m-1 px-2 py-1"
                  onClick={() => handleAddUser(searchUser)}
                >
                  Add as Contact
                </Button>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return <p className="mt-2">User not found.</p>;
    }
  };

  const [getUsers, setGetUsers] = useState([]);

  const [searchUser, setSearchUser] = useState("");

  return (
    <>
      <Menu />

      <Container>
        <div className="w-lg-50 mx-auto">
          <h3 className="mt-2 pb-2">Search Users</h3>
          <p>
            Search for new Contacts from Message2Go and add them as you wish.
          </p>

          <div className="d-flex flex-row align-items-baseline">
            <Form.Control
              className="w-90 me-2 rounded-3 mt-2 searchInput"
              type="text"
              name="search-user"
              placeholder="Search User..."
            />
            <Button
              variant="secondary"
              className="btn-sm rounded-3 w-10 m-1 p-2"
              onClick={(e) => searchForUser(e)}
            >
              Search
            </Button>
          </div>

          {searchResult()}

          <div className="all-users mt-2">
            <h3 className="mt-4 pb-1 bg-light bg-opacity-75 text-primary rounded-3 px-2 py-1 all-users-heading">
              Message2Go Users
            </h3>
            <p>
              Do you see someone you already know and want to add as a Contact?
            </p>
            <ul className="m-0 p-0">
              {getUsers.map((user) => (
                <li key={user._id} className="search-users-li">
                  <span className="fs-5 me-2">{user.username}</span>
                  <Button
                    variant="secondary"
                    className="btn-sm rounded-4 m-1 px-2 py-1"
                    onClick={() => handleAddUser(user)}
                  >
                    Add as Contact
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SearchUsers;

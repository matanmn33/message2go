import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function LoginModal() {
  const [show, setShow] = useState(false);

  const [userParams, setuserParams] = useState({
    username: null,
    password: null,
  });

  const [errorMsg, seterrorMsg] = useState(null);
  const [userData, setuserData] = useState({});
  const [cookies, setCookie] = useCookies(["token"]);

  const [LoginFlag, setLoginFlag] = useState(false);
  const [ThrowMsg, setThrowMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (LoginFlag == true) {
      checkToken();
      throwErrorMsg();
    }
  });

  const loginButton = async () => {
    setLoginFlag(true);
    try {
      await axios
        .post("http://127.0.0.1:3000/api/users/login", userParams)
        .then((response) => setuserData(response.data));
      seterrorMsg(userData);
    } catch (err) {
      console.log(err);
    }
  };

  const checkToken = () => {
    if (cookies.token) {
      return navigate("/chat");
    }
  };

  const Msg = () => {
    return <p className="alert alert-danger">{ThrowMsg}</p>;
  };

  const throwErrorMsg = () => {
    if (errorMsg !== null) {
      if (userData.message !== "Logged in successfully") {
        setThrowMsg("Username or password is incorrect. Please try again.");
      } else {
        setCookie("token", userData.token, {
          path: "/",
          secure: false,
          sameSite: "strict",
          maxAge: 43200,
        });
      }
    }
    return null;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="rounded-5 p-3 fs-4 m-2 w-100"
        onClick={handleShow}
      >
        Login
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login to Message2Go platform</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ThrowMsg ? Msg() : null}

          <Form
            onSubmit={(e) => {
              e.preventDefault(), loginButton();
            }}
          >
            <Form.Control
              className="mb-2"
              type="text"
              name="username"
              placeholder="Username..."
              onChange={(e) =>
                setuserParams({ ...userParams, username: e.target.value })
              }
            />
            <Form.Control
              className="mb-2"
              type="password"
              name="password"
              placeholder="Password..."
              onChange={(e) =>
                setuserParams({ ...userParams, password: e.target.value })
              }
            />
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;

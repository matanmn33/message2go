import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

function SignUpModal() {
  const [registerParams, setRegisterParams] = useState({
    username: undefined,
    email: undefined,
    first_name: undefined,
    last_name: undefined,
    password: undefined,
    password_confirm: undefined,
  });

  const [registredStatus, setregistredStatus] = useState(null);
  const [registerError, setregisterError] = useState("");

  const registerButton = async () => {
    try {
      if (
        !registerParams.username ||
        !registerParams.email ||
        !registerParams.first_name ||
        !registerParams.last_name ||
        !registerParams.password ||
        !registerParams.password_confirm
      ) {
        registredStatus("All fields are required");
      }

      if (registerParams.password !== registerParams.password_confirm) {
        registredStatus("Passwords do not match");
      }
      if (registerParams.password == registerParams.password_confirm) {
        await axios.post(
          "http://127.0.0.1:3000/api/users/register",
          registerParams
        );
        setregistredStatus("ok");
      }
    } catch (err) {
      setregistredStatus("notok crash");
      setregisterError(err);
    }
  };

  const renderRegisterMessage = () => {
    if (registredStatus == "ok") {
      return (
        <p className="alert alert-success">
          Hey {registerParams.username}, you have successfully registered to
          Message2Go.
        </p>
      );
    }

    if (
      registredStatus == "notok crash" ||
      registredStatus == "Passwords do not match" ||
      registredStatus == "All fields are required" 
    ) {
      
      return (
        <p className="alert alert-danger">
          Something went wrong, check empty fields or password.
        </p>
      );
    }

    return null;
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        className="rounded-5 p-3 fs-4 m-2 w-100"
        onClick={handleShow}
      >
        Sign-up
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign-up to Message2Go platform</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {renderRegisterMessage()}



          <Form onSubmit={(e)=>{e.preventDefault(), registerButton()}}>
            <Form.Control
              className="mb-2"
              type="text"
              name="username"
              placeholder="Username..."
              onChange={(e) =>
                setRegisterParams({
                  ...registerParams,
                  username: e.target.value,
                })
              }
            />
            <Form.Control
              className="mb-2"
              type="text"
              name="fname"
              placeholder="First Name..."
              onChange={(e) =>
                setRegisterParams({
                  ...registerParams,
                  first_name: e.target.value,
                })
              }
            />
            <Form.Control
              className="mb-2"
              type="text"
              name="lname"
              placeholder="Last Name..."
              onChange={(e) =>
                setRegisterParams({
                  ...registerParams,
                  last_name: e.target.value,
                })
              }
            />
            <Form.Control
              className="mb-2"
              type="email"
              name="email"
              placeholder="Email..."
              onChange={(e) =>
                setRegisterParams({ ...registerParams, email: e.target.value })
              }
            />
            <Form.Control
              className="mb-2"
              type="password"
              name="password"
              placeholder="Password..."
              onChange={(e) =>
                setRegisterParams({
                  ...registerParams,
                  password: e.target.value,
                })
              }
            />
            <Form.Control
              className="mb-2"
              type="password"
              name="password-confirm"
              placeholder="Confirm Password..."
              onChange={(e) =>
                setRegisterParams({
                  ...registerParams,
                  password_confirm: e.target.value,
                })
              }
            />

            <Button variant="primary" type="submit">
              Sign-up
            </Button>

          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SignUpModal;

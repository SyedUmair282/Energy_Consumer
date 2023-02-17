import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login_signup.css";
import axios from "axios";
const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const signup = async () => {
    let obj = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      if (email.current.value && password.current.value) {
        setLoading(true);
        const config = { headers: { "Content-Type": "application/json" } };
        const register_data = await axios.post(
          "http://localhost:5000/api/user/register",
          obj,
          config
        );
        console.log("Register response==>", register_data.data);
        setLoading(false);
        setError(false);
        navigate("/login");
      } else {
        alert("Fields are empty...!!");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    const tokenStorage = localStorage.getItem("User");
    if (tokenStorage) {
      navigate("/");
    }
  }, []);
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <div className="main">
        {error ? (
          <Alert
            variant="danger"
            style={{
              width: "335px",
              
            }}
          >
            Registration failed!
          </Alert>
        ) : null}
        <h3>Signup form</h3>
        <div className="forms">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" ref={username} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={email}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={password}
              />
            </Form.Group>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="primary"
                onClick={signup}
                style={{ width: "30%" }}
              >
                {loading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  "Register"
                )}
              </Button>
              <br />
              <br />
              <p style={{ color: "grey", fontSize: 14 }}>
                Have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;

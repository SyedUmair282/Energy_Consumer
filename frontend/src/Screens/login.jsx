import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login_signup.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = useRef();
  const password = useRef();

  const login = async () => {
    let obj = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      if (email.current.value && password.current.value) {
        setLoading(true);
        const config = { headers: { "Content-Type": "application/json" } };
        const login_data = await axios.post(
          "https://fair-plum-ox-vest.cyclic.app/api/user/login",
          obj,
          config
        );
        console.log("Login response==>", login_data.data);
        
        setLoading(false);
        setError(false);
        localStorage.setItem(
          "User",
          JSON.stringify({
            token: login_data.data.token,
            username: login_data.data.user.username,
          })
        );
        navigate("/");
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
            Wrong credential!
          </Alert>
        ) : null}
        <h3>Login form</h3>
        <div className="forms">
          <Form>
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
                onClick={login}
                style={{ width: "30%" }}
              >
                {loading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  "Login"
                )}
              </Button>
              <br />
              <br />
              <p style={{ color: "grey", fontSize: 14 }}>
                Dont have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

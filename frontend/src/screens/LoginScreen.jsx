import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userAction";
import FormContainer from "../components/FrmContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = searchParams ? searchParams.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="text-center mb-4 mt-5">Sign In</h1>
      <Form onSubmit={submitHandler} noValidate>
        {/* Error Message */}
        {error && <Message variant="danger">{error}</Message>}
        {/* Loading Spinner */}
        {loading && <Loader />}

        {/* Email Field */}
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-describedby="emailHelp"
          />
          <Form.Text id="emailHelp" muted>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* Password Field */}
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-100 mt-2"
          disabled={loading}
        >
          Sign In
        </Button>
      </Form>

      {/* Register Link */}
      <Row className="py-3">
        <Col className="text-center">
          <span className="me-2">New Customer?</span>
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="text-decoration-none fw-semibold"
          >
            Register
          </Link>
        </Col>
      </Row>

    </FormContainer>
  );
};

export default LoginScreen;

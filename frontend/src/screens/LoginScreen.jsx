import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
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
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <div className="form-row align-items-center">
          <div className="my-1">
            <label className="form-label" htmlFor="inlineFormInputName">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="inlineFormInputNa"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row align-items-center">
          <div className="my-1">
            <label className="form-label" htmlFor="inlineFormInputName">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inlineFormInputName"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <div className="row py-3">
        <div className="col">
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;

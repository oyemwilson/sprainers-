import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FrmContainer";
import { register } from "../actions/userAction";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  
  const searchParams = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = searchParams ? searchParams.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); 
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password!== confirmPassword){
        setMessage('Passwords do no match')
    }else{
        dispatch(register(name, email, password))
    }
    
  };

  return (
    <FormContainer>
      <h1 className="mt-5 text-center">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <div className="form-row align-items-center">
          <div className="my-1">
            <label className="form-label" htmlFor="inlineFormInputName">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row align-items-center">
          <div className="my-1">
            <label className="form-label" htmlFor="inlineFormInputName">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
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
        <div className="form-row align-items-center">
          <div className="my-1">
            <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inlineFormInputNam"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" variant="primary" className="w-100 mt-2">
          Register
        </Button>
      </Form>
      <div className="row py-3">
        <div className="col">
          Have an Account? 
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-decoration-none fw-semibold ms-2">
            Login
          </Link>
        </div>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;

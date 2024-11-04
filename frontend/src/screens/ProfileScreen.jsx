import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
// import Order from "../../../backend/models/orderModel";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  
  const searchParams = useLocation().search;
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // const orderListMy = useSelector((state) => state.orderListMy)
  // const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); 
    }else{
        if(!user.name){
            dispatch(getUserDetails('profile'))
        }else{
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [dispatch, userInfo, navigate, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password!== confirmPassword){
        setMessage('Passwords do no match')
    }else{
       dispatch(updateUserProfile({id: user._id,name, email, password })) 
    }
    
  };

  return <div className="row">
    <div className="col col-md-3">
    <h2>User Profile</h2>
      <Form onSubmit={submitHandler}>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
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
              id="password"
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
              id="inlineFormInputName"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </div>
      <Col md={9}>
        <h2>My Orders</h2>
        {/* {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )} */}
      </Col>
  </div>

  
};

export default ProfileScreen;

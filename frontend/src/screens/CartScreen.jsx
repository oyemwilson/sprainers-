import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation,  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartAction"; // Assuming you have a removeFromCart action
import {
  ListGroupItem,
  ListGroup,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";

const CartSceen = ({ history }) => {
  const { id } = useParams();
  const productId = id;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQty = searchParams.get("qty") || 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  const [qty, setQty] = useState(initialQty);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const navigate = useNavigate();
  const checkoutHandler  = () => {
    navigate('/login?redirect=/shipping')
  }
  return (
    <React.StrictMode>
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-8">
              <h1>Shopping Cart</h1>
              {cartItems.length === 0 ? (
                <Message>
                  Your cart is empty <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroupItem key={item.product}>
                      <div className="row">
                        <div className="col col-md-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </div>
                        <div className="col col-md-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="col col-md-2">{item.price}</div>
                        <div className="col col-md-2">
                          <FormControl
                            as="select"
                            value={item.qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1}>{x + 1}</option>
                            ))}
                          </FormControl>
                        </div>
                        <div className=" col col-md-2">
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </div>
            <div className="container col col-md-4">
              <div
                className="card"
                style={{ margin: "1rem" }}
              >
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <h2>
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + +item.qty, 0)})
                      items
                    </h2>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + +item.qty * item.price, 0)
                      .toFixed(2)}
                  </ListGroupItem>
                  <ListGroupItem className="d-grid gap-2">
                    <Button
                      type="button"
                      className="btn btn-block rounded-0"
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default CartSceen;

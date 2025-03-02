import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="nav align-items-center justify-content-center mb-4">
      <div className="nav-item">
        {step1 ? (
          <Link to="/login" className="nav-link">
            Sign In
          </Link>
        ) : (
          <div className="nav-link disabled"> Sign In</div>
        )}
        
      </div>


      <div className="nav-item">
        {step2 ? (
          <Link to="/shipping" className="nav-link">
            Shipping
          </Link>
        ) : (
          <div className="nav-link disabled"> Shipping</div>
        )}
      </div>

      <div className="nav-item">
        {step3 ? (
          <Link to="/payment" className="nav-link">
            Payment
          </Link>
        ) : (
          <div className="nav-link disabled"> Payment</div>
        )}
      </div>

      <div className="nav-item">
        {step4 ? (
          <Link to="/placeOrder" className="nav-link">
            Place Order
          </Link>
        ) : (
          <div className="nav-link disabled"> PlaceOrder</div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;

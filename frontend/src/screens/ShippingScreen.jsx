import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FrmContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartAction";

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const  [address, setAddress] = useState(shippingAddress.address)
    const  [city, setCity] = useState(shippingAddress.city)
    const  [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const  [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <div className="form-row align-items-center">
            <div className="my-1">
                <label className="form-label" htmlFor="inlineFormInputName">
                Address: 
                </label>
                <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Enter Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            </div>

            <div className="form-row align-items-center">
            <div className="my-1">
                <label className="form-label" htmlFor="inlineFormInputName">
                City
                </label>
                <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                />
            </div>
            </div>

            <div className="form-row align-items-center">
            <div className="my-1">
                <label className="form-label" htmlFor="inlineFormInputName">
                Postal Code
                </label>
                <input
                type="text"
                className="form-control"
                id="postal code"
                placeholder="Enter Postal Code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                />
            </div>
            </div>

            <div className="form-row align-items-center">
            <div className="my-1">
                <label className="form-label" htmlFor="inlineFormInputName">
                Country
                </label>
                <input
                type="text"
                className="form-control"
                id="country"
                placeholder="Enter Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            </div>
            <Button type="submit" variant='primary'>
            Continue
            </Button>
        </Form>

    </FormContainer>
  )
}

export default ShippingScreen
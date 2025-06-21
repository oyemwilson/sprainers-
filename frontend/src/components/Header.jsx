import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userAction'
import SearchBox from './SearchBox'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const dispatch = useDispatch()
  const userLogin= useSelector( state => state.userLogin)
  const {userInfo} = userLogin
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout(navigate))
  }
  return (
<header>
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
      <LinkContainer to="/">
        <a className="navbar-brand">Sprainers</a>
      </LinkContainer>
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <div className="navbar-nav me-auto mt-5 mt-lg-0 mb-3 mb-lg-0">
          <SearchBox />
        </div>
        
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <LinkContainer to="/cart">
              <a className="nav-link">
                <i className="fas fa-shopping-cart"></i> Cart
              </a>
            </LinkContainer>
          </li>
          
          {!userInfo && (
            <>
              <li className="nav-item">
                <LinkContainer to="/profile">
                  <a className="nav-link">
                    <i className="fa-regular fa-user"></i> My Account
                  </a>
                </LinkContainer>
              </li>
              <li className="nav-item">
                <LinkContainer to="/login">
                  <a className="nav-link">
                    <i className="fas fa-user"></i> Sign in
                  </a>
                </LinkContainer>
              </li>
            </>
          )}
          
          {userInfo && (
            <NavDropdown title={userInfo.name} id="username">
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          )}
          
          {userInfo && userInfo.isAdmin && (
            <NavDropdown title="Admin" id="adminmenu">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
        </ul>
      </div>
    </div>
  </nav>
</header>
  )
}

export default Header
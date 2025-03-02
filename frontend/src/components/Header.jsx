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
                <nav className="navbar-brand" >Sprainers</nav>
              </LinkContainer>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <SearchBox /> 
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <LinkContainer to="/cart">
                    <nav className="nav-link " aria-current="page"><i className="fas fa-shopping-cart"></i> Cart</nav>
                    </LinkContainer>
                    </li>
                    <li className="nav-item">
                    <LinkContainer to="/profile">
                    <nav className="nav-link" aria-current="page"><i className="fa-regular fa-user"></i> My Account</nav>
                    </LinkContainer>
                    </li>
                    {userInfo ? (
                      <NavDropdown title = {userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    )   : <li className="nav-item">
                    <LinkContainer to="/login">
                    <nav className="nav-link"><i className="fas fa-user"></i> Sign in</nav>
                    </LinkContainer>
                    </li>}
                    {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
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
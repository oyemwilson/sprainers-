import { Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {
  return (
    <>
        <PayPalScriptProvider options={{ 
      "client-id": "AY6kzhRmm7sCGSvk0Z-3Vj1e-4Eg9j1GeSBCvhWZIt2kTJY5HzFwKFiX17w6y0hIMdjsgZWSTVuckQQ3",
      currency: "USD"
      // other options as needed
    }}>
    <Header />
      <Container>
          <Routes>
            <Route path='/' element={<Homescreen/>} exact/>
            <Route path='/search/:keyword' element={<Homescreen/>} />
            <Route path='/order/:id' element={<OrderScreen/>} />
            <Route path='/placeorder' element={<PlaceOrderScreen/>} />
            <Route path='/payment' element={<PaymentScreen/>} />
            <Route path='/shipping' element={<ShippingScreen/>} />
            <Route path='/profile' element={<ProfileScreen/>} />
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/product/:id' element={<ProductScreen/>} />
            <Route path='/cart/:id?' element={<CartScreen/>} />
            <Route path='/admin/userlist' element={<UserListScreen/>} />
            <Route path='/admin/productlist' element={<ProductListScreen/>} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen/>} />
            <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>} />
            <Route path='/admin/orderlist' element={<OrderListScreen/>} />
            
          </Routes> 
        </Container>
    <Footer />
    </PayPalScriptProvider>
    </>
  );
}

export default App;

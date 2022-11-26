import React from 'react';
import {Routes, Route} from 'react-router-dom';

// Seller Account
import Register from './pages/Register';
import Login from './pages/Login';
import ViewProduct from './pages/ViewProduct';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Homepage from './pages/HomePage';
import AccountPage from './pages/Account';
import ViewAccount from './pages/ViewAccount';
import TransactionPage from './pages/Transaction';
import EditAccount from './pages/EditAccount';
import EditPassword from './pages/EditPassword';
import Review from './pages/Review';

// Landing and Selection for both Account
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';

//Customer Account
import LoginCustomer from './pages/LoginCustomer';
import RegisterCustomer from './pages/RegisterCustomer';
import CustomerHomepage from './pages/CustomerHomepage';
import Basket from './pages/Basket';
import CustomerAccount from './pages/CustomerAccount';
import EditCustomerAccount from './pages/EditCustomerAccount';
import VegetablePage from './pages/Vegetables';
import FruitPages from './pages/Fruits';
import SalePage from './pages/Sale';
import FreeDeliveryPage from './pages/Delivery';
import SearchProduct from './pages/SearchProduct';
import ProductDetails from './pages/ProductDetail';
import VegetableDetails from './pages/VegetableDetails';

//Admin Account
import LoginAdmin from './pages/AdminLogin';
import AdminTable from './pages/Admin';
import EditSeller from './pages/EditSeller';
import EditUserImage from './pages/EditUserImage';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import ToPay from './pages/ToPay';
import OngoingPage from './pages/Ongoing';
import OngoingDetails from './pages/OngoingDetails';


function App() 
{

  return (
    <div className="App">

          <Routes> 
            
            <Route path="/" element={<LandingPage/>} />
            <Route path="/selectionpage" element={<SelectionPage/>} />

            <Route path="/login-seller" element={<Login/>} />
            <Route path="/register-seller" element={<Register/>} />

            <Route path="/adminlogin" element={<LoginAdmin/>}/>
            <Route path="/admin-dashboard" element={<AdminTable/>}/>
            <Route path="/edit-verification/:id" element={<EditSeller/>}/>

            <Route path="/login-customer" element={<LoginCustomer/>} />
            <Route path="/register-customer" element={<RegisterCustomer/>} />
            <Route path="/customer-homepage" element={<CustomerHomepage/>} />
            <Route path="/vegetables" element={<VegetablePage/>}/>
            <Route path="/fruits" element={<FruitPages/>}/>
            <Route path="/fruits/:name" element={<ProductDetails/>}/>
            <Route path="/vegetables/:name" element={<VegetableDetails/>}/>  
            <Route path="/sales" element={<SalePage/>}/>
            <Route path="/freedelivery" element={<FreeDeliveryPage/>}/>
            <Route path="/searchproduct" element={<SearchProduct/>}/>

            <Route path="/basket" element={<Basket/>} />
            <Route path="/checkout/:id" element={<Checkout/>}/>
            <Route path="/toPay" element={<ToPay/>}/>
            <Route path="/to-ship" element={<OngoingPage/>}/>
            <Route path="/to-ship-details/:id" element={<OngoingDetails/>}/>
            
            <Route path="/customer-account" element={<CustomerAccount/>} />
            <Route path="/edit-customeraccount" element={<EditCustomerAccount/>} />

            <Route path="/homepage" element={<Homepage/>} />
            <Route path="/account" element={<AccountPage/>} />
            <Route path="/edit-userprofile" element={<EditUserImage/>} />
            <Route path="/accountview" element={<ViewAccount/>} />
            <Route path="/edit-account" element={<EditAccount/>}/>
            <Route path="/edit-password" element={<EditPassword/>} />
            <Route path="/review" element={<Review/>}/>
            <Route path="/transaction" element={<TransactionPage/>} />
            <Route path="/order-details/:id" element={<OrderDetails/>}/>
            <Route path="/products" element={<ViewProduct/>} />
            <Route path="/add-product" element={<AddProduct/>} />
            <Route path="/edit-product" element={<EditProduct/>} />
          </Routes>
    </div>
  );
}

export default App;
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import NavbarCustomer from './NavbarCustomer';

function CustomerAccount() 
{
    let customer = JSON.parse(localStorage.getItem('user-info'))
    const history = useNavigate();

    function logoutCustomer()
    {
        localStorage.clear();
        history("/login-customer");
    }
    return(
        <>
        <NavbarCustomer/>
        <div>
            <div className='container'>
                <p>{ customer.firstname}</p> <Link to={"/edit-customeraccount"} state={customer} className="card-text">Edit</Link>
                <p>{customer.username}</p>

                <div>
                    <div className="card" style={{ width:160 , marginLeft:20}}>
                        <div className="card-body">
                            <Link to={"/toPay"}className="card-text">To Pay</Link>
                        </div>
                    </div>
                    <div className="card" style={{ width:160 , marginLeft:20}}>
                        <div className="card-body">
                            <Link to={"/toReceive"}className="card-text">To Receive</Link>
                        </div>
                    </div>
                    <div className="card" style={{ width:160 , marginLeft:20}}>
                        <div className="card-body">
                            <Link to={"/toReview"}className="card-text">To Review</Link>
                        </div>
                    </div>
                </div>

                <div>
                    <Link to={'/customer-recent'} className="btn btn-primary btn-sm float-start">Recent Transaction</Link>
                    <Link to={'/customer-review'} className="btn btn-primary btn-sm float-start"> Review Orders</Link>
                    <button className='btn btn-primary' onClick={logoutCustomer}>Logout</button>
                </div>
                

            </div>
        </div>
        </>
    );
}

export default CustomerAccount;
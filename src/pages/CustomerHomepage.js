import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import NavbarCustomer from './NavbarCustomer';

const CustomerHomepage = () =>
{
    const [data, setData] = useState([]);

    let customer = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('customer', JSON.stringify(customer))

    console.log(data)

    useEffect(() => {

        axios.get(`http://localhost:8000/api/product-recommended`).then((res) => {
          if (res.status === 200) {
            setData(res.data.data);
          }
        });

      },[]);

    return(
        <>
        <NavbarCustomer/>
        <div className='page-content-wrapper'>
               
            <div className="container-fluid">
                <h1 className="mt-4">Welcome { customer.firstname} </h1>
                <p>What would you buy today?</p>
            </div>
            <div className="input-group rounded">
                <Link to="/searchproduct"><input type="search" className="form-control rounded" placeholder="Search by item name" aria-label="Search" aria-describedby="search-addon" /></Link><Link to={"/basket"} className="btn btn-primary">Basket</Link>
            </div><br/>
            <div>
                <h1>Categories</h1>
                <div className="card-body">
                                
                <div className='py-3'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <div className='card'>
                                <div className='card-body'>
                                    <Link to={"/vegetables"}className="card-text">Vegetables</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className='card'>
                                <div className='card-body'>
                                    <Link to={"/fruits"}className="card-text">Fruits</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
            <div>
                <h1>Best Seller</h1>
                
            </div>
        </div>
        </>
    );

}

export default CustomerHomepage;
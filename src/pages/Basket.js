import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarCustomer from './NavbarCustomer';
import { Link, useLocation } from 'react-router-dom';

function Basket() 
{
    const location = useLocation();
    const state = location.state;
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(state);
    var totalCartPrice = 0;

    useEffect(() => {
        if (Object.keys(customer).length === 0) {
            setCustomer(JSON.parse(localStorage.getItem('customer')))
        }
        
        axios.get(`http://127.0.0.1:8000/api/basket/${customer.id}`).then(res=>{
            if(res.status === 200)
            {
                //console.log(res.data)
                setCart(res.data.cart)
                setLoading(false);
            }
        });
        
      },[customer]);
      console.log(cart)
      
      const handleDecrement = (cart_id) => {
            setCart(cart =>
                cart.map ((item) =>
                cart_id === item.id ? {...item, fruits_qty: item.fruits_qty - (item.fruits_qty > 1 ? 1:0)} : item
                )
            );
            updateCartQuantity(cart_id,"dec");
      }

      const handleIncrement = (cart_id) => {
            setCart(cart =>
                cart.map ((item) =>
                cart_id === item.id ? {...item, fruits_qty: item.fruits_qty + (item.fruits_qty < 10 ? 1:0)} : item
                )
            );
            updateCartQuantity(cart_id,"inc");
    }

    function updateCartQuantity(cart_id,scope)
    {
        axios.put(`http://localhost:8000/api/basket-updatedquantity/${cart_id}/${scope}/${customer.id}`).then(res=>{
            if(res.data.status === 200)
            {
                //swal("Success", res.data.message, "success")
            }
        });
    }

      console.log(cart)
      if(loading)
      {
          return <h4>Loading Basket...</h4>
      }
      
      if (cart.length > 0)
      {
        var showCartList = "";
        showCartList = cart.map( (item, idx) => {
            totalCartPrice += item.price * item.fruits_qty;
            return(
                <div className='col-md-12' key={idx}>
                    <div className='card'>
                        <div className='card-body'>
                            <h6>{item.name}</h6>
                            <h6>Price: {item.price * item.fruits_qty}</h6>
                            <div className='input-group'>
                                    <button type="button" onClick={() => handleDecrement(item.id)} className='input-group-text'>-</button>
                                    <div className='form-control text-center'>{item.fruits_qty}</div>
                                    <button type="button" onClick={() => handleIncrement(item.id)} className='input-group-text'>+</button>
                            </div>
                            <Link to={`/checkout/${item.id}`} state={item} className="btn btn-primary">Checkout</Link>
                        </div>
                    </div>
                </div>
            )
        });
      }
      else{
        showCartList = <div>
            <div className='card card-body py05 text-center shadow-sm'>
                <h4>Your Shopping Cart is Empty</h4>
            </div>
        </div>
      }
        
    

    return (
        <>
        <NavbarCustomer/>
        <div>
            <div className="container">
                <div className="row">
                    <div>
                        <div className="card">
                            <div className="card-header">
                                <h4>Basket</h4>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className='row'>
                                        {showCartList}
                                    </div>

                                    <div className='col-md-8'></div>
                                    <div className='col-md-8'>
                                        <div className='card card-body mt-3'>
                                            <p>
                                                Sub Total:
                                                <span className='float-end'>
                                                    {totalCartPrice}
                                                </span>
                                            </p>
                                            <p>
                                                Grand Total:
                                                <span className='float-end'>
                                                    {totalCartPrice}
                                                </span>
                                            </p>
                                            <hr/>
                                        </div>
                                    </div>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
      }
      /*var cart_HTML = "";

      if(cart.length > 0)
      {
        cart_HTML = <div className='card-body'>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Prouct ID</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map( (item) => {
                    return(
                        <tr>
                            <td>
                                {item.fruits_id}
                            </td>
                            <td>{item.fruits_id}</td>
                            <td>{item.fruits_qty}</td>
                            <td>
                                <div className='input-group'>
                                    <button type="button" className='input-group-text'>-</button>
                                    <div className='form-control text-center'>2</div>
                                    <button type="button" className='input-group-text'>+</button>
                                </div>
                            </td>
                            <td>1000</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
      }

      else {
        cart_HTML = <div>
            <div className='card card-body py05 text-center shadow-sm'>
                <h4>Your Shopping Cart is Empty</h4>

            </div>
        </div>
      }

    return(
        <>
        <NavbarCustomer/>
        <div className='page-content-wrapper'>
               
            <div className="container-fluid">
                <h1 className="mt-4">My Basket</h1>
                <div className="card-body">
                                
                <div className='py-4'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <div className='card'>
                                
                                {cart_HTML}
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            </div>
        </div>
        </>
    );*/

export default Basket;
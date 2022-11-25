import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebars from './Sidebars';

function OrderDetails(props) 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(state);
    const [orderItem, setItems] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const order_id = state.order_id;
    const productName = state.order_name;
    const qty = state.qty;
    const price = state.price;
    const totalPrice = state.total_price;

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/orderDetails/${order_id}`).then((res) => {
          if (res.status === 200) {
            setOrders(res.data.orders);
            setItems(res.data.orders);
            setLoading(false);
          }
        });
        
      }, [order_id]);
      console.log(orderItem)
      
      
      if(loading)
        {
            return <h4>Loading Order Details Data...</h4>
        }
            /*var showOrderDetails = "";
            showOrderDetails = orders.map( (item, idx) => {
                return(
                    <div className='col-md-12' key={idx}>
                        <h1>Transaction Details</h1>
                        <div className='card'>
                            <div className='card-body'>
                                <h3>Product Order</h3>
                                <h5>{productName}</h5>
                            </div>
                        </div>
                        <br></br>
                        <div className='card'>
                            <div className='card-body'>
                                <h3>Shipping Address</h3>
                                <h5>{item.firstname} {item.middlename} {item.lastname}</h5>
                                <h5>{item.mobilephone}</h5>
                                <h5>{item.shippingaddress}</h5>
                            </div>
                        </div>
                        <br></br>
                        <div className='card'>
                            <div className='card-body'>
                                <h3>Mode of Payment</h3>
                                <h5>{item.modeofpayment}</h5>
                            </div>
                        </div>

                    </div>
                )
            });*/
            var orderDetails_HTMLTABLE = "";
       
            orderDetails_HTMLTABLE = orders.map( (item, index) => {
                return (
                    
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{productName}</td>
                        <td>{qty}</td>
                        <td>{price}</td>
                        <td>{totalPrice}</td>
                    </tr>
                );
            });

            var orderInfo_HTMLTABLE = "";
       
            orderInfo_HTMLTABLE = orders.map( (item, index) => {
                return (
                    
                    <tr key={index}>
                        <td>{item.firstname} {item.middlename} {item.lastname}</td>
                        <td>{item.mobilephone}</td>
                        <td>{item.shippingaddress}</td>
                        <td>{item.modeofpayment}</td>
                        <Link to ="/delivered" className="btn btn-primary" >Out for Delivery</Link>
                    </tr>
                );
            });
           

    return (
        <>
        <Sidebars/>
        <Link to={'/transaction'} className="btn btn-danger btn-sm float-end"> BACK</Link>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <div className='col-md-12'>
                    <div className="card">
                            <div className="card-header">
                                <h4>Order Information
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Product Name</th>
                                            <th>Quantity (kg) </th>
                                            <th>Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h4>Transaction Details
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Customer Name</th>
                                            <th>Shipping Address</th>
                                            <th>Mode of Payment</th>
                                            <th>Shipping Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderInfo_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                </div>
                </div>
            </div>
        </div>
       </> 
    );

}

export default OrderDetails;
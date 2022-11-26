import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebars from './Sidebars';

function OrderDetails(props) 
{
    const location = useLocation();
    const state = location.state;
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(state);
    const [orderItem, setItems] = useState([]);

    const order_id = state.order_id;
    //const customerId = orders.user_id;
    const productName = state.order_name;
    const qty = state.qty;
    const price = state.price;
    const totalPrice = state.total_price;

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/orderDetails/${order_id}`).then((res) => {
          if (res.status === 200) {
            setOrders(res.data.orders);
            setItems(res.data.order_items[0]);
            setLoading(false);
          }
        });
        
      }, [order_id]);
      
      const orderApproved = (e) => {
        e.preventDefault();

        const approvedOrders = {
            seller_id: state.seller_id,
            customer_id: state.user_id,
            order_id: state.order_id,
            order_name: state.order_name,
            order_qty: state.qty,
            order_price: state.price,
            order_total: state.total_price,
            firstname: orderItem.firstname,
            middlename: orderItem.middlename,
            lastname: orderItem.lastname,
            mobilephone: orderItem.mobilephone,
            shippingaddress: orderItem.shippingaddress,
            modeofpayment: orderItem.modeofpayment,
            
        }

        console.log(orderItem)

        axios.post(`http://localhost:8000/api/approve-order`, approvedOrders).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order Approved!!", res.data.message, "Success")
            }
         });
      }
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
                        <td></td>
                    </tr>
                );
            });
           

    return (
        <>
        <Sidebars/>
        <Link to={'/transaction'} className="btn btn-danger btn-sm float-end"> BACK</Link>
        <div>
            <form  onSubmit={orderApproved}>
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
                                            <th>Mobile Phone</th>
                                            <th>Shipping Address</th>
                                            <th>Mode of Payment</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderInfo_HTMLTABLE}
                                    </tbody>
                                </table>
                                <button type="submit" className='btn btn-primary w-100' >Approved Order</button>
                            </div>
                        </div>
                </div>
                </div>
            </div>
            </form>
            
        </div>
       </> 
    );

}

export default OrderDetails;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebars from './Sidebars';

function OngoingDetails(props) 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [toShip, setToShip] = useState(state);

    const order_id = state.order_id;

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/to-ship-details/${order_id}`).then((res) => {
          if (res.status === 200) {
            setToShip(res.data.ongoing);
            setLoading(false);
          }
        });
        
      }, [order_id]);
      
      const outforDelivery = (e) => {
        e.preventDefault();

        const outfordelivery = {
            seller_id: state.seller_id,
            customer_id: state.customer_id,
            order_id: state.order_id,
            order_name: state.order_name,
            order_qty: state.order_qty,
            order_price: state.order_price,
            order_total: state.order_total,
            firstname: state.firstname,
            middlename: state.middlename,
            lastname: state.lastname,
            contactNo: state.contactNo,
            shippingaddress: state.shippingaddress,
            modeofpayment: state.modeofpayment,
            
        }

        axios.post(`http://localhost:8000/api/out-for-delivery`, outfordelivery).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order is out for Delivery", res.data.message, "Success")
            }
         });
      }

      if(loading)
        {
            return <h4>Loading Delivery Orders...</h4>
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
            var toShipOrder_HTMLTABLE = "";
       
            toShipOrder_HTMLTABLE = toShip.map( (item, index) => {
                return (
                    
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.order_name}</td>
                        <td>{item.order_qty}</td>
                        <td>{item.order_price}</td>
                        <td>{item.order_total}</td>
                    </tr>
                );
            });

            var orderInfos_HTMLTABLE = "";
       
            orderInfos_HTMLTABLE = toShip.map( (item, index) => {
                return (
                    
                    <tr key={index}>
                        <td>{item.firstname} {item.middlename} {item.lastname}</td>
                        <td>{item.contactNo}</td>
                        <td>{item.shippingaddress}</td>
                        <td>{item.modeofpayment}</td>
                        <td><button type="submit" className='btn btn-primary w-100' onClick={outforDelivery}>Out for Delivery</button></td>
                    </tr>
                );
            });
           

    return (
        <>
        <Sidebars/>
        <Link to={'/to-ship'} className="btn btn-danger btn-sm float-end"> BACK</Link>
        <div>
        <form >
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
                                        {toShipOrder_HTMLTABLE}
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
                                            <th>Shipping Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderInfos_HTMLTABLE}
                                    </tbody>
                                </table>
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

export default OngoingDetails;
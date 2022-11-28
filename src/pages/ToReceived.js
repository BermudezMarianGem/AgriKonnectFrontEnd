import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import NavbarCustomer from './NavbarCustomer';

function ToReceivedPage() 
{
    const history = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [forDelivery, setToDeliver] = useState(state);
    const [itemDelivered, setDelivered] = useState([]);

    let customer = JSON.parse(localStorage.getItem('user-info'))
    let id = customer.id;


    useEffect(() => {

        axios.get(`http://localhost:8000/api/out-for-delivery/${id}`).then((res) => {
          if (res.status === 200) {
            setToDeliver(res.data.deliveries);
            setDelivered(res.data.deliveries[0]);
            setLoading(false);
          }
        });
        
      }, [id]);

      console.log(itemDelivered)
      
    const orderDelivered = (e) => {
        e.preventDefault();

        const delivered = {
            product_id: itemDelivered.product_id,
            seller_id: itemDelivered.seller_id,
            customerId: itemDelivered.customerId,
            order_id: itemDelivered.order_id,
            order_name: itemDelivered.order_name,
            order_qty: itemDelivered.order_qty,
            order_price: itemDelivered.order_price,
            order_total: itemDelivered.order_total,
            firstname: itemDelivered.firstname,
            middlename: itemDelivered.middlename,
            lastname: itemDelivered.lastname,
            contactNo: itemDelivered.contactNo,
            shippingaddress: itemDelivered.shippingaddress,
            modeofpayment: itemDelivered.modeofpayment,
        }
        console.log(delivered)

        axios.post(`http://localhost:8000/api/order-delivered`, delivered).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order Delivered", res.data.message, "Success")
                history('/toReview')
            }
         });
    }
      
    if(loading)
        {
            return <h4>Loading For Delivery Orders...</h4>
        }

        if (forDelivery.length > 0)
        {
            var showOutforDeliveryOrders = "";
            showOutforDeliveryOrders = forDelivery.map( (item, idx) => {
                return(
                <div className='col-md-12' key={idx}>
                    <div className='card'>
                        <div className='card-body'>
                            <h6>{item.order_name}</h6>
                            <h6>Price: Php {item.order_price}.00</h6>
                            <h6>Quantity: {item.order_qty}kg</h6>
                            <h6>Total Price: Php {item.order_total}.00</h6>
                            <h6><button type="submit" className='btn btn-primary w-100'>Delivered</button></h6>
                        </div>
                    </div>
                </div>
                    
                )
            });

        }

        else {
            showOutforDeliveryOrders =<div>
                <div className='card card-body py05 text-center shadow-sm'>
                <h4></h4>
                <h6>No Available transaction</h6>
            </div>
        </div>
        }
   
           

    return (
        <>
        <NavbarCustomer/>
        <div>
            <form onSubmit={orderDelivered}>
            <div className="container">
                <div className="row">
                    <div>
                        <div className="card">
                            <div className="card-header">
                                <h4>My Order</h4>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className='row'>
                                    {showOutforDeliveryOrders}
                                    </div>
                            </div>

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

export default ToReceivedPage;
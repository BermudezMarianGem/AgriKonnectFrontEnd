import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebars from './Sidebars';

function DeliveryPage() 
{
    const [loading, setLoading] = useState(true);
    const [delivered, setDelivered] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    console.log(delivered)

    useEffect(() => {

        axios.get(`http://localhost:8000/api/order-delivered/${user_id}`).then((res) => {
          if (res.status === 200) {
            setDelivered(res.data.delivered);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      
      if(loading)
        {
            return <h4>Loading To Ship Orders...</h4>
        }

        if (delivered.length > 0)
        {
            var showDeliveredOrders = "";
            showDeliveredOrders = delivered.map( (item, idx) => {
                return(
                    <tr key={idx}>
                        <td>{item.order_id}</td>
                        <td>{item.order_name}</td>
                        <td>{item.order_qty}</td>
                        <td>{item.order_total}.00</td>
                    </tr>
                )
            });

        }

        else {
            showDeliveredOrders =<div>
                <div className='card card-body py05 text-center shadow-sm'>
                <h4></h4>
                <h6>No Available transaction</h6>
            </div>
        </div>
        }
   
           

    return (
        <>
        <Sidebars/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <p>Delivered Orders</p>
                    <div className="card-body">
                                
                    <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Quantity (kg) </th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showDeliveredOrders}
                            </tbody>
                        </table>
                </div>
                </div>
            </div>
        </div>
       </> 
    );

}

export default DeliveryPage;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebars from './Sidebars';

function OngoingPage() 
{
    const [loading, setLoading] = useState(true);
    const [toShip, setToShip] = useState();

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    console.log(user_id)
    useEffect(() => {

        axios.get(`http://localhost:8000/api/ongoing/${user_id}`).then((res) => {
          if (res.status === 200) {
            setToShip(res.data.deliveries);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      console.log(toShip)
      
      if(loading)
        {
            return <h4>Loading To Ship Orders...</h4>
        }

        if (toShip.length > 0)
        {
            var showOngoingOrders = "";
            showOngoingOrders = toShip.map( (item, idx) => {
                return(
                    <tr key={idx}>
                    <td>{item.order_id}</td>
                    <td>{item.order_name}</td>
                    <td>{item.order_qty}</td>
                    <td>{item.order_price}.00</td>
                    <td>{item.order_total}.00</td>
                    <td>{item.firstname} {item.middlename} {item.lastname}</td>
                    <td>{item.contactNo}</td>
                    <td>{item.shippingaddress}</td>
                    <td>{item.modeofpayment}</td>
                    <td>Pending....</td>
                </tr>
                )
            });

        }

        else {
            showOngoingOrders =<div>
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
                    <p>Ongoing Orders</p>
                    <div className="card-body">
                                
                    <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Quantity (kg) </th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Customer Name</th>
                                    <th>Phone Number</th>
                                    <th>Shipping Address</th>
                                    <th>Mode of Payment</th>
                                    <th>Shipping Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showOngoingOrders}
                            </tbody>
                        </table>
                </div>
                </div>
            </div>
        </div>
       </> 
    );

}

export default OngoingPage;
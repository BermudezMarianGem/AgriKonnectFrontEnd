import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebars from './Sidebars';

function OngoingPage() 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [toShip, setToShip] = useState(state);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    useEffect(() => {

        axios.get(`http://localhost:8000/api/ongoing-order/${user_id}`).then((res) => {
          if (res.status === 200) {
            setToShip(res.data.ongoing);
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
                        <td>{item.order_total}.00</td>
                        <Link to={`/to-ship-details/${item.order_id}`} state={item} className="btn btn-primary">
                                <h5>View Product Details</h5>
                                </Link>
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
                                    <th>Total Price</th>
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
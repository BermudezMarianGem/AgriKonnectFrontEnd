import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavbarCustomer from './NavbarCustomer';

function ToReviewPage() 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [toReview, setReview] = useState(state);

    let customer = JSON.parse(localStorage.getItem('user-info'))
    const user_id = customer.id;

    useEffect(() => {

        axios.get(`http://localhost:8000/api/to-review/${user_id}`).then((res) => {
          if (res.status === 200) {
            setReview(res.data.delivered);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      console.log(toReview)
      
      if(loading)
        {
            return <h4>Loading To Review Orders...</h4>
        }

        if (toReview.length > 0)
        {
            var showToReviewOrders = "";
            showToReviewOrders = toReview.map( (item, idx) => {
                return(
                    <tr key={idx}>
                        <td>{item.order_id}</td>
                        <td>{item.order_name}</td>
                        <td>{item.order_qty}</td>
                        <td>{item.order_total}.00</td>
                        <Link to={`/to-review/${item.order_id}`} state={item} className="btn btn-primary">
                            <h5>Review</h5>
                        </Link>
                    </tr>
                )
            });

        }

        else {
            showToReviewOrders =<div>
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
                                    <th>Review</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showToReviewOrders}
                            </tbody>
                        </table>
                </div>
                </div>
            </div>
        </div>
       </> 
    );

}

export default ToReviewPage;
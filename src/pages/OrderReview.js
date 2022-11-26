import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebars from './Sidebars';

function OrderReviewPage() 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [setReview, setOrderReview] = useState(state);

    const productName = setReview.order_name;
    const qty = setReview.order_qty;
    const price = setReview.order_total;
    const firstname = setReview.firstname;
    const middlename = setReview.middlename;
    const lastname = setReview.lastname;
    const review = setReview.review;

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/review/${user_id}`).then((res) => {
          if (res.status === 200) {
            setOrderReview(res.data.review[0]);
            setLoading(false);
          }
        });
        
      }, [user_id]);
    
      
      if(loading)
        {
            return <h4>Loading Transaction Data...</h4>
        }

           

    return (
        <>
        <Sidebars/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <p>Order Review</p>
                    <Link to='/delivered' className="btn btn-primary"><h5>Back</h5></Link>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-body'>
                                <p>Order Name: {productName}</p>
                                <p>Quantity: {qty} </p>
                                <p>Price: {price} </p>
                                <p>Customer: {firstname} {middlename} {lastname}</p>
                                <hr></hr>
                                <p>Review: {review}</p>
                            </div>
                        </div>
                    </div>         
                </div>
            </div>
        </div>
       </> 
    );

}

export default OrderReviewPage;
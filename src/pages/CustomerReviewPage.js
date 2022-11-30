import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavbarCustomer from './NavbarCustomer';

function CustomerReviewPage() 
{

    const [loading, setLoading] = useState(true);
    const [setReview, setOrderReview] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const id = user.id;

    const productName = setReview[0]?.order_name;
    const productQty = setReview[0]?.order_qty;
    const productPrice = setReview[0]?.order_total;
    const firstname = setReview[0]?.firstname;
    const middlename =setReview[0]?.middlname;
    const lastname = setReview[0]?.lastname;
    const review = setReview[0]?.review;

    console.log(setReview)

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/customer-review/${id}`).then((res) => {
          if (res.status === 200) {
            setOrderReview(res.data.review);
            setLoading(false);
          }
        });
        
      }, [id]);
    
      
      if(loading)
        {
            return <h4>Loading Transaction Data...</h4>
        }

        var showOrderReview = "";
        showOrderReview = setReview.map((item, idx) => {
            return (
            <div className='col-md-12' key={idx}>
                    <div className='card'>
                        <div className='card-body'>
                            <p>Order Name: {item.order_name}</p>
                            <p>Quantity: {item.order_qty}</p>
                            <p>Price: {item.order_total} </p>
                            <hr></hr>
                            <p>Review: {item.review}</p>
                        </div>
                        <br></br>
                    </div>
                </div>
            )
        })


           

    return (
        <>
        <NavbarCustomer/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <p>Order Review</p>
                    <Link to='/customer-account' className="btn btn-primary"><h5>Back</h5></Link>
                    <div className='col-md-12'>
                       {showOrderReview}
                    </div>         
                </div>
            </div>
        </div>
       </> 
    );

}

export default CustomerReviewPage;
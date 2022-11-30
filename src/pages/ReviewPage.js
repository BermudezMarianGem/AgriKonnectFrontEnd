import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebars from './Sidebars';

function Review(props) 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [review, setReview] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const id = user.id;

    console.log(review)

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/review/${id}`).then((res) => {
          if (res.status === 200) {
            setReview(res.data.review);
            setLoading(false);
          }
        });
        
      }, [id]);
      
      
      if(loading)
        {
            return <h4>Loading Review Data...</h4>
        }

        /*if (order_items.length > 0)
        {*/
            var showReviewPage = "";
            showReviewPage = review.map( (item, idx) => {
                return(
                    <div className='col-md-3' key={idx}>
                        <div className='card'>
                            <div className='card-body'>
                                <h6>{item.order_name}</h6>
                                <hr></hr>
                
                                <p>Review: {item.review}</p>
                            </div>
                        </div>
                    </div>
                )
            });

        //}

        /*else {
            showOrderList =<div>
                <div className='card card-body py05 text-center shadow-sm'>
                <h4></h4>
                <h6>No Available transaction</h6>
            </div>
        </div>
        }*/
   
           

    return (
        <>
        <Sidebars/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <p>Review Page</p>
                    <div className="card-body">
                                
                        <div className='py-3'>
                            <div className='row'>
                                {showReviewPage}
                            </div>

                        </div>
                </div>
                </div>
            </div>
        </div>
       </> 
    );

}

export default Review;
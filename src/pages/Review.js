import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import NavbarCustomer from './NavbarCustomer';

function ReviewPage() 
{
    const history = useNavigate();
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [toReview, setReview] = useState([]);

    const order_id = state.order_id;
    const productName = state.order_name;
    const orderTotal = state.order_total;

    console.log(order_id)
    const [reviewInput, setReviewInput] = useState({
        review: '',
    });

    const [error, setError] = useState([]);

      console.log(state)

      const handleInput = (e) => {
        e.persist();
        setReviewInput({...reviewInput, [e.target.name]: e.target.value});
      }

      const submitReview = (e) => {
        e.preventDefault();
        
        const reviews = {
            customer_id: state.customerId,
            product_id: state.product_id,
            seller_id: state.seller_id,
            firstname: state.firstname,
            middlename: state.middlename,
            lastname: state.lastname,
            order_id: order_id,
            order_name: state.order_name,
            order_qty: state.order_qty,
            order_total: state.order_total,
            review: reviewInput.review,
        }

        axios.post(`http://localhost:8000/api/review`, reviews).then(res=> {
            if(res.data.status === 200)
            {
                swal("Review Submitted", res.data.message, "Success")
                setError([]);
                history('/toReview');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory", "", "error");
                setError(res.data.errors);
            }
        });
      }
        

    return (
        <>
        <NavbarCustomer/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <p>Review Order</p>
                    <form>
                <div className='py-4'>
                    <div className="container">
                        <div className="row">
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <div className='form-group mb-3'>
                                                <h4>{productName}</h4>
                                                <p>Php {orderTotal}.00</p>
                                                <hr></hr>
                                                <div className="form-group mb-3">
                                                    <label>Review</label>
                                                    <input type="text" name="review" onChange={handleInput} value={reviewInput.review}  className="form-control" placeholder='Enter your review here' />
                                                    <small className='text-danger'>{error.review}</small>
                                                </div>
                                
                                                <Link to ="/toReview" className="btn btn-primary" onClick={submitReview}>Submit Review</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>     
                </div>
            </div>
        </div>
       </> 
    );

}

export default ReviewPage;
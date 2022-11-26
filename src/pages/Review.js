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
    const [toReview, setReview] = useState(state);


    let customer = JSON.parse(localStorage.getItem('user-info'))
    const user_id = customer.id;

    const [reviewInput, setReviewInput] = useState({
        review: '',
    })

    const [error, setError] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:8000/api/to-review/${user_id}`).then((res) => {
          if (res.status === 200) {
            setReview(res.data.delivered[0]);
            setLoading(false);
          }
        });
        
      }, [user_id]);

      const handleInput = (e) => {
        e.persist();
        setReviewInput({...reviewInput, [e.target.name]: e.target.value});
      }

      const submitReview = (e) => {
        e.preventDefault();
        
        const review = {
            seller_id: state.seller_id,
            firstname: state.firstname,
            middlename: state.middlename,
            lastname: state.lastname,
            order_name: state.order_name,
            order_qty: state.order_qty,
            order_total: state.order_total,
            review: reviewInput.review,
        }

        axios.post(`http://localhost:8000/api/review`, review).then(res=> {
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
      
      
      if(loading)
        {
            return <h4>Loading To Review Orders...</h4>
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
                                                <h4>{toReview.order_name}</h4>
                                                <p>Php {toReview.order_total}.00</p>
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
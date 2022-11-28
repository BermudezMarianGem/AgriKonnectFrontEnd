import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import NavbarCustomer from './NavbarCustomer';

function VegetableDetails(props)
{
    const location = useLocation();
    const state = location.state;
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setQuantity] = useState(1);

    const product_id = state.id;

    const name = state.name;
    const image = state.image;
    const seller = state.seller_name;
    const description = state.description;
    const price = state.price;
    const category = state.category;

    useEffect(() => {

        axios.get(`http://localhost:8000/api/viewvegetable/${product_id}`).then((res) => {
          if (res.status === 200) {
            
            setReview(res.data.reviews[0]);
            setLoading(false);
    
          }
          console.log(res.data.reviews)

        });
        
      },[product_id]);

      

      const handleDecrement = () => {
        if(value > 1)
        {
          setQuantity(prevCount => prevCount - 1);
        }
        
      }

      const handleIncrement = () => {
        if(value < 10)
        {
          setQuantity(prevCount => prevCount + 1);
        }
        
      }
      const submitProduct = (e) => {
        e.preventDefault();
  
        const data = {
          product_id: product_id,
          seller_id: state.user_id,
          fruits_id: state.id,
          fruits_qty: value,  
          name: state.name,
          price: state.price,
          customerId:JSON.parse(localStorage.getItem('customer')).id
        }
  
       axios.post(`http://localhost:8000/api/addtoCart`, data).then(res=>{
          if(res.data.status === 201)
          {
            swal("Success",res.data.message,"success");
          }
          else if(res.data.status === 409)
          {
            swal("Warning",res.data.message,"warning");
          }
          else if(res.data.status === 401)
          {
            swal("Error",res.data.message,"error");
          }
          else if(res.data.status === 404)
          {
            swal("Warning",res.data.message,"warning");
          }
        });
  
      }
      

      if(loading)
    {
        return <h4>Loading Vegetable Details...</h4>
    }
    

    return(
      <>
      
      <NavbarCustomer/>
      
      <Link to={'/vegetables'} className="btn btn-danger btn-sm float-end"> BACK</Link>

      <form onSubmit={submitProduct}>
      <div className='py-3'>
        <div className='container'>
          <div className='row'>
            <h4>Vegetable Section</h4>
            <div className='col-md-8'>
              <h6><img src={`http://localhost:8000/${image}`} width="120px" alt={image}/></h6>
              <h4>{name}<p>by AgriKonnect</p></h4>
              <p>Category: {category}</p>
              <p>Growing Method: {description}</p>
              <p>Price: {price} </p>
              <p>Quantity: {value}</p>
              <div>
                <p>Seller: {seller}</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-3 mt-3'>
                <div className='input-group'>
                  <button type='button'onClick={handleDecrement} className='input-group-text'>-</button>
                  <div className='form-control text-center'>
                    {value}
                  </div>
                  <button type='button' onClick={handleIncrement} className='input-group-text'>+</button>
                </div>
              </div>
              <div className='col-md-3 mt-3'>
                <button type="submit" className='btn btn-primary w-100' >Add to Basket</button>
                <button type="submit" className='btn btn-primary w-100' >Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        <div className='card'>
          <div className='card-body'>
              <div className='row'>
                  <div className='col-md-12'>
                      <div className='form-group mb-3'>
                        <h4>Reviews</h4>
                        <hr></hr> 
                        <h6>Product Name: {review?.order_name}</h6>
                        <h6>Name: {review?.firstname} {review?.middlename} {review?.lastname}</h6>
                        <h6>Review: {review?.review}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </form>
      
      </>
      
    );
}
export default VegetableDetails;
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import NavbarCustomer from './NavbarCustomer';

function VegetableDetails()
{
    let user = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('user', JSON.stringify(user))

    const location = useLocation();
    const state = location.state;
    const [data, setData] = useState(state);
    const [loading, setLoading] = useState(true);
    const [value, setQuantity] = useState(1);

    const product_id = state.id;
    const vege = {
      user_id: state.user_id,
      name: state.name,
      seller_name: state.seller_name,
      description: state.description,
      price: state.price,
      quantity: state.quantity,
      category: state.category,
    }
    //let x = vege.user_id;
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/viewvegetable/${product_id}`, vege).then((res) => {
          if (res.status === 200) {
            setData(res.data.products);
            setLoading(false);
          }
        });
        console.log(data)
        
      },);

      //global.uid = vege.user_id;
      //global.name = vege.name

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
              <h4>{vege.name}<p>by AgriKonnect</p></h4>
              <p>Category: {vege.category}</p>
              <p>Growing Method: {vege.description}</p>
              <p>Price: {vege.price} </p>
              <p>Quantity: {value}</p>
              <div>
                <p>Seller: {vege.seller_name}</p>
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
      </div>
      </form>
      
      </>
      
    );
}
export default VegetableDetails;
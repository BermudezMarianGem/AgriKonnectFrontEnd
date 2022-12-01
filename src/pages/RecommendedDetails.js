import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useLocation} from 'react-router';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import NavbarCustomer from './NavbarCustomer';

function Recommended()
{

    const location = useLocation();
    const state = location.state;
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [value, setQuantity] = useState(1);

    const product_id = state.id;
    const fruits = {
      user_id: state.user_id,
      name: state.name,
      product_id: product_id,
      seller_name: state.seller_name,
      image: state.image,
      description: state.description,
      price: state.price,
      quantity: state.quantity,
      category: state.category,
    }

    console.log(fruits)
   // let x = fruits.user_id;
    
    
    // use effect get products information
    useEffect(() => {
        axios.get(`http://localhost:8000/api/viewfruit/${product_id}`, fruits).then((res) => {
          if (res.status === 200) {
            setData(res.data.products);
            setLoading(false);
          }
        });
        console.log(data)
        
      },);
    
      //global.uid = fruits.user_id;
      //global.name = fruits.name
    // quantity increment and decrement
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
      console.log(data)

    }
    
    // for submittiob of products
    
    /*const submitProduct = (e) => {
      e.preventDefault();

      const items = JSON.parse(localStorage.getItem('customer'));

      console.log('quote')
      const datas = {
        firstname: items.firstname,
        middlename: items.middlename,
        lastname: items.lastname,
        username: items.username,
        mobilephone: items.mobilephone,
        email: items.email,
        cart: items.cart,
        address: items.address,
      }

      axios.patch(`http://localhost:8000/api/addtoCart`, datas).then((res) => {
          setData(res.data.products);
          setLoading(false);
      });
      console.log(datas)

    }*/

    //loading ..
    if(loading)
      {
          return <h4>Loading Fruit Details...</h4>
      }
      
    return(
      <>
      
      <NavbarCustomer/>
      <Link to={'/fruits'} className="btn btn-danger btn-sm float-end"> BACK</Link>

      <form onSubmit={submitProduct}>
      <div className='py-3'>
        <div className='container'>
          <div className='row'>
            <h4>Fruits Section</h4>
            <div className='col-md-8'>
            <h6><img src={`http://localhost:8000/${fruits.image}`} width="120px" alt={fruits.image}/></h6>
              <h4>{fruits.name}</h4><p>by AgriKonnect</p>
              <p>Category: {fruits.category}</p>
              <p>Growing Method: {fruits.description}</p>
              <p>Price: {fruits.price} </p>
              <p>Quantity: {value}</p>
              <div>
                <p>Seller: {fruits.seller_name}</p>
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
            </div>
            <hr></hr>
            <div className='col-md-3 mt-3'>
              <button type="submit" className='btn btn-primary w-100' >Add to Basket</button><br></br>
              <button type="submit" className='btn btn-primary w-100' >Buy Now</button>
            </div>
          </div>
        </div>
      </div>

      </form>
      
      </>
      
    );
}
export default Recommended;
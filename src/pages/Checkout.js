import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarCustomer from './NavbarCustomer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Checkout() 
{
    let customer = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('customer', JSON.stringify(customer))

    const location = useLocation();
    const state = location.state;
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(state);

    const [checkoutInput, setCheckoutInput] = useState({
        shippingaddress: '',
        mobilephone: '',
        modeofpayment: '',

    });

    const [error, setError] = useState([]);
    const [orderData, setCustomer] = useState(state);
    
    var totalCartPrice = 0;

    const cart_id = state.id;
    const data = {
        item_id: state.id,
        seller_id: state.seller_id,
        name: state.name,
        price: state.price,
        fruits_qty: state.fruits_qty,
    }

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/checkout/${cart_id}`).then(res=>{
            if(res.status === 200)
            {
                //console.log(res.data)
                setCustomer(res.data.customer)
                setCart(res.data.cart)
                setLoading(false);
            }
        });
      },[cart_id]);

      console.log(data)

      const handleInput = (e) => {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value});
      }

      const submitOrder = (e) => {
        e.preventDefault();

        const orders = {
            cart_id: state.id,
            seller_id: state.seller_id,
            firstname:JSON.parse(localStorage.getItem('customer')).firstname,
            middlename:JSON.parse(localStorage.getItem('customer')).middlename,
            lastname:JSON.parse(localStorage.getItem('customer')).lastname,
            shippingaddress: checkoutInput.shippingaddress,
            mobilephone: checkoutInput.mobilephone,
            modeofpayment: checkoutInput.modeofpayment,
            customerId:JSON.parse(localStorage.getItem('customer')).id
        }

        console.log(orders)

        axios.post(`http://localhost:8000/api/place-order`, orders).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order Placed Successfully", res.data.message, "Success")
                setError([]);
                history('/basket');
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
          return <h4>Loading Checkout Details...</h4>
      }
        totalCartPrice += data.price * data.fruits_qty;
        /*
        var showCheckOutDetails = "";
        showCheckOutDetails = cart.map( (item, idx) => {
            totalCartPrice += item.price * item.fruits_qty;
            return(
                <div className='col-md-12' key={idx}>
                    <div className='card'>
                        <div className='card-body'>
                            <h6>{item.name}</h6>
                            <h6>Php: {item.price * item.fruits_qty}.00</h6>
                        </div>
                    </div>
                    <br></br>
                    <div  className="form-group mb-3">
                        <div className="material-textfield">
                            <input placeholder=" " name="address" type="text"/>
                        <label>Shipping Address</label>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <div className="material-textfield">
                        <select name="modeofpayment" id="modeofpayment"  className="form-control">
                            <option value="default" selected hidden>Select mode of payment</option>
                            <option value = "Cash on Delivery">Cash on Delivery (pay when you receive) </option>
                                <option value = "Online Payment">Online Payment (Thru Gcash)</option>
                        </select>
                        </div>
                    </div>
                    <div  className="form-group mb-3">
                        <div className="material-textfield">
                            <input placeholder=" " name="voucher" type="text"/>
                        <label>Enter your voucher code</label>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <p>Order Amount: {totalCartPrice}</p>
                    </div>
                        <div className="form-group mb-3">
                            <p>Subtotal: {totalCartPrice}</p>
                        </div>
                    </div>
            )
        });*/
      

    return (
        <>
        <NavbarCustomer/>
        <div>
            <h5>Checkout Details</h5>
            <Link to ="/basket" className="btn btn-primary">Back</Link>
            <form>
                <div className='py-4'>
                    <div className="container">
                        <div className="row">
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='form-group mb-3'>
                                                <h4>{data.name}</h4>
                                                <p>Php {totalCartPrice}.00</p>
                                                <div className="form-group mb-3">
                                                    <label>Shipping Address</label>
                                                    <input type="text" name="shippingaddress" onChange={handleInput} value={checkoutInput.shippingaddress}  className="form-control" placeholder='Enter Shipping Address' />
                                                    <small className='text-danger'>{error.shippingaddress}</small>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Select Payment Method</label>
                                                    <select type="text" id="modeofpayment" name="modeofpayment" onChange={handleInput} value={checkoutInput.modeofpayment} className="form-control">
                                                        <option value="default" selected hidden>Select Payment Method</option>
                                                        <option value = "Cash on Delivery">Cash on Delivery (pay when you order)</option>
                                                        <option value = "Online Payment">Online Payment (Gcash)</option>
                                                    </select>
                                                    <small className='text-danger'>{error.modeofpayment}</small>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Mobile Phone</label>
                                                    <input type="text" name="mobilephone" onChange={handleInput} value={checkoutInput.mobilephone}  className="form-control" placeholder='Enter Shipping Address' />
                                                    <small className='text-danger'>{error.mobilephone}</small>
                                                </div>
                                                
                                                <p>Subtotal: Php{totalCartPrice}.00</p>
                                                <p>Subtotal: Php{totalCartPrice}.00</p>
                                                <hr/>
                                                <Link to ="/placeorder" className="btn btn-primary" onClick={submitOrder}>Place Order</Link>
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
    </>
    )

}

export default Checkout;
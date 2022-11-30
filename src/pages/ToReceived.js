import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import NavbarCustomer from './NavbarCustomer';

function ToReceivedPage() 
{
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [forDelivery, setToDeliver] = useState([]);

    let customer = JSON.parse(localStorage.getItem('user-info'))
    let id = customer.id;

    const productId = forDelivery[0]?.product_id;
    const sellerId = forDelivery[0]?.seller_id;
    const customerId = forDelivery[0]?.customerId;
    const orderId = forDelivery[0]?.order_id;
    const orderName = forDelivery[0]?.order_name;
    const orderQty = forDelivery[0]?.order_qty;
    const orderPrice = forDelivery[0]?.order_price;
    const orderTotal = forDelivery[0]?.order_total;
    const firstname = forDelivery[0]?.firstname;
    const middlename = forDelivery[0]?.middlename;
    const lastname = forDelivery[0]?.lastname;
    const mobilephone = forDelivery[0]?.contactNo;
    const shippingaddress = forDelivery[0]?.shippingaddress;
    const modeofpayment = forDelivery[0]?.modeofpayment;


    useEffect(() => {

        axios.get(`http://localhost:8000/api/out-for-delivery/${id}`).then((res) => {
          if (res.status === 200) {
            setToDeliver(res.data.deliveries);
            setLoading(false);
          }
        });
        
      }, [id]);

      console.log(forDelivery)
      
    const orderDelivered = (e) => {
        e.preventDefault();

        const delivered = {
            product_id: productId,
            seller_id: sellerId,
            customerId: customerId,
            order_id: orderId,
            order_name: orderName,
            order_qty: orderQty,
            order_price: orderPrice,
            order_total: orderTotal,
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            contactNo: mobilephone,
            shippingaddress: shippingaddress,
            modeofpayment: modeofpayment,
        }
        console.log(delivered)

        axios.post(`http://localhost:8000/api/order-delivered`, delivered).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order Delivered", res.data.message, "Success")
                history('/toReview')
            }
         });
    }
      
    if(loading)
        {
            return <h4>Loading For Delivery Orders...</h4>
        }

        if (forDelivery.length > 0)
        {
            var showOutforDeliveryOrders = "";
            showOutforDeliveryOrders = forDelivery.map( (item, idx) => {
                return(
                <div className='col-md-12' key={idx}>
                    <div className='card'>
                        <div className='card-body'>
                            <h6>{item.order_name}</h6>
                            <h6>Price: Php {item.order_price}.00</h6>
                            <h6>Quantity: {item.order_qty}kg</h6>
                            <h6>Total Price: Php {item.order_total}.00</h6>
                            <h6><button type="submit" className='btn btn-primary w-100' onClick={orderDelivered}>Delivered</button></h6>
                        </div>
                    </div>
                </div>
                    
                )
            });

        }

        else {
            showOutforDeliveryOrders =<div>
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
            <form >
            <div className="container">
                <div className="row">
                    <div>
                        <div className="card">
                            <div className="card-header">
                                <h4>My Order</h4>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className='row'>
                                    {showOutforDeliveryOrders}
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
    );

}

export default ToReceivedPage;
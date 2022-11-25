import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import NavbarCustomer from './NavbarCustomer';


function ToPay() 
{
    const location = useLocation();
    const state = location.state;
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [toPay, setToPay] = useState(state);
    //const [order, setOrder] = useState(state);

    useEffect(() => {
        if (Object.keys(customer).length === 0) {
            setCustomer(JSON.parse(localStorage.getItem('customer')))
        }
        
        axios.get(`http://127.0.0.1:8000/api/show-to-pay/${customer.id}`).then(res=>{
            if(res.status === 200)
            {
                //console.log(res.data)
                setToPay(res.data.toPay)
                //setOrder(res.data.order_items)
                setLoading(false);
            }
        });
        
      },[customer]);
      console.log(toPay)
      //console.log(order)
      if(loading)
      {
          return <h4>Loading Basket...</h4>
      }
      
    
       var showToPayList = "";
        showToPayList = toPay.map( (item, idx) => {
            return(
                <div className='col-md-12' key={idx}>
                    <div className='card'>
                        <div className='card-body'>
                            <h6>{item.order_name}</h6>
                            <h6>Price: Php {item.price}.00</h6>
                            <h6>Quantity: {item.qty}kg</h6>
                            <h6>Total Price: Php {item.total_price}.00</h6>
                            <Link to ={`/order-received/${item.id}`} state={item}className="btn btn-primary" >Order Received</Link>
                        </div>
                    </div>
                </div>
            )
        })

    

    return (
        <>
        <NavbarCustomer/>
        <div>

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
                                    {showToPayList}
                                    </div>
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
        </>
    )

}

export default ToPay;
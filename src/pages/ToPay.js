import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarCustomer from './NavbarCustomer';


function ToPay() 
{
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true);
    const [toPay, setToPay] = useState([]);

    useEffect(() => {
        if (Object.keys(customer).length === 0) {
            setCustomer(JSON.parse(localStorage.getItem('customer')))
        }
        
        axios.get(`http://127.0.0.1:8000/api/show-to-pay/${customer.id}`).then(res=>{
            if(res.status === 200)
            {
                setToPay(res.data.toPay)
                setLoading(false);
            }
        });
        
      },[customer]);
      console.log(toPay)
      if(loading)
      {
          return <h4>Loading Basket...</h4>
      }
      
      if(toPay.length > 0)
      {
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
                            <hr></hr>
                            <h6>Product Status: Pending..</h6>
                        </div>
                    </div>
                </div>
            )
        })
      }
      else {
        showToPayList =<div>
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
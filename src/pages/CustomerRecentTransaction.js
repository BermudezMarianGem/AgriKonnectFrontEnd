import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarCustomer from './NavbarCustomer';
function CustomerRecentPage() 
{
    const [loading, setLoading] = useState(true);
    const [recent, setRecent] = useState();

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    useEffect(() => {

        axios.get(`http://localhost:8000/api/customer-recent/${user_id}`).then((res) => {
          if (res.status === 200) {
            setRecent(res.data.reviews);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      
      if(loading)
        {
            return <h4>Loading Recent Purchase...</h4>
        }

        if (recent.length > 0)
        {
            var showRecentPurchase = "";
            showRecentPurchase = recent.map( (item, idx) => {
                return(
                    <tr key={idx}>
                    <td>{item.order_id}</td>
                    <td>{item.order_name}</td>
                    <td>{item.order_qty}</td>
                    <td>{item.order_total}.00</td>
                </tr>
                )
            });

        }

        else {
            showRecentPurchase =<div>
                <div className='card card-body py05 text-center shadow-sm'>
                <h6>No Available transaction</h6>
            </div>
        </div>
        }
   
           

    return (
        <>
        <NavbarCustomer/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <p>Your recent purchase</p>
                    <div className="card-body">
                                
                    <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Quantity (kg) </th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showRecentPurchase}
                            </tbody>
                        </table>
                </div>
                </div>
            </div>
        </div>
       </> 
    );

}

export default CustomerRecentPage;
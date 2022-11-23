import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebars from './Sidebars';

function TransactionPage() 
{
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/showOrder/${user_id}`).then((res) => {
          if (res.status === 200) {
            setOrders(res.data.orders);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      console.log(orders)
      
      
      if(loading)
        {
            return <h4>Loading Transaction Data...</h4>
        }

        if (orders.length > 0)
        {
            var showOrderList = "";
            showOrderList = orders.map( (item, idx) => {
                return(
                    <div className='col-md-3' key={idx}>
                        <div className='card'>
                            <div className='card-body'>
                                <h5>{item.id}</h5>
                                <h4>{item.firstname}</h4>
                            </div>
                        </div>
                    </div>
                )
            });

        }

        else {
            showOrderList =<div>
                <div className='card card-body py05 text-center shadow-sm'>
                <h4></h4>
                <h6>No Available transaction</h6>
            </div>
        </div>
        }
   
           

    return (
        <>
        <Sidebars/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <p>Transaction Page</p>
                    <button className='btn btn-primary'>Ongoing</button><button className='btn btn-primary'>Delivered</button>
                    <div className="card-body">
                                
                    <div className='py-3'>
                        <div className='row'>
                            {showOrderList}
                        </div>

                    </div>
                </div>
                </div>
            </div>
        </div>
       </> 
    );

}

export default TransactionPage;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebars from './Sidebars';

function TransactionPage(props) 
{
    const location = useLocation();
    const state = location.state;
    const [loading, setLoading] = useState(true);
    const [order_items, setItems] = useState(state);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/showOrder/${user_id}`).then((res) => {
          if (res.status === 200) {
            setItems(res.data.order_items);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      
      if(loading)
        {
            return <h4>Loading Transaction Data...</h4>
        }

        if (order_items.length > 0)
        {
            var showOrderList = "";
            showOrderList = order_items.map( (item, idx) => {
                return(
                    <tr key={idx}>
                        <td>{item.order_id}</td>
                        <td>{item.order_name}</td>
                        <td>{item.qty}</td>
                        <td>{item.total_price}.00</td>
                        <Link to={`/order-details/${item.order_id}`} state={item} className="btn btn-primary">
                                <h5>View Product Details</h5>
                                </Link>
                    </tr>
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
                                {showOrderList}
                            </tbody>
                        </table>
                </div>
                </div>
            </div>
        </div>
       </> 
    );

}

export default TransactionPage;
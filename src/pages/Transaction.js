import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebars from './Sidebars';

function TransactionPage() 
{
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    console.log(orders)

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/showOrder/${user_id}`).then((res) => {
          if (res.status === 200) {
            setOrders(res.data.orders);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      const outfordelivery = (e) => {
        e.preventDefault();

        const submitOrder = {
            product_id: orders[0]?.product_id,
            seller_id: user_id,
            customer_id: orders[0]?.user_id,
            order_id: orders[0]?.id,
            order_name: orders[0]?.order_name,
            order_qty: orders[0]?.product_qty,
            order_price: orders[0]?.price,
            order_total: orders[0]?.total_price,
            firstname: orders[0]?.firstname,
            middlename: orders[0]?.middlename,
            lastname: orders[0]?.lastname,
            mobilephone: orders[0]?.mobilephone,
            shippingaddress: orders[0]?.shippingaddress,
            modeofpayment: orders[0]?.modeofpayment,
            
        }

        axios.post(`http://localhost:8000/api/out-for-delivery`, submitOrder).then(res=> {
            if(res.data.status === 200)
            {
                swal("Order is out for Delivery", res.data.message, "Success")
                history('/to-ship');
            }
         });
      }

      
      if(loading)
        {
            return <h4>Loading Transaction Data...</h4>
        }

        //if (orders.length > 0)
        //{
            var showOrderList = "";
            showOrderList = orders.map( (item, idx) => {
                return(
                    <tr key={idx}>
                        <td>{item.id}</td>
                        <td>{item.order_name}</td>
                        <td>{item.product_qty}</td>
                        <td>{item.price}.00</td>
                        <td>{item.shippingfee}.00</td>
                        <td>{item.total_price}.00</td>
                        <td>{item.firstname} {item.middlename} {item.lastname}</td>
                        <td>{item.mobilephone}</td>
                        <td>{item.shippingaddress}</td>
                        <td>{item.modeofpayment}</td>
                        <td><button type="submit" className='btn btn-primary w-100' onClick={outfordelivery}>Delivered</button></td>
                    </tr>
                )
            });

    return (
        <>
        <Sidebars/>
        <div>
            <form >
            
            </form>
            <div className='content'>
                <div className='contentText'>
                    <p>Transaction Page</p>
                    <Link to = '/to-ship' className="btn btn-primary" >Ongoing</Link><Link to = '/delivered' className="btn btn-primary" >Delivered</Link>
                    <div className="card-body">
                    <div>
                    <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Quantity (kg) </th>
                                    <th>Unit Price</th>
                                    <th>Shipping Fee</th>
                                    <th>Total Price</th>
                                    <th>Customer Name</th>
                                    <th>Mobile Phone</th>
                                    <th>Shipping Address</th>
                                    <th>Mode of Payment</th>
                                    <th>Order Status</th>
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
        </div>
       </> 
    );

}

export default TransactionPage;
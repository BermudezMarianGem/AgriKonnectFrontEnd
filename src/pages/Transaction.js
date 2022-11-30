import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebars from './Sidebars';

function TransactionPage() 
{
    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [order_items, setItems] = useState([]);
    const [info, setInfo] = useState([]);

    let user = JSON.parse(localStorage.getItem('user-info'))
    const user_id = user.id;

    const customer_id = info.user_id;
    const order_id = order_items[0]?.order_id;
    const order_name = order_items[0]?.order_name;
    const price = order_items[0]?.price;
    const total_price = order_items[0]?.total_price;
    const qty = order_items[0]?.qty;
    console.log(order_items)
    console.log(info)

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/showOrder/${user_id}`).then((res) => {
          if (res.status === 200) {
            setItems(res.data.order_items);
            setInfo(res.data.orders[0]);
            setLoading(false);
          }
        });
        
      }, [user_id]);
      
      const outfordelivery = (e) => {
        e.preventDefault();

        const submitOrder = {
            product_id: info.product_id,
            seller_id: user_id,
            customer_id: customer_id,
            order_id: order_id,
            order_name: order_name,
            order_qty: qty,
            order_price: price,
            order_total: total_price,
            firstname: info.firstname,
            middlename: info.middlename,
            lastname: info.lastname,
            mobilephone: info.mobilephone,
            shippingaddress: info.shippingaddress,
            modeofpayment: info.modeofpayment,
            
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

        //if (order_items.length > 0)
        //{
            var showOrderList = "";
            showOrderList = order_items.map( (item, idx) => {
                return(
                    <tr key={idx}>
                        <td>{item.order_id}</td>
                        <td>{item.order_name}</td>
                        <td>{item.qty}</td>
                        <td>{item.price}.00</td>
                        <td>{item.total_price}.00</td>
                        <td>{info.firstname} {info.middlename} {info.lastname}</td>
                        <td>{info.mobilephone}</td>
                        <td>{info.shippingaddress}</td>
                        <td>{info.modeofpayment}</td>
                        <td><button type="submit" className='btn btn-primary w-100' onClick={outfordelivery}>Out for Delivery</button></td>
                    </tr>
                )
            });

    return (
        <>
        <Sidebars/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <p>Transaction Page</p>
                    <Link to = '/to-ship' className="btn btn-primary" >Ongoing</Link><Link to = '/delivered' className="btn btn-primary" >Delivered</Link>
                    <div className="card-body">
                                
                    <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Quantity (kg) </th>
                                    <th>Unit Price</th>
                                    <th>Total Price</th>
                                    <th>Customer Name</th>
                                    <th>Phone Number</th>
                                    <th>Shipping Address</th>
                                    <th>Mode of Payment</th>
                                    <th>Shipping Status</th>
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
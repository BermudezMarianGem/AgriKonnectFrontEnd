import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebars from './Sidebars';
import BCHART from './Visualization';

const Homepage = () =>
{
    const [sold, setSold] = useState([]);
    let user = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('user', JSON.stringify(user))

    const user_id = user.id;


    useEffect(() => {
        axios.get(`http://localhost:8000/api/recent/${user_id}`).then((res) => {
          if (res.status === 200) {
            setSold(res.data.reviews);
          }
        });

      }, [user_id]);

      console.log(sold)

      var showRecentSold = "";
      showRecentSold = sold.map((item, idx) => {
        return (
            <div className='col-md-3' key={idx}>
                <div className='card'>
                    <div className='card-body'>
                    <h6>Product Name: {item.order_name}</h6>
                    <h6>Quantity: {item.order_qty}</h6>
                    <h6>Date: {item.created_at}</h6>
                        <hr></hr>
                    </div>
                </div>
            </div>
        )
      })

    return(
        <>
        <Sidebars />
        <div className='page-content-wrapper'>
            <div style={{ marginLeft: 70 }}>
                <BCHART/>
            </div>
              
            <div className="container-fluid">
                <h1 className="mt-4">Welcome { user.firstname} </h1>
                <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
                <h4>Recent Sold</h4>
                {showRecentSold}

            </div>
        </div>
        </>
    );

}

export default Homepage;
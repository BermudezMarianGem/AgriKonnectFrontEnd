
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import NavbarCustomer from './NavbarCustomer';

function FruitPages()
{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    let customer = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('customer', JSON.stringify(customer))
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/fruit`).then((res) => {
          if (res.status === 200) {
            setData(res.data.products);
            setLoading(false);
          }
        });

        
      }, []);
      console.log(data)
      
    if(loading)
    {
        return <h4>Loading Product Data...</h4>
    }
    else
    {
        var showProductList = "";
            showProductList = data.map( (item, idx) => {
                return(
                    <div className='col-md-3' key={idx}>
                        <div className='card'>
                            <div className='card-body'>
                                <Link to={`/fruits/${item.name}`} state={item}>
                                <h5>{item.name}</h5>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            });
        
        /*var product_HTMLTABLE = "";
       
        product_HTMLTABLE = data.map( (item, index) => {
            return (
            
                <tr key={index}>
      
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                </tr>
            );
        });*/
    }
      
     

    return(
        <>
        <NavbarCustomer/>
        <div className='page-content-wrapper'>
               
            <div className="container-fluid">
                <h1 className="mt-4">Welcome { customer.firstname} </h1>
                <p>What would you buy today?</p>
            </div>
            <div className="input-group rounded">
                <Link to="/searchproduct"><input type="search" className="form-control rounded" placeholder="Search by item name" aria-label="Search" aria-describedby="search-addon" /></Link><Link to={"/basket"} className="btn btn-primary">Basket</Link>
            </div><br/>
            <div>
                <h1>Categories</h1>
                <div className="card-body">
                                
                <div className='py-3'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <div className='card'>
                                <div className='card-body'>
                                    <Link to={"/vegetables"}className="card-text">Vegetables</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className='card'>
                                <div className='card-body'>
                                    <Link to={"/fruits"}className="card-text">Fruits</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className='card'>
                                <div className='card-body'>
                                    <Link to={"/sales"}className="card-text">Sale</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <div className='card'>
                                <div className='card-body'>
                                    <Link to={"/freedelivery"}className="card-text">Free Delivery</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </div>
            <div>
            
            <h1>Fruit Section</h1>

            <div className="card-body">
                                
                <div className='py-3'>
                    <div className='row'>
                        {showProductList}
                    </div>

                </div>
            </div>
        </div>
            
        </div>
        </>
    );
}

export default FruitPages;
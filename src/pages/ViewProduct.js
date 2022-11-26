import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Sidebars from './Sidebars';

function ViewProduct({userData}) {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        
        axios.get(`http://127.0.0.1:8000/api/products/${user.id}`).then(res=>{
            if(res.status === 200)
            {
                //console.log(res.data)
                setProducts(res.data)
                setLoading(false);
            }
        });
    }, [user]);

    const deleteProduct = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`http://localhost:8000/api/products/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Product Data...</h4>
    }
    
    if (products.length > 0)
    {
        var showProductList = "";
        showProductList = products.map( (item, idx) => {
            return(
                <div className='col-md-20' key={idx}>
                    <div className='card'>
                        <div className='card-body'>
                            <h6>{item.id}</h6>
                            <h6>{item.category}</h6>
                            <h6>{item.name}</h6>
                            <h6>{item.description}</h6>
                            <h6>{item.price}</h6>
                            <h6>{item.quantity}</h6>
                        </div>
                        <Link to={"/edit-product"} state={item} className="btn btn-success btn-sm">Edit</Link>
                        <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
            )
        });
    }
    else{
        showProductList = <div>
            <div className='card card-body py05 text-center shadow-sm'>
                <h4>Welcome {user.name}</h4>
                <h6>You can now post your products.</h6>
            </div>
        </div>
      }
    
        
        /*var product_HTMLTABLE = "";
       
        product_HTMLTABLE = products.map( (item, index) => {
            return (
            
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <Link to={"/edit-product"} state={item} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteProduct(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });*/
    

    return (
        <>
        <Sidebars/>
        <div>
            <div className="container">
                <div className="row">
                    <div className="card">
                    <div className="card-header">
                        <h4>My Products</h4> <Link to={'/add-product'} className="btn btn-primary btn-sm float-end"> Add Product</Link>
                    </div>
                        <div className="card-body">
                            <div className='row'>
                                {showProductList}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}

export default ViewProduct;
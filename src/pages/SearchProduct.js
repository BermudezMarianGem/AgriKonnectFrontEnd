import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarCustomer from "./NavbarCustomer";

function SearchProduct() {

    const [table, setTable] = useState(null);
    let customer = JSON.parse(localStorage.getItem('user-info'))
    localStorage.setItem('customer', JSON.stringify(customer))

    
    async function search(key) {
        console.warn(key)
        let result = await fetch("http://localhost:8000/api/search/"+key);
        console.log(result);
        result = await result.json();
 
        var productList = result.map((item, index) => {
            return(
                <div className='col-md-3' key={index}>
                    <div className='card'>
                        <div className='card-body'>
                        <h6><img src={`http://localhost:8000/${item.image}`} width="120px" alt={item.image}/></h6>
                            <Link to={`/vegetables/${item.name}`} state={item}>
                            <h5>{item.name}</h5>
                            </Link>
                            <hr></hr>
                            <p>Price: Php {item.price}.00</p>
                            <p>Seller: {item.seller_name}</p>
                        </div>
                    </div>
                </div>
            );
        });
        setTable(productList)

    }

    return (
        <div>
            <NavbarCustomer />
            <div className='page-content-wrapper'>
               
            <div className="container-fluid">
                <h1 className="mt-4">Welcome { customer.firstname} </h1>
                <p>What would you buy today?</p>
            </div>
            <div className="input-group rounded">
                <input type='text' onChange={(e)=>search(e.target.value)} className="form-control" placeholder="Search Product" /><Link to={"/basket"} className="btn btn-primary">Basket</Link>
            </div><br/>
            <div>
            <div className='card'>
                <div className='card-body'>
                    <h4>Result</h4>
                {table}
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}

export default SearchProduct;
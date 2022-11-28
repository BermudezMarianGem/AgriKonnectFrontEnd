import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useLocation} from 'react-router';


const EditProduct = ({productdata}) => {

    const [user, setUser]= useState(null);
    const location = useLocation();
    const history = useNavigate();
    const [errorInput, setError] = useState([]);
    const state = location.state;
    const [productInput, setProduct] = useState(state);

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value });
    }

    const updateProduct = (e) => {
        e.preventDefault();
        
        const product_id = state.id;
        const data = {
            userId: user.id,
            category: productInput.category || state.category,
            name: productInput.name || state.name,
            description: productInput.description || state.description,
            price: productInput.price || state.price,
            quantity: productInput.quantity || state.quantity,
        }
        console.log(data)
        axios.put(`http://localhost:8000/api/products/${product_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history('/products');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/products');
            }
        });
    }
    React.useEffect(() => {
        console.log(localStorage.getItem('user'))
        if (!user){
            
            setUser(JSON.parse(localStorage.getItem('user')))
        }

    },[user])

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Products 
                                    <Link to={'/products'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={(e) => updateProduct(e)} >
                                    <div className="form-group mb-12">
                                        <label>Product Category</label>
                                        <select type="text" id="category" name="category" onChange={(e) => handleInput(e)} defaultValue={productInput.category} className="form-control">
                                            <option value="default" selected hidden>Select Category</option>
                                            <option value = "Vegetable">Vegetable</option>
                                            <option value = "Fruit">Fruit</option>
                                        </select>
                                        <span className="text-danger">{errorInput.category}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Name</label>
                                        <input type="text" name="name" onChange={(e) => handleInput(e)} value={productInput.name}  className="form-control" />
                                        <span className="text-danger">{errorInput.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Description</label>
                                        <select type="text" id="description" name="description" onChange={(e) => handleInput(e)} defaultValue={productInput.description} className="form-control">
                                            <option value="default" selected hidden>Select Product Description</option>
                                            <option value = "Organic">Organic</option>
                                            <option value = "Fertilize">Fertilize</option>
                                        </select>
                                        <span className="text-danger">{errorInput.description}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Price</label>
                                        <input type="text" name="price" onChange={(e) => handleInput(e)} value={productInput.price}  className="form-control" />
                                        <span className="text-danger">{errorInput.price}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Quantity</label>
                                        <input type="text" name="quantity" onChange={(e) => handleInput(e)} value={productInput.quantity}  className="form-control" />
                                        <span className="text-danger">{errorInput.quantity}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Product</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditProduct; 
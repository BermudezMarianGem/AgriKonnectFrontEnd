import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


const AddProduct = () => {


    let user = JSON.parse(localStorage.getItem('user-info'))

    const history = useNavigate();
    const [productInput, setProduct] = useState({
        category:'',
        name: '',
        seller_name: '',
        description: '',
        price: '',
        quantity: '',
        error_list: [],
    });

    console.log(user)

    const [productImage, setImage] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        setImage({image:e.target.files[0]});
      }
  

    const saveProduct = (e) => {
        e.preventDefault();
        
        /*const data = {
            category:productInput.category,
            name:productInput.name,
            seller_name: user.firstname,
            description:productInput.description,
            price:productInput.price,
            quantity:productInput.quantity,
            userId:user.id
        }
        console.log(data);*/

        const formData = new FormData();
        formData.append('image', productImage.image);
        formData.append('category', productInput.category);
        formData.append('name', productInput.name);
        formData.append('seller_name', user.firstname);
        formData.append('description', productInput.description);
        formData.append('price', productInput.price);
        formData.append('quantity', productInput.quantity);
        formData.append('user_id', user.id);

        axios.post(`http://localhost:8000/api/products`, formData).then(res => {

            if(res.data.status === 200)
            {
                swal("Success!",res.data.message,"success");
                history('/products');
            }
            else if(res.data.status === 422)
            {
                swal('All fields are required', 'error');
            }
        });
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Product 
                                    <Link to={'/products'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveProduct} >
                                <div className="container">
                                    <div className="material-textfield">
                                    <input placeholder=" " name="image" onChange={handleImage} type="file"/>
                                    <label>Upload product image</label>
                                    </div>
                                </div>
                                    <div className="form-group mb-3">
                                        <label>Product Category</label>
                                        <select type="text" id="category" name="category" onChange={handleInput} defaultValue={productInput.category} className="form-control">
                                            <option value="default" selected hidden>Select Product Category</option>
                                            <option value = "Vegetable">Vegetable</option>
                                            <option value = "Fruit">Fruit</option>
                                        </select>
                                        <span className="text-danger">{productInput.error_list.category}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={productInput.name}  className="form-control" />
                                        <span className="text-danger">{productInput.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Description</label>
                                        <select type="text" id="description" name="description" onChange={handleInput} defaultValue={productInput.description} className="form-control">
                                            <option value="default" selected hidden>Select Product Description</option>
                                            <option value = "Organic">Organic</option>
                                            <option value = "Fertilize">Fertilize</option>
                                        </select>
                                        <span className="text-danger">{productInput.error_list.description}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Price</label>
                                        <input type="text" name="price" onChange={handleInput} value={productInput.price}  className="form-control" />
                                        <span className="text-danger">{productInput.error_list.price}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Product Quantity</label>
                                        <input type="text" name="quantity" onChange={handleInput} value={productInput.quantity}  className="form-control" />
                                        <span className="text-danger">{productInput.error_list.quantity}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Product</button>
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

export default AddProduct;
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useLocation} from 'react-router';


const EditPassword = () => {

    const location = useLocation();
    const history = useNavigate();
    const [errorInput, setError] = useState([]);
    const state = location.state;
    const [userInput, setPassword] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setPassword({...userInput, [e.target.name]: e.target.value });
    }

    const updatePassword = (e) => {
        e.preventDefault();
        
        const user_id = state.id;
        const data = {
            password: userInput.password || state.password,
        }
        console.log(data)
        axios.put(`http://localhost:8000/api/updatePassword/${user_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history('/account');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history('/account');
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
                                <h4>Edit Products 
                                    <Link to={'/account'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={(e) => updatePassword(e)} >

                                    <div className="form-group mb-3">
                                        <label>New Password</label>
                                        <input type="text" name="password" onChange={(e) => handleInput(e)} defaultValue={userInput.password}  className="form-control" />
                                        <span className="text-danger">{errorInput.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Save Password</button>
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

export default EditPassword; 
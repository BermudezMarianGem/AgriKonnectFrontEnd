import axios from 'axios';
import React , {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import swal from 'sweetalert';
import loginpic from '../pages/images/login.png';

const Register = () => {

    const history = useNavigate();
    const [userInput, setUser] = useState({
      firstname: '',
      middlename: '',
      lastname: '',
      username: '',
      email: '',
      mobilephone: '',
      password: '',
      shippingfee: '',
      verified: 'false',
    });

    const [proof, setProof] = useState([]);
    const [errorList, setError] = useState([]);

    const handleInput = (e) => {
      e.persist();
      setUser({...userInput, [e.target.name]:e.target.value});
    }

    const handleImage = (e) => {
      setProof({image:e.target.files[0]});
    }

    const signUp = (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('image', proof.image);
      formData.append('firstname', userInput.firstname);
      formData.append('middlename', userInput.middlename);
      formData.append('lastname', userInput.lastname);
      formData.append('username', userInput.username);
      formData.append('mobilephone', userInput.mobilephone);
      formData.append('email', userInput.email);
      formData.append('password', userInput.password);
      formData.append('shippingfee', userInput.shippingfee);
      formData.append('verified', userInput.verified);


      axios.post(`http://localhost:8000/api/register`, formData).then(res=>{
        if(res.data.status === 200)
        {
            swal('Success', res.data.message,'success');
            setError([]);
            history('/login-seller');
        }
        else if(res.data.status === 422)
        {
            swal('All fields are required', 'error');
            setError(res.data.errors);
        }
      });
    }

    return (
    <div className="Parent">
        <div className="child1">
            <center>
            <img className="login-flat" src={loginpic} alt="login" width={100} height={100}></img>
            </center>
        </div>
        <div className="child2">
            <center>
             <div className="title-create">
                <p>CREATE ACCOUNT</p>
              </div>
              <div className="title-content">
                <p>Sign-up as a seller</p>
              </div>
              <form onSubmit={signUp} encType='multipart/form-data'>
              <div className='input-create'>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder=" " name="firstname" onChange={handleInput} value={userInput.firstname} type="text"/>
                  <label>First name</label>
                  <small className='text-danger'>{errorList.firstname}</small>
                </div>
              </div>
                  <br></br>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder=" " name="middlename" onChange={handleInput} value={userInput.middlename} type="text"/>
                  <label>Middle name</label>
                  <small className='text-danger'>{errorList.middlename}</small>
                </div>
              </div>
                  <br></br>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder=" " name="lastname" onChange={handleInput} value={userInput.lastname} type="text"/>
                  <label>Last name</label>
                  <small className='text-danger'>{errorList.lastname}</small>
                </div>
              </div>
              <br></br>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder=" " name="username" onChange={handleInput} value={userInput.username} type="text"/>
                  <label>Username</label>
                  <small className='text-danger'>{errorList.username}</small>
                </div>
              </div>
              <br></br>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder=" " name="image" onChange={handleImage} type="file"/>
                  <label>Upload picture of you with any valid ID beside you</label>
                  <small className='text-danger'>{errorList.image}</small>
                </div>
              </div>
              <br></br>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder=" " name="email" onChange={handleInput} value={userInput.email} type="text"/>
                  <label>Email</label>
                </div>
              </div>
              <br></br>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder="Enter your standard shipping fee" name="shippingfee" onChange={handleInput} value={userInput.shippingfee} type="text"/>
                  <label>Shipping Fee</label>
                  <small className='text-danger'>{errorList.shippingfee}</small>
                </div>
              </div>
              <br></br>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder=" " name="mobilephone" onChange={handleInput} value={userInput.mobilephone} type="text"/>
                  <label>Phone Number</label>
                  <small className='text-danger'>{errorList.mobilephone}</small>
                </div>
              </div>
              <br></br>
              <div className="container">
                <div className="material-textfield">
                  <input placeholder=" " name="password" onChange={handleInput} value={userInput.password} type="password"/>
                  <label>Password</label>
                  <small className='text-danger'>{errorList.password}</small>
                </div>
              </div>
              <br></br>
              </div>
              <div className="button">
                <button type="submit" className="bttn-register"> REGISTER </button>
              </div>
              <div className='login-bttn'>
                <p>Already have an account?<Link to ="/login-seller"><b><u>Login here</u></b></Link></p>
              </div>
              </form>
              
            </center>
        </div>
    </div>
    );

}

export default Register;
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const AdminSideBar = () =>
{
    const history = useNavigate();

    function logout()
    {
        localStorage.clear();
        history("/adminlogin");
    }

    return(
        <div className='d-flex' id="wrapper">
            <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light">AgriKonnect</div>
                <div className="list-group list-group-flush">
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/unverified">Unverified Seller</Link>
                    <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/verified">Verified Seller</Link>
                    <button className='btn btn-primary' onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );

}

export default AdminSideBar;
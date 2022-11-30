import React  from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Sidebars from './Sidebars';

function AccountPage() 
{
    let user = JSON.parse(localStorage.getItem('user-info'))
    const history = useNavigate();

    function logout()
    {
        localStorage.clear();
        history('/login-seller')
    }
    return (
        <>
        <Sidebars/>
        <div>
            <div className='content'>
                <div className='contentText'>
                    <Link to={`/edit-userprofile/`} state={user} className="btn btn-primary btn-sm float-start">Edit Picture</Link>
                    <p>{user.firstname}</p>
                    <p>{user.email}</p>
                </div>
                <Link to={'/accountview'} className="btn btn-primary btn-sm float-start">Contact Information</Link>
                <Link to={'/edit-password'} state={user} className="btn btn-primary btn-sm float-start"> Password</Link>
                <Link to={'/review-page'} className="btn btn-primary btn-sm float-start"> Review</Link>
                <button className='btn btn-primary' onClick={logout}>Logout</button>
            </div>
        </div>
        </>
    );

}

export default AccountPage;
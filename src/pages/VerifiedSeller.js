import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import AdminSideBar from './AdminSidebar';
import swal from 'sweetalert';

function VerifiedTable() {

    const [loading, setLoading] = useState(true);
    const [users2, setUser2] = useState([]);
    const history = useNavigate();

    useEffect(() => {

        axios.get(`http://localhost:8000/api/users2`).then(res=>{
            if(res.status === 200)
            {
                setUser2(res.data.users2)
                setLoading(false);
            }
        });

    }, []);
    
    const updateSeller = (e) => {
        e.preventDefault();

        const sellerData = {
            verified: 'true',
        }

        axios.post( `http://localhost:8000/api/update-verification/${users2[0].id}`, sellerData).then(res=> {
        if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                history('/verified');
            }
    });
    }

    if(loading)
    {
        return <h4>Loading User Data...</h4>
    }
    else
    {
        var user2_HTMLTABLE = "";
       
        user2_HTMLTABLE = users2.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.firstname}</td>
                    <td>{item.middlename}</td>
                    <td>{item.lastname}</td>
                    <td>{item.username}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="80px" alt=""/></td>
                    <td>{item.mobilephone}</td>
                    <td>
                        <button type="submit" className="btn btn-primary">Unapprove</button>
                    </td>
                    
                </tr>
            );
        });
    }

    return (
        <>
        <AdminSideBar/>
        <div>
            <form onSubmit={updateSeller}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Verified Seller Data
                                    </h4>
                                </div>
                                <div className="card-body">
                                    
                                    <table className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Middle Name</th>
                                                <th>Last Name</th>
                                                <th>Username</th>
                                                <th>Image</th>
                                                <th>Mobile Phone</th>
                                                <th>Verified</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {user2_HTMLTABLE}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
        </div>
        </>
    );

}

export default VerifiedTable;
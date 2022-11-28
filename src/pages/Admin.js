import React from 'react';
import AdminSideBar from './AdminSidebar';

function AdminTable() {

    
    return (
        <>
        <AdminSideBar/>
        <div className='page-content-wrapper'>
               
               <div className="container-fluid">
                   <h1 className="mt-4">Hello Admin! </h1>
                   <p>Start your day with a smile</p>
               </div>
           </div>
        </>
    );

}

export default AdminTable;
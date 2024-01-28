import React, { createContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Datatable from '../components/Datatable'
import axios from 'axios';
// import DataTable from 'datatables.net-dt';
// import 'datatables.net-responsive-dt';


function UserCofig() {


    const title = ['email','username','phone','address','cost'] ;
  
    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-32">
                <Datatable />
            </div>
        </>
    )
}

export default UserCofig
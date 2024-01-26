import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import React from "react";

function Admin() {
    const MenuConfig = [
        {name : 'จัดการคลัง' , link : '/admin/productconfig'} ,
        {name : 'จัดการผู้ใช้' , link : '/admin/userconfig'} ,
        {name : 'จัดการออเดอร์' , link : '/admin/orders'} ,
        {name : 'ประวัติการขาย' , link : '/admin/historys'},
    ]
    return (
        <>

            <Navbar/>


            <div className="mt-32 container grid grid-cols-2  mx-auto p-5 gap-5 md:grid-cols-2">

                {MenuConfig.map(v => (
                    <React.Fragment key={v.name}>
                        <Link to={v.link} className="w-full h-full bg-gray-100 text-xl font-bold rounded-lg p-5 hover:bg-gray-200">{v.name}</Link>
                    </React.Fragment>
                ))}


                {/* <div className="grid  grid-cols-1 gap-5 lg:grid-cols-2 ">
                    <div className="w-[100%] mx-auto rounded-xl bg-gray-100 p-5 lg:ms-auto lg:mx-0 lg:w-[50%]">
                        <h1 className="text-xl ">จำนวนผู้ใช้งาน</h1>
                        <p className="text-4xl font-bold mt-5">20,000 </p>
                        <p className="text-xl mt-5">คน</p>
                    </div>
                    <div className="w-[100%] mx-auto rounded-xl bg-gray-900 text-white p-5 lg:me-auto lg:mx-0 lg:w-[50%]">
                        <h1 className="text-xl ">ยอดขายทั้งหมด</h1>
                        <p className="text-4xl font-bold mt-5">200,000  </p>
                        <p className="text-xl mt-5">บาท</p>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Admin ;
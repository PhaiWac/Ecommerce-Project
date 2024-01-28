import React from 'react'
import Navbar from '../components/Navbar'

function EditUser({id}) {
  return (
    <>
        <Navbar/>
        <div className="container mx-auto mt-32 p-5">
            <div className="md:w-2/4 mx-auto p-5 bg-gray-100 ">
                <p className='text-xl font-bold text-center'>ชื่อผู้ใช้งาน</p>
                <div className="avatar">
                    <div className="w-32">
                        <img src="/image/nike.jpeg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditUser
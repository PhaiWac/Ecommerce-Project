import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import  axios from 'axios';
import Alert from '../components/Alert';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function ChangePassword() {

    const [value,setValue] = useState({
        old_password : null ,
        new_password : null ,
        c_new_password : null 
    }) ;

    const [err , setErr] = useState(false) ;

    const handleOnSubmit = async (e) => {
        e.preventDefault() ;

        if (value.c_new_password !== value.new_password) {
            return setErr(true) ;
        }

        try {
            await axios.post('http://localhost:3000/api/user/change_password',value,{withCredentials : true})
            .then(res => {
                if (res.status == 200) {
                    toast.success("เปลี่ยนรหัสผ่านสำเร็จ")
                    setErr(false)
                } else {
                    toast.error("เปลี่ยนรหัสผ่านไม่สำเร็จ")
                }
            })
        } catch (err) {
            console.log('err',err)
        }

    }

    const handleOnchange = (e) => setValue((prevalue) => ({ ...prevalue, [e.target.name]: e.target.value }))

    return (
        <>
            <Navbar />
            <Toaster position="top-center" reverseOrder={true}/>

            <div className="container mx-auto mt-32">
            <Link to = {'/editprofile'} className='btn btn-neutral'>กลับ</Link>
                <p className="text-5xl text-center font-bold">Change Password</p>
                <div className="mx-auto mt-5 flex justify-center">
                    <form onSubmit={handleOnSubmit} className='w-[35rem] '>
                        <Alert value = {err} text = {'รหัสผ่านไม่ตรงกัน'}/>
                        <div className="m-3 ">
                            <label htmlFor="old_passworld" className="label">รหัสผ่านเก่า</label>
                            <input type="password" name="old_password" onChange={handleOnchange} id = 'old_password'className='input bg-gray-100 w-full' />
                        </div>
                        <div className="m-3 ">
                            <label htmlFor="new_password" className="label">รหัสผ่านใหม่</label>
                            <input type="password" name="new_password" onChange={handleOnchange}  id = 'new_password'className='input bg-gray-100 w-full' />
                        </div>
                        <div className="m-3 ">
                            <label htmlFor="c_new_password" className="label">ยืนยันรหัสผ่านใหม่</label>
                            <input type="password" name="c_new_password" onChange={handleOnchange} id = 'c_new_password'className='input bg-gray-100 w-full' />
                        </div>
                        <div className="m-3">
                            <button className="btn btn-info text-white w-full">เปลี่ยนรหัสผ่าน</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default ChangePassword
import axios from 'axios';
import React, { useState ,useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function RightProfile({context}) {

    const {session , UpdateSession} = useContext(context);

    const [value,setValue] = useState({}) ;

    const handleOnchange =(e) => setValue((pre) => ({...pre,[e.target.name] : e.target.value}) );
    
    const url = "http://localhost:3000/api/user/editdatauser" ;
    const EditUsername = async (e) => {
        e.preventDefault() ;
        await axios.post(url,{username : value.username},{withCredentials : true}).then(res => {
            if (res.status ==200) {
                UpdateSession(res.data)
                toast.success('แก้ไขชื่อสำเร็จ')
            } else toast.error('แก้ไขไม่สำเร็จ')
        })
    }
    const EditPhone = async (e) => {
        e.preventDefault() ;
        await axios.post(url,{phone : value.phone , password : value.password},{withCredentials : true}).then(res => {
            if (res.status ==200) {
                console.log(res.data)
                UpdateSession(res.data)
                toast.success('แก้ไขชื่อสำเร็จ')
            } else toast.error('แก้ไขไม่สำเร็จ')
        })
    }


  return (
   <>
   <Toaster/>
    <div className="grid grid-cols-1 gap-5 w-full">
        <div className="border-2 rounded-md p-5 h-fit">
            <p>แก้ไขชื่อ ( Username )</p>
            <form onSubmit={EditUsername} className='mt-3 grid gap-5'>
                <input type="text" className="input bg-gray-100" placeholder= {session.username} name = "username" onChange={handleOnchange} />
                <button className="btn btn-success w-fit text-white">แก้ไขข้อมูล</button>
            </form>
        </div>
        <div className="border-2 rounded-md p-5 h-fit">
            <p>แก้ไขเบอร์ ( Phone )</p>
            <form onSubmit={EditPhone} className='mt-3 grid gap-5'>
                <div className="flex gap-3 w-f">
                    <div className="w-full">
                        <label htmlFor="" className="label">เบอร์</label>
                        <input type="number" className="input bg-gray-100 w-full"name = "phone" onChange={handleOnchange} placeholder= {session.phone} />
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="label">รหัสผ่าน</label>
                        <input type="password" className="input bg-gray-100 w-full"name = "password" onChange={handleOnchange} />
                    </div>
                </div>
                <button className="btn btn-success w-fit text-white">แก้ไขข้อมูล</button>
            </form>
        </div>
        <div className="border-2 rounded-md p-5 h-fit">
            <p>แก้ไขที่อยู่ ( Phone )</p>
            <form action="" className='mt-3 grid gap-5'>
                <div className="flex gap-3 w-f">
                    <div className="w-full">
                        <label htmlFor="" className="label">ที่อยู่</label>
                        <input type="number" className="input bg-gray-100 w-full" placeholder= {session.address}  name = "address" onChange={handleOnchange}/>
                    </div>
                    <div className="w-full">
                        <label htmlFor="" className="label">รหัสผ่าน</label>
                        <input type="password" className="input bg-gray-100 w-full" name = "password" onChange={handleOnchange}/>
                    </div>
                </div>
                <button className="btn btn-success w-fit text-white">แก้ไขข้อมูล</button>
            </form>
        </div>
        
    </div>
    
   </>
  )
}

export default RightProfile
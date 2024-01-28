import axios from 'axios';
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function LeftProfile({ context }) {

    const { session, UpdateSession } = useContext(context);

    // console.log(session)d

    const [values, setValue] = useState();


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fd = new FormData();

        fd.append('file', values);

        try {
            await axios.post('http://localhost:3000/api/user/update_profiel_image', fd, { withCredentials: true })
                .then(res => {
                    if (res.status == 200) {
                        toast.success('เปลี่ยนรูปภาพสำเร็จ')
                        UpdateSession(res.data)
                    } else {
                        toast.error('ไม่สามารเปลี่ยนรูปได้')
                    }
                })
        } catch (err) { console.log(err) }
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const Del = async (t) => {
                toast.dismiss(t.id)
                await axios.delete('http://localhost:3000/api/user/delete_account', { withCredentials: true })
                    .then(res => {
                        if (res.status == 200) {
                            navigate('/login')
                        }
                    })
            }
            toast((t) => (
                <>
                    <span>
                        แน่ใจใช่ไหม?
                        <button className='ms-3 text-white btn btn-error btn-sm' onClick={() => Del(t)}>
                            ลบบัญชี
                        </button>
                        <button className='ms-3 btn  btn-sm' onClick={() => toast.dismiss(t.id)}>
                            ยกเลิก
                        </button>
                    </span>
                </>
            ));

        } catch (err) { console.log(err) }
    }

    return (
        <div className='rounded-md border-2 grid gap-5 p-5 justify-items-center '>
            <Toaster />
            <div className="avatar relative">
                <div className="w-32 reative rounded-full">
                    <img src={session ? `/image/${session.image}` : "/image/index.jpeg"} alt="" />
                </div>
            </div>
            <p className='text-xl font-bold'>{session.username}</p>
            <p>{session.email}</p>
            <div className="grid grid-cols-1 gap-5 w-full md:grid-cols-2">
                <Link to={'/user/change_password'} className="btn btn-success text-white">เปลี่ยนรหัสผ่าน</Link>
                <form onSubmit={handleDelete}>
                    <button className="btn btn-error w-full text-white">ลบบัญชี</button>
                </form>
            </div>
            <div className="w-full">
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={(e) => setValue(e.target.files[0])} className='file-input w-full bg-gray-100 file-input-md' />
                    <button className="btn btn-neutral text-white w-full mt-5">เปลี่ยนรูปภาพ</button>
                </form>
            </div>
        </div>
    )
}

export default LeftProfile
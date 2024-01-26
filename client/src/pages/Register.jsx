import { Link ,useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";

const Register = () => {

    const [values , setValue] = useState({})

    const [err_password, setErrPassword] = useState(false) ;

    const [err_email , setErrEmail] = useState(false);

    const [loadding , setLoadding] = useState(false) ;

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (values.email == 'admin@gmail.com') {
            return setErrEmail(true) ;
        }

        setLoadding(true)

        if (values.password !== values.cpassword) {
            setLoadding(false) ;
            return setErrPassword(true)
        } ;
        setErrPassword(false) ;
        
        await axios.post('http://localhost:3000/api/user/register', values)
            .then((res) => {
                setLoadding(false) ;
                if ( res.status == 204) {
                    setErrEmail(true) ;
                } else {
                    setErrEmail(false) 
                    navigate('/login')
                }
            })
    }
    
    

    const handleOnchange = (e) => {

        setValue((prevalue) => ({...prevalue, [e.target.name] : e.target.value }))

    }

    return (
        <>
            <Navbar />

            <div className="container p-12 mx-auto mt-32">
                <div className="p-5 md:w-1/2 mx-auto bg-gray-50 shadow-md">
                    <h2 className="font-bold text-2xl text-center">Welcome</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="m-3">
                            <label htmlFor="" className="label">อีเมล</label>
                            <input type="email" name = 'email' onChange={handleOnchange}  className="input input-bordered w-full"  required/>
                        </div>
                        <Alert value = {err_email } text = {'อีเมลนี้ถูกใช้งานแล้ว'}/>
                        <div className="m-3">
                            <label htmlFor="" className="label">ชื่อผู้ใช้งาน</label>
                            <input type="text" name = 'username' onChange={handleOnchange}  className="input input-bordered w-full" required/>
                        </div>
                        <div className="m-3">
                            <label htmlFor="" className="label">รหัสผ่าน</label>
                            <input type="password" name = 'password' onChange={handleOnchange}  className="input input-bordered w-full" required/>
                        </div>
                        <div className="m-3">
                            <label htmlFor="" className="label">ยืนยัน รหัสผ่าน</label>
                            <input type="password"name = 'cpassword' onChange={handleOnchange}  className="input input-bordered w-full" required/>
                        </div>
                        <Alert value = {err_password} text = {'รหัสผ่านไม่ตรงกัน'}/>
                        <div className="m-3">
                            <button className="btn btn-neutral w-full">
                                <span className={loadding ? "loading-spinner loading" : ''}>Register</span>
                            </button>
                        </div>
                    </form>
                    <div className="m-3 flex">
                        <Link to={'/login'} className="btn">Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Register;
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from 'axios'

const Login = () => {

    const [values, setValue] = useState({})

    const [err, SetErr] = useState(false);

    const [loading , setLoad] = useState(false) ;
    

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        setLoad(true)

        const res = await axios.post('http://localhost:3000/api/user/login',{
            password : values.password ,
            email : values.email  ,
        },{
            withCredentials : true 
        })
        setLoad(false)

        if (res.status == 200) {
            navigate('/')
            SetErr(false)
        } else SetErr(true) ;
        

    }

    const handleOnchange = (e) => setValue((prevalue) => ({ ...prevalue, [e.target.name]: e.target.value }))

    return (
        <>
            <Navbar />

            <div className="container p-12 mx-auto mt-32">
                <div className="p-5 md:w-1/2 mx-auto bg-gray-50 shadow-md">
                    <form onSubmit={handleSubmit}>
                        <h2 className="font-bold text-2xl text-center">Welcome</h2>
                        <div className="m-3">
                            <p className={ !err ? "hidden" : "alert alert-error bg-red-200 rounded-md "}>
                                 อีเมลหรือรหัสมีบางอย่างผิดพลาด
                            </p>
                        </div>
                        <div className="m-3">
                            <label htmlFor="" className="label">อีเมล</label>
                            <input type="email" onChange={handleOnchange} name='email' className="input input-bordered w-full" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="" className="label">รหัสผ่าน</label>
                            <input type="password" onChange={handleOnchange} name='password' className="input input-bordered w-full" />
                        </div>
                        <div className="m-3">
                            <button className="btn btn-neutral w-full">
                                <span className={loading ? "loading loading-spiner loading-md": ""}>Login</span>    
                            </button>
                        </div>
                    </form>
                    <div className="m-3 flex">
                        <Link to={'/register'} className="btn  ms-auto">Register</Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;
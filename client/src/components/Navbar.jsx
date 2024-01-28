import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgProfile } from "react-icons/cg";
import Dropdownbtn from './Dropdownbtn';

function Navbar() {
  const [Mobile, SetMobile] = useState(false);
  const [loggin, setLogin] = useState(null);
  const [Userval, setUser] = useState(null);
  const link = useNavigate();

  let listNav = [];

  useEffect(() => {
    const getCookie = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user/getcookie', { withCredentials: true });
        // console.log(res)
        if (res.status === 200) {
          setLogin(true);
          // console.log(res.data)
          setUser(res.data.session)
        } else {
          setLogin(false)
        }
      } catch (err) {
        console.log('err ', err);
      }
    };

    getCookie();
  }, []);

  if (!loggin) {
    listNav = [
      { name: 'Login', link: '/login' },
      { name: 'Register', link: '/register' }
    ];
  } else {
    listNav = [
      {name : 'สินค้าทั้งหมด' , link : '/products'} ,
      {name: 'user', dropdown: true, childrens: [
        { name : Userval.role == 'admin' ? 'แอดมิน' : 'ตระกร้า' , link : Userval.role == 'admin' ? '/admin' : '/user/orders'} ,
        { name: 'แก้ไขโปรไฟล์', link: '/user/editprofile' },
          {
            name: 'ออกจากระบบ', function: async () => {
              await axios.delete('http://localhost:3000/api/user/logout', { withCredentials: true })
                .then(res => {
                  link('/login');
                  setLogin(false);
                  setUser(null);
                })
            }
          }
        ]
      }
    ];
  }

  if (Mobile && loggin) {
    listNav = [
      {name : 'สินค้าทั้งหมด' , link : '/products'} ,
    ]
  }

  return (
    <>
      <nav className='container p-5 mx-auto fixed left-0 right-0 top-0 bg-gray-200  z-10 md:bg-white '>
        <Link to={'/'} className='text-3xl font-bold content-center'>Converse</Link>
        <button className="btn float-right md:hidden" onClick={() => SetMobile(!Mobile)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <ul className={!Mobile ? "hidden md:hidden" : "w-full p-5 grid gap-5"}>
          {/* {listNav.map(item => (
            <button key={item.name + 'mobile'} className=' text-2xl text-start'><Link to={item.link}>{item.name}</Link></button>
          ))} */}
          { loggin === null ? (
              <div className='skeleton h-8 w-20'></div>
          ) : (
            listNav.map(item => (
              <React.Fragment key={item.name + 'mobile'}>
                <Link className='btn btn-white' to = {item.link}>{item.name}</Link>
              </React.Fragment>
            ))
          )}
        </ul>

        {/* Desktop UI */}
        <ul className='hidden gap-5 md:flex md:float-right'>
          {loggin === null  ? (
            <div className='skeleton h-8 w-20'></div>
          ) : (
            listNav.map(item => (
              <React.Fragment key={item.name + 'desktop'}>
                {item.dropdown ? (
                  <details className="dropdown dropdown-end">
                    <summary className="m-1 btn">{Userval.email}</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      {item.childrens.map(item2 => (
                        <li key={item2.name}>
                          {item2.function ? (
                            <button onClick={item2.function}>{item2.name}</button>
                          ) : (
                            <Link to={item2.link}>{item2.name}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <button>
                    <Link className='btn' to={item.link}>{item.name}</Link>
                  </button>
                )}
              </React.Fragment>
            ))
          )}
        </ul>

      </nav>
    </>
  );
}

export default Navbar;
